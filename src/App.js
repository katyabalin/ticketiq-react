import React, { useState, useEffect } from 'react';
import './App.css';
import Header from './components/Header';
import SearchBar from './components/SearchBar';
import EventList from './components/EventList';
import EventDetail from './components/EventDetail';
import { searchEvents } from './utils/api';

const FEATURED_SEARCHES = ['Taylor Swift', 'Kendrick Lamar', 'NBA'];

function App() {
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [searched, setSearched] = useState(false);
  const [featuredEvents, setFeaturedEvents] = useState([]);
  const [featuredLoading, setFeaturedLoading] = useState(true);

  useEffect(() => {
    const loadFeatured = async () => {
      try {
        const results = await Promise.all(
          FEATURED_SEARCHES.map(q => searchEvents(q, 'All', 3))
        );
        const combined = results.flat().slice(0, 6);
        setFeaturedEvents(combined);
      } catch {
        // silently fail
      } finally {
        setFeaturedLoading(false);
      }
    };
    loadFeatured();
  }, []);

  const handleSearch = async (query, category) => {
    setLoading(true);
    setError('');
    setSelectedEvent(null);
    setSearched(true);
    try {
      const results = await searchEvents(query, category);
      setEvents(results);
      if (results.length === 0) setError('No events found. Try a different search.');
    } catch {
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app">
      <Header />
      <main className="main">
        <div className="hero">
          <div className="hero-label">✦ Live Event Intelligence</div>
          <h1 className="hero-title">Know when to<br /><em>buy</em></h1>
          <p className="hero-sub">Search any event. Get a demand score, buying recommendation, and AI-powered market analysis.</p>
        </div>

        <SearchBar onSearch={handleSearch} loading={loading} />
        {error && <div className="error-msg">{error}</div>}

        {selectedEvent && (
          <EventDetail event={selectedEvent} onBack={() => setSelectedEvent(null)} />
        )}

        {!selectedEvent && searched && events.length > 0 && (
          <EventList events={events} onSelect={setSelectedEvent} />
        )}

        {!searched && !selectedEvent && (
          <>
            <div className="featured-header">
              <div className="section-title" style={{ marginTop: '2.5rem' }}>✦ Trending Events</div>
            </div>
            {featuredLoading ? (
              <div className="featured-loading">Loading trending events...</div>
            ) : (
              <EventList events={featuredEvents} onSelect={setSelectedEvent} grid={true} />
            )}
          </>
        )}
      </main>
    </div>
  );
}

export default App;