import React, { useState } from 'react';
import './EventDetail.css';
import { generateInsight } from '../utils/api';

function EventDetail({ event, onBack }) {
  const [insight, setInsight] = useState('');
  const [loadingInsight, setLoadingInsight] = useState(false);

  const venue = event._embedded?.venues?.[0];
  const dates = event.dates?.start;
  const priceRange = event.priceRanges?.[0];
  const classification = event.classifications?.[0];
  const segment = classification?.segment?.name;
  const genre = classification?.genre?.name;

  const dateStr = dates?.localDate
    ? new Date(dates.localDate + 'T00:00:00').toLocaleDateString('en-US', {
        weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
      })
    : 'TBD';

  const timeStr = dates?.localTime
    ? new Date(`2000-01-01T${dates.localTime}`).toLocaleTimeString('en-US', {
        hour: 'numeric', minute: '2-digit'
      })
    : '';

  const priceInfo = priceRange
    ? `$${priceRange.min?.toFixed(0)} – $${priceRange.max?.toFixed(0)} USD`
    : 'Not listed';

  const handleInsight = async () => {
    setLoadingInsight(true);
    const result = await generateInsight(event, priceInfo);
    setInsight(result);
    setLoadingInsight(false);
  };

  return (
    <div className="event-detail">
      <button className="back-btn" onClick={onBack}>← Back to results</button>

      <h2 className="detail-title">{event.name}</h2>
      <div className="detail-meta">
        <span>📍 {venue?.name}{venue?.city?.name ? `, ${venue.city.name}` : ''}{venue?.state?.name ? `, ${venue.state.name}` : ''}</span>
        <span>📅 {dateStr}{timeStr ? ` at ${timeStr}` : ''}</span>
      </div>

      {(segment || genre) && (
        <div className="detail-category">{segment}{genre && genre !== 'Undefined' ? ` — ${genre}` : ''}</div>
      )}

      <div className="detail-section-title">Pricing</div>
      {priceRange ? (
        <div className="price-cards">
          <div className="price-card">
            <div className="price-card-label">Starting From</div>
            <div className="price-card-value">${priceRange.min?.toFixed(0)}</div>
          </div>
          <div className="price-card">
            <div className="price-card-label">Up To</div>
            <div className="price-card-value">${priceRange.max?.toFixed(0)}</div>
          </div>
          <div className="price-card">
            <div className="price-card-label">Currency</div>
            <div className="price-card-value">{priceRange.currency || 'USD'}</div>
          </div>
        </div>
      ) : (
        <div className="no-price">
  Live pricing isn't available via the API for this event — check the link below for current prices.
</div>

      )}

      {event.url && (
        <a className="buy-link" href={event.url} target="_blank" rel="noreferrer">
          → Buy tickets on Ticketmaster
        </a>
      )}

      <div className="detail-section-title">AI Market Analysis</div>
      <button className="insight-btn" onClick={handleInsight} disabled={loadingInsight}>
        {loadingInsight ? 'Analysing...' : '✦ Generate Market Insight'}
      </button>

      {insight && (
        <div className="insight-box">
          <div className="insight-label">✦ AI Market Insight</div>
          <div className="insight-text">{insight}</div>
        </div>
      )}
    </div>
  );
}

export default EventDetail;