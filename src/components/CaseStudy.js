import React from 'react';
import './CaseStudy.css';

function CaseStudy() {
  return (
    <div className="cs-page">
      <div className="cs-container">

        {/* Header */}
        <div className="cs-cover">
          <div className="cs-cover-label">✦ Product Case Study</div>
          <h1 className="cs-cover-title">TicketIQ</h1>
          <p className="cs-cover-sub">Live Event Intelligence — Know When to Buy</p>
          <div className="cs-meta-row">
            <div className="cs-meta-item"><div className="cs-meta-val">React</div><div className="cs-meta-key">Frontend</div></div>
            <div className="cs-meta-item"><div className="cs-meta-val">Claude API</div><div className="cs-meta-key">AI Layer</div></div>
            <div className="cs-meta-item"><div className="cs-meta-val">2 Weeks</div><div className="cs-meta-key">Build Time</div></div>
            <div className="cs-meta-item"><div className="cs-meta-val">Live</div><div className="cs-meta-key">Status</div></div>
          </div>
        </div>

        {/* 01 Overview */}
        <section className="cs-section">
          <div className="cs-section-label">01 — Overview</div>
          <p className="cs-body">TicketIQ is a live event intelligence app that helps consumers decide <em>when</em> to buy tickets. It combines real-time event data from the Ticketmaster API with an original demand scoring algorithm and Claude-powered AI analysis to give users a clear, specific buying recommendation — not just a price.</p>
          <div className="cs-callout">The core insight: people don't just want to see ticket prices. They want to know what to do about them.</div>
          <div className="cs-stats">
            <div className="cs-stat"><div className="cs-stat-num">3</div><div className="cs-stat-label">Core Features</div></div>
            <div className="cs-stat"><div className="cs-stat-num">2 wks</div><div className="cs-stat-label">Build Time</div></div>
            <div className="cs-stat"><div className="cs-stat-num">4</div><div className="cs-stat-label">APIs Integrated</div></div>
            <div className="cs-stat"><div className="cs-stat-num">Live</div><div className="cs-stat-label">Deployment</div></div>
          </div>
        </section>

        {/* 02 Problem */}
        <section className="cs-section">
          <div className="cs-section-label">02 — The Problem</div>
          <p className="cs-body">The inspiration came from a personal frustration — and one that turned out to be nearly universal once I started talking to people about it.</p>
          <h3 className="cs-h3">Personal Discovery</h3>
          <p className="cs-body">I had overpaid for resale tickets, missed events because I waited too long, and countless times stared at a ticket listing with no idea whether $150 was a good deal or a ripoff. The information I needed existed somewhere — I just couldn't access it.</p>
          <h3 className="cs-h3">User Validation</h3>
          <p className="cs-body">Before building, I spoke with friends and roommates. The same three pain points came up every time:</p>
          <div className="cs-quotes">
            <div className="cs-quote">"I always feel like I'm guessing whether to buy now or wait"</div>
            <div className="cs-quote">"I can never tell if a price is actually good or if I'm being ripped off"</div>
            <div className="cs-quote">"I've missed shows I wanted to see because I hesitated too long"</div>
          </div>
          <div className="cs-problem-statement">
            <div className="cs-ps-label">Problem Statement</div>
            <p className="cs-ps-text">Ticket buyers have no visibility into market demand or price trajectory — leaving them unable to make confident, informed purchasing decisions. The result: overpaying, missed events, and buyer's remorse.</p>
          </div>
        </section>

        {/* 03 Target User */}
        <section className="cs-section">
          <div className="cs-section-label">03 — Target User</div>
          <div className="cs-persona">
            <div className="cs-persona-header">Primary Persona</div>
            <div className="cs-persona-row"><div className="cs-persona-key">Name</div><div className="cs-persona-val">Alex, 22</div></div>
            <div className="cs-persona-row"><div className="cs-persona-key">Occupation</div><div className="cs-persona-val">Recent grad, entry-level professional</div></div>
            <div className="cs-persona-row"><div className="cs-persona-key">Behavior</div><div className="cs-persona-val">Buys 4–8 event tickets per year. Browses Ticketmaster and StubHub but gets overwhelmed by pricing decisions.</div></div>
            <div className="cs-persona-row"><div className="cs-persona-key">Goal</div><div className="cs-persona-val">Attend events without overpaying or missing out</div></div>
            <div className="cs-persona-row"><div className="cs-persona-key">Frustration</div><div className="cs-persona-val">No way to know if prices are going up or down, or whether to act now</div></div>
            <div className="cs-persona-row cs-persona-quote-row"><div className="cs-persona-key">Quote</div><div className="cs-persona-val cs-persona-quote">"I just want someone to tell me — should I buy this now or wait?"</div></div>
          </div>
        </section>

        {/* 04 Journey */}
        <section className="cs-section">
          <div className="cs-section-label">04 — User Journey Map</div>
          <p className="cs-body">How Alex currently experiences ticket buying — and where TicketIQ intervenes:</p>
          <div className="cs-journey">
            {[
              { stage: 'Discovers Event', pain: '—', ticketiq: '—' },
              { stage: 'Researches Prices', pain: 'Prices vary wildly across platforms', ticketiq: 'Shows demand score instantly' },
              { stage: 'Decision Point', pain: 'No guidance on when to buy', ticketiq: 'Clear Buy Now / Wait recommendation' },
              { stage: 'Purchase', pain: 'Often overpays or misses out', ticketiq: 'AI explains the market' },
              { stage: 'Post-Purchase', pain: "Buyer's remorse or FOMO", ticketiq: 'Informed decision, less regret' },
            ].map((item, i) => (
              <div key={i} className="cs-journey-col">
                <div className="cs-journey-stage">{item.stage}</div>
                <div className="cs-journey-pain">{item.pain}</div>
                <div className="cs-journey-fix">{item.ticketiq}</div>
              </div>
            ))}
          </div>
          <div className="cs-journey-legend">
            <span className="cs-legend-pain">Pain Point</span>
            <span className="cs-legend-fix">TicketIQ Solution</span>
          </div>
        </section>

        {/* 05 Solution */}
        <section className="cs-section">
          <div className="cs-section-label">05 — The Solution</div>
          <p className="cs-body">Three core features, each designed to answer a specific user question:</p>
          <div className="cs-features">
            <div className="cs-feature">
              <div className="cs-feature-name">Demand Score (0–100)</div>
              <div className="cs-feature-q">"How hot is this event?"</div>
              <div className="cs-feature-desc">Algorithm combining artist popularity, venue size, days until event, and ticket availability</div>
            </div>
            <div className="cs-feature">
              <div className="cs-feature-name">Best Time to Buy</div>
              <div className="cs-feature-q">"Should I buy now or wait?"</div>
              <div className="cs-feature-desc">Plain-English recommendation derived from demand score and days until event</div>
            </div>
            <div className="cs-feature">
              <div className="cs-feature-name">AI Market Analysis</div>
              <div className="cs-feature-q">"What's actually happening in this market?"</div>
              <div className="cs-feature-desc">Claude API generates 3-4 sentences of specific, contextual buying advice per event</div>
            </div>
          </div>
        </section>

        {/* 06 Demand Score */}
        <section className="cs-section">
          <div className="cs-section-label">06 — Demand Score: How It Works</div>
          <p className="cs-body">The demand score is an original algorithm combining four weighted signals from the Ticketmaster API into a single 0–100 score. Each signal was chosen because it has a logical, defensible relationship to real ticket market pressure.</p>
          <div className="cs-table-wrap">
            <table className="cs-table">
              <thead>
                <tr><th>Signal</th><th>Max Points</th><th>Scoring Logic</th><th>Why It Matters</th></tr>
              </thead>
              <tbody>
                <tr>
                  <td className="cs-td-blue">Event Timing</td>
                  <td className="cs-td-center cs-td-bold">35</td>
                  <td>≤7 days = 35 · ≤30 days = 25 · ≤90 days = 15 · 90+ days = 5</td>
                  <td>Imminent events have higher urgency — prices rise as the date approaches</td>
                </tr>
                <tr>
                  <td className="cs-td-blue">Artist Popularity</td>
                  <td className="cs-td-center cs-td-bold">40</td>
                  <td>Score ≥0.8 = 40 · ≥0.6 = 30 · ≥0.4 = 20 · below = 10</td>
                  <td>Ticketmaster's popularity score reflects real-world demand and fanbase size</td>
                </tr>
                <tr>
                  <td className="cs-td-blue">Venue Type</td>
                  <td className="cs-td-center cs-td-bold">15</td>
                  <td>Major venue = 15 · Other = 5</td>
                  <td>Larger venues attract higher-demand acts and draw from wider audiences</td>
                </tr>
                <tr>
                  <td className="cs-td-blue">Tickets on Sale</td>
                  <td className="cs-td-center cs-td-bold">10</td>
                  <td>Price data present = 10 · No price data = 0</td>
                  <td>Active listings signal demand is real and measurable right now</td>
                </tr>
                <tr className="cs-tr-total">
                  <td><strong>Total</strong></td>
                  <td className="cs-td-center"><strong>100</strong></td>
                  <td colSpan={2}>Score capped at 100</td>
                </tr>
              </tbody>
            </table>
          </div>
          <h3 className="cs-h3">Score Interpretation</h3>
          <div className="cs-scores">
            <div className="cs-score-row"><div className="cs-score-range">75–100</div><div className="cs-score-label cs-red">Very High Demand 🔥</div><div className="cs-score-rec">Buy now — prices are likely rising fast</div></div>
            <div className="cs-score-row"><div className="cs-score-range">55–74</div><div className="cs-score-label cs-orange">High Demand ⚡</div><div className="cs-score-rec">Buy within the week</div></div>
            <div className="cs-score-row"><div className="cs-score-range">35–54</div><div className="cs-score-label cs-blue">Moderate Demand 📈</div><div className="cs-score-rec">Buy within the month</div></div>
            <div className="cs-score-row"><div className="cs-score-range">0–34</div><div className="cs-score-label cs-gray">Low Demand 🎟️</div><div className="cs-score-rec">Wait for a deal — prices may drop closer to the event</div></div>
          </div>
        </section>

        {/* 07 Key Decision */}
        <section className="cs-section">
          <div className="cs-section-label">07 — Key Product Decision</div>
          <h3 className="cs-h3">How to display the demand score clearly</h3>
          <p className="cs-body">The hardest product decision was making the demand score immediately understandable without requiring explanation. Three iterations:</p>
          <div className="cs-table-wrap">
            <table className="cs-table">
              <thead><tr><th>Version</th><th>Approach</th><th>Problem Identified</th><th>Result</th></tr></thead>
              <tbody>
                <tr><td className="cs-td-bold">V1</td><td>Raw number only — "Score: 73"</td><td>No context for what 73 means to a user</td><td className="cs-red">Rejected</td></tr>
                <tr><td className="cs-td-bold">V2</td><td>Color-coded bar without label</td><td>Visually unclear — what does the bar represent?</td><td className="cs-red">Rejected</td></tr>
                <tr className="cs-tr-success"><td className="cs-td-bold">V3 ✓</td><td>Label + score + bar + signal tags</td><td>Clear at a glance — "High Demand · 73/100"</td><td className="cs-green">Shipped</td></tr>
              </tbody>
            </table>
          </div>
          <p className="cs-body-italic">This reinforced that the UI is part of the product. A great algorithm with a confusing display is still a bad product.</p>
        </section>

        {/* 08 Constraint */}
        <section className="cs-section">
          <div className="cs-section-label">08 — Constraint Turned Feature</div>
          <p className="cs-body">Ticketmaster's free API does not reliably return pricing data — even when prices are live on their website. This was a critical problem since pricing was central to the original concept.</p>
          <div className="cs-table-wrap">
            <table className="cs-table">
              <thead><tr><th>Option</th><th>Approach</th><th>Outcome</th></tr></thead>
              <tbody>
                <tr><td className="cs-td-bold">A</td><td>Show "pricing unavailable" message</td><td>Dead end for the user. No value delivered.</td></tr>
                <tr className="cs-tr-success"><td className="cs-td-bold cs-green">B ✓</td><td>Build demand score as proxy for price pressure</td><td>More actionable than a raw price. Users get a clear recommendation, not just a number.</td></tr>
              </tbody>
            </table>
          </div>
          <p className="cs-body-italic">Choosing Option B reframed the product entirely — from a price tracker to a buying advisor. The constraint forced a better solution.</p>
        </section>

        {/* 09 Metrics */}
        <section className="cs-section">
          <div className="cs-section-label">09 — Success Metrics</div>
          <p className="cs-body">If TicketIQ were a real product, these are the metrics I would track:</p>
          <div className="cs-table-wrap">
            <table className="cs-table">
              <thead><tr><th>Metric</th><th>What It Measures</th><th>Target</th></tr></thead>
              <tbody>
                <tr><td className="cs-td-blue">AI Analysis Click Rate</td><td>Are users engaging with the core feature?</td><td className="cs-green">&gt; 60% of event views</td></tr>
                <tr><td className="cs-td-blue">Time to Decision</td><td>Does TicketIQ help users decide faster?</td><td className="cs-green">&lt; 90 seconds on page</td></tr>
                <tr><td className="cs-td-blue">Return Visit Rate</td><td>Do users come back when shopping for tickets?</td><td className="cs-green">&gt; 40% weekly return</td></tr>
                <tr><td className="cs-td-blue">Recommendation Accuracy</td><td>Did "Buy Now" events sell out? Did "Wait" events drop in price?</td><td className="cs-green">Track over 90 days</td></tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* 10 Roadmap */}
        <section className="cs-section">
          <div className="cs-section-label">10 — What's Next</div>
          <div className="cs-roadmap">
            <div className="cs-road-item"><div className="cs-road-priority cs-green">High</div><div className="cs-road-feature">Event Comparison</div><div className="cs-road-why">Users often choose between 2–3 events. Side-by-side AI analysis answers "which one should I go to?"</div></div>
            <div className="cs-road-item"><div className="cs-road-priority cs-green">High</div><div className="cs-road-feature">Price History Tracking</div><div className="cs-road-why">Show how demand has changed over time — the data story behind the score</div></div>
            <div className="cs-road-item"><div className="cs-road-priority cs-orange">Medium</div><div className="cs-road-feature">Email Price Alerts</div><div className="cs-road-why">Re-engage users when a saved event's demand score changes significantly</div></div>
            <div className="cs-road-item"><div className="cs-road-priority cs-gray">Low</div><div className="cs-road-feature">Social Proof Layer</div><div className="cs-road-why">"X people watching" — adds an urgency signal to the demand score</div></div>
          </div>
        </section>

        {/* 11 Learnings */}
        <section className="cs-section">
          <div className="cs-section-label">11 — Key Learnings</div>
          <div className="cs-learnings">
            <div className="cs-learning"><div className="cs-learning-num">01</div><div><div className="cs-learning-title">The UI is part of the product</div><div className="cs-learning-body">A great algorithm with a confusing display is still a bad product.</div></div></div>
            <div className="cs-learning"><div className="cs-learning-num">02</div><div><div className="cs-learning-title">Constraints force better solutions</div><div className="cs-learning-body">The pricing API limitation led to a demand scoring feature that turned out to be more useful than raw prices.</div></div></div>
            <div className="cs-learning"><div className="cs-learning-num">03</div><div><div className="cs-learning-title">Users want recommendations, not data</div><div className="cs-learning-body">The question isn't "what are the prices?" — it's "what should I do?"</div></div></div>
            <div className="cs-learning"><div className="cs-learning-num">04</div><div><div className="cs-learning-title">Ship and iterate</div><div className="cs-learning-body">Getting the app live on Vercel in two weeks taught me more than any amount of planning would have.</div></div></div>
          </div>
        </section>

        {/* Footer */}
        <div className="cs-footer">
          <div className="cs-footer-name">Katya Balin</div>
          <div className="cs-footer-links">
            <a href="mailto:katya.balin@gmail.com">katya.balin@gmail.com</a>
            <a href="https://linkedin.com/in/katya-balin" target="_blank" rel="noreferrer">LinkedIn</a>
            <a href="https://github.com/katyabalin" target="_blank" rel="noreferrer">GitHub</a>
            <a href="/" >← Back to App</a>
          </div>
        </div>

      </div>
    </div>
  );
}

export default CaseStudy;