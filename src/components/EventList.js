import React from 'react';
import './EventList.css';

function EventList({ events, onSelect, grid = false }) {
  if (grid) {
    return (
      <div className="event-grid">
        {events.map((event) => {
          const date = event.dates?.start?.localDate;
          const dateStr = date
            ? new Date(date + 'T00:00:00').toLocaleDateString('en-US', {
                month: 'short', day: 'numeric', year: 'numeric'
              })
            : 'TBD';
          const venue = event._embedded?.venues?.[0];
          const city = venue?.city?.name || '';
          const state = venue?.state?.stateCode || '';
          const image = event.images?.find(img => img.ratio === '16_9' && img.width > 500)?.url
            || event.images?.[0]?.url;
          const priceRange = event.priceRanges?.[0];
          const price = priceRange
            ? `$${priceRange.min?.toFixed(0)} – $${priceRange.max?.toFixed(0)}`
            : null;
          const classification = event.classifications?.[0];
          const segment = classification?.segment?.name;

          return (
            <div key={event.id} className="event-grid-card" onClick={() => onSelect(event)}>
              <div className="event-grid-image">
                {image
                  ? <img src={image} alt={event.name} />
                  : <div className="event-grid-placeholder">🎟️</div>
                }
                {segment && <div className="event-grid-tag">{segment}</div>}
              </div>
              <div className="event-grid-body">
                <div className="event-grid-name">{event.name}</div>
                <div className="event-grid-meta">{dateStr}{city ? ` · ${city}${state ? `, ${state}` : ''}` : ''}</div>
                <div className="event-grid-footer">
                  {price
                    ? <span className="event-grid-price">{price}</span>
                    : <span className="event-grid-price-na">Check prices →</span>
                  }
                </div>
              </div>
            </div>
          );
        })}
      </div>
    );
  }

  return (
    <div className="event-list">
      <div className="section-title">{events.length} Events Found</div>
      {events.map((event) => {
        const date = event.dates?.start?.localDate;
        const dateStr = date
          ? new Date(date + 'T00:00:00').toLocaleDateString('en-US', {
              month: 'short', day: 'numeric', year: 'numeric'
            })
          : 'TBD';
        const venues = event._embedded?.venues?.[0];
        const venue_name = venues?.name || '';
        const city = venues?.city?.name || '';
        const priceRange = event.priceRanges?.[0];
        const price = priceRange
          ? `$${priceRange.min?.toFixed(0)} – $${priceRange.max?.toFixed(0)}`
          : null;

        return (
          <div key={event.id} className="event-card" onClick={() => onSelect(event)}>
            <div className="event-card-left">
              <div className="event-card-name">{event.name}</div>
              <div className="event-card-meta">{dateStr} · {venue_name}{city ? `, ${city}` : ''}</div>
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