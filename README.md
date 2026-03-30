# 🎟️ TicketIQ

**Live app → [ticketiq-react.vercel.app](https://ticketiq-react.vercel.app)**  
**Case study → [ticketiq-react.vercel.app/case-study](https://ticketiq-react.vercel.app/case-study)**

Buying tickets is a black box. You see a price and have no idea if it's going up, going down, or whether you're about to miss out. I built TicketIQ to solve that.

TicketIQ gives you **market intelligence before you buy** — a demand score, a clear buying recommendation, and AI-powered analysis that explains what's actually happening in the market for that specific event.

---

## What It Does

Search any artist, team, show, or venue and the app gives you:

- **Trending events** on the homepage — see what's hot right now
- **Demand Score (0–100)** — an original algorithm that calculates how hot an event is based on artist popularity, venue size, and days until the event
- **Best Time to Buy** — a plain-English recommendation: Buy Now / Buy Within the Week / Wait for a Deal
- **AI Market Analysis** — Claude API generates specific, contextual buying advice for each event
- **Direct buy link** to Ticketmaster

---

## How the Demand Score Works

The demand score combines four weighted signals from the Ticketmaster API:

| Signal | Max Points | Logic |
|--------|-----------|-------|
| Event Timing | 35 | ≤7 days = 35 · ≤30 days = 25 · ≤90 days = 15 |
| Artist Popularity | 40 | Based on Ticketmaster's own popularity score |
| Venue Type | 15 | Major venue = 15 · Other = 5 |
| Tickets on Sale | 10 | Active price data present = 10 |

Scores map to labels: Very High Demand 🔥 · High Demand ⚡ · Moderate Demand 📈 · Low Demand 🎟️

---

## Stack

- **React** — frontend framework
- **Ticketmaster Discovery API** — live event data and images
- **Claude API (Anthropic)** — AI-generated market insights via Vercel serverless function
- **Vercel** — deployment and serverless functions

---

## Key Product Decision

Ticketmaster's free API doesn't reliably return pricing data. Instead of showing a broken "pricing unavailable" message, I built the demand scoring algorithm as a proxy for price pressure. That turned out to be more actionable than a raw number — users get a recommendation, not just data.

---

## What I'd Add Next

- **Event comparison** — analyze two events side by side and recommend which to prioritize
- **Price history tracking** — show how demand has changed over time
- **Email alerts** — notify users when a saved event's demand score changes
- **Social proof** — "X people are watching this event"

---

## Run It Locally

```bash
git clone https://github.com/katyabalin/ticketiq-react.git
cd ticketiq-react
npm install
```

Create a `.env` file:

```
REACT_APP_TICKETMASTER_API_KEY=your-key-here
REACT_APP_ANTHROPIC_API_KEY=your-key-here
```

Then:

```bash
npm start
```

Get a free Ticketmaster API key at [developer.ticketmaster.com](https://developer.ticketmaster.com) and an Anthropic key at [console.anthropic.com](https://console.anthropic.com).

---

Built by [Katya Balin](https://linkedin.com/in/katya-balin) · CS Senior, The George Washington University · D1 Varsity Tennis