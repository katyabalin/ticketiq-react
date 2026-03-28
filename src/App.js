import React, { useState } from 'react';
import './App.css';
import Header from './components/Header';
import SearchBar from './components/SearchBar';
import EventList from './components/EventList';
import EventDetail from './components/EventDetail';
import { searchEvents } from './utils/api';

function App() {
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [searched, setSearched] = useState(false);

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
          <p className="hero-sub">Search any event. Understand the market. Get AI-powered buying advice.</p>
        </div>
        <SearchBar onSearch={handleSearch} loading={loading} />
        {error && <div className="error-msg">{error}</div>}
        {!selectedEvent && events.length > 0 && (
          <EventList events={events} onSelect={setSelectedEvent} />
        )}
        {selectedEvent && (
          <EventDetail event={selectedEvent} onBack={() => setSelectedEvent(null)} />
        )}
        {!searched && !loading && (
          <div className="empty-state">Search for any artist, team, show, or venue to get started.</div>
        )}
      </main>
    </div>
  );
}

export default App;
