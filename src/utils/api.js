const TM_KEY = process.env.REACT_APP_TICKETMASTER_API_KEY;

export async function searchEvents(query, category = 'All', size = 10) {
  const params = new URLSearchParams({
    apikey: TM_KEY,
    keyword: query,
    size,
    sort: 'date,asc',
    countryCode: 'US',
    includeSpellcheck: 'yes',
    includeTBA: 'no',
    includeTBD: 'no',
  });
  if (category !== 'All') params.append('classificationName', category);

  const res = await fetch(`https://app.ticketmaster.com/discovery/v2/events.json?${params}`);
  if (!res.ok) throw new Error('Failed to fetch events');
  const data = await res.json();
  const events = data._embedded?.events || [];

  // For each event, try to fetch inventory pricing
  const eventsWithPricing = await Promise.all(
    events.map(async (event) => {
      try {
        const priceRes = await fetch(
          `https://app.ticketmaster.com/discovery/v2/events/${event.id}.json?apikey=${TM_KEY}`
        );
        if (priceRes.ok) {
          const priceData = await priceRes.json();
          if (priceData.priceRanges) {
            return { ...event, priceRanges: priceData.priceRanges };
          }
        }
      } catch {
        // silently fail, return event without pricing
      }
      return event;
    })
  );

  return eventsWithPricing;
}

export async function generateInsight(event, priceInfo) {
  const venue = event._embedded?.venues?.[0];
  const dates = event.dates?.start;

  const prompt = `You are an expert live events analyst helping consumers make smart ticket buying decisions.

Event: ${event.name}
Date: ${dates?.localDate || 'TBD'} at ${dates?.localTime || 'TBD'}
Venue: ${venue?.name || 'Unknown'} in ${venue?.city?.name || 'Unknown'}, ${venue?.state?.name || ''}
Category: ${event.classifications?.[0]?.segment?.name || 'Unknown'}
Price range: ${priceInfo}

Write 3-4 sentences of sharp, actionable buying advice. Explain what the price tells us about demand, when to buy, and anything notable. Sound like a smart friend, not a robot.`;

  try {
    const res = await fetch('/api/analyze', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt }),
    });
    const data = await res.json();
    return data.text;
  } catch {
    return 'Could not generate analysis. Please try again.';
  }
}

export function calculateDemandScore(event) {
  let score = 0;
  let signals = [];

  // Factor 1: How soon is the event?
  const eventDate = event.dates?.start?.localDate;
  if (eventDate) {
    const daysUntil = Math.floor((new Date(eventDate) - new Date()) / (1000 * 60 * 60 * 24));
    if (daysUntil <= 7) { score += 35; signals.push('happening this week'); }
    else if (daysUntil <= 30) { score += 25; signals.push('happening this month'); }
    else if (daysUntil <= 90) { score += 15; signals.push('happening within 3 months'); }
    else { score += 5; }
  }



  // Factor 2: Ticketmaster popularity score
  const popularity = event.score;
  if (popularity) {
    if (popularity >= 0.8) { score += 40; signals.push('extremely popular artist'); }
    else if (popularity >= 0.6) { score += 30; signals.push('highly popular artist'); }
    else if (popularity >= 0.4) { score += 20; signals.push('popular artist'); }
    else { score += 10; }
  }

  // Factor 3: Venue capacity signals
  const venue = event._embedded?.venues?.[0];
  const venueType = venue?.type;
  if (venueType === 'venue') { score += 15; signals.push('major venue'); }
  else { score += 5; }

  // Factor 4: Has price ranges (means tickets are actively on sale)
  if (event.priceRanges) { score += 10; signals.push('tickets on sale now'); }

  // Cap at 100
  score = Math.min(score, 100);

  // Label
  let label, color, emoji;
  if (score >= 75) { label = 'Very High Demand'; color = '#f85149'; emoji = '🔥'; }
  else if (score >= 55) { label = 'High Demand'; color = '#f5c842'; emoji = '⚡'; }
  else if (score >= 35) { label = 'Moderate Demand'; color = '#388bfd'; emoji = '📈'; }
  else { label = 'Low Demand'; color = '#7d8590'; emoji = '🎟️'; }

  return { score, label, color, emoji, signals };
}

export function getBestTimeToBuy(event, demandScore) {
  const eventDate = event.dates?.start?.localDate;
  const daysUntil = eventDate
    ? Math.floor((new Date(eventDate) - new Date()) / (1000 * 60 * 60 * 24))
    : null;

  if (daysUntil === null) {
    return {
      recommendation: 'Check prices soon',
      detail: 'Date not confirmed yet — set an alert so you don\'t miss tickets.',
      urgency: 'low',
      emoji: '🎟️'
    };
  }

  if (daysUntil <= 7) {
    return {
      recommendation: 'Buy immediately',
      detail: 'This event is days away. Any remaining tickets will be at peak prices or sold out.',
      urgency: 'critical',
      emoji: '🚨'
    };
  }

  if (demandScore >= 75) {
    return {
      recommendation: 'Buy now',
      detail: 'Demand is very high for this event. Prices are likely rising — don\'t wait.',
      urgency: 'high',
      emoji: '🔥'
    };
  }

  if (demandScore >= 55 && daysUntil <= 30) {
    return {
      recommendation: 'Buy within the week',
      detail: 'High demand with the event approaching. Prices will likely increase soon.',
      urgency: 'high',
      emoji: '⚡'
    };
  }

  if (demandScore >= 55 && daysUntil <= 90) {
    return {
      recommendation: 'Buy within 2 weeks',
      detail: 'Demand is high but you have a short window before prices rise significantly.',
      urgency: 'medium',
      emoji: '📈'
    };
  }

  if (demandScore >= 35 && daysUntil <= 60) {
    return {
      recommendation: 'Buy within the month',
      detail: 'Moderate demand — prices are stable now but will rise as the date gets closer.',
      urgency: 'medium',
      emoji: '🎯'
    };
  }

  return {
    recommendation: 'Wait for a deal',
    detail: 'Low demand means prices may drop closer to the event. Check back in a few weeks.',
    urgency: 'low',
    emoji: '💰'
  };
}