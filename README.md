# 🎟️ TicketIQ

I kept noticing that ticket prices for the same event could vary wildly depending on when you bought — so I built something to understand the pattern and help buyers make smarter decisions.

TicketIQ lets you search any live event, see real pricing data, and get AI-powered analysis explaining what the market is telling you and when the best time to buy is.

## What It Does

Search any artist, team, show, or venue and the app shows you:

- Real-time event listings powered by the Ticketmaster API
- Pricing range for each event
- Event details — venue, date, category
- Direct link to buy tickets on Ticketmaster
- AI-generated market analysis powered by Claude that explains demand, pricing patterns, and the best time to buy

## Stack

- React — frontend framework
- Ticketmaster Discovery API — live event and pricing data
- Claude API (Anthropic) — AI-generated market insights

## What I'd Add Next

- Price history tracking — show how prices have changed over time leading up to an event
- Deal score — a simple rating (great deal / fair / overpriced) based on pricing relative to similar events
- Calendar view — browse events by date instead of just search
- Price drop alerts — notify users when prices fall for a saved event

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

Get a free Ticketmaster API key at [developer.ticketmaster.com](https://developer.ticketmaster.com) and an Anthropic key at [console.anthropic.com](https://console.anthropic.com).# TicketIQ
