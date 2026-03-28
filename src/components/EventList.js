import React from 'react';
import './EventList.css';

function EventList({ events, onSelect }) {
  return (
    <div className="event-list">
      <div className="section-title">{events.length} Events Found</div>
      {events.map((event) => {
        const date = event.dates?.start?.localDate;
        const dateStr = date ? new Date(date + 'T00:00:00').toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : 'TBD';
        const venue = event._embedded?.venues?.[0];
        const venueName = venue?.name || '';
        const city = venue?.city?.name || '';
        const priceRange = event.priceRanges?.[0];
        const price = priceRange ? `$${priceRange.min?.toFixed(0)} – $${priceRange.max?.toFixed(0)}` : null;

        return (
          <div key={event.id} className="event-card" onClick={() => onSelect(event)}>
            <div className="event-card-left">
              <div className="event-card-name">{event.name}</div>
              <div className="event-card-meta">{dateStr} · {venueName}{city ? `, ${city}` : ''}</div>
            </div>
            <div className="event-card-right">
              {price && <div className="event-card-price">{price}</div>}
              <div className="event-card-arrow">→</div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default EventList;