const TM_KEY = process.env.REACT_APP_TICKETMASTER_API_KEY;

export async function searchEvents(query, category = 'All', size = 10) {
  const params = new URLSearchParams({
    apikey: TM_KEY,
    keyword: query,
    size,
    sort: 'date,asc',
    countryCode: 'US',
  });
  if (category !== 'All') params.append('classificationName', category);

  const res = await fetch(`https://app.ticketmaster.com/discovery/v2/events.json?${params}`);
  if (!res.ok) throw new Error('Failed to fetch events');
  const data = await res.json();
  return data._embedded?.events || [];
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