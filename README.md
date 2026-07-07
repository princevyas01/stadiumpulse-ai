# StadiumPulse AI — GenAI Command Center for Global Soccer Tournament 2026

### Root Challenge
Mega-event stadiums like a FIFA World Cup 2026 host venue face a coordination problem across four distinct groups operating on different timescales: fans need moment-to-moment guidance, volunteers/staff need shift-level operational awareness, and organizers need tournament-wide strategic visibility — all in real time, across multiple languages, at a scale no single team can track manually. StadiumPulse AI addresses this by giving each group a GenAI-powered view scoped to what they actually need to decide or act on.

### User Needs Addressed
- **Fans** — AI Wayfinding Assistant, Crowd Density Map, Accessibility Mode, Shuttle/Transit ETA Assistant, Sustainability Dashboard, and a multilingual (EN/ES/FR) AI Concierge Chatbot.
- **Volunteers / Venue Staff** — Ops Command Center: live incident feed, AI-generated shift briefings, and an AI Incident Advisor for prioritized, real-time response guidance.
- **Organizers** — Organizer Command View: tournament-wide KPI strip, an AI-generated executive briefing, and a resource allocation overview flagging under-provisioned gates/routes.

### Core Objectives
- Navigation — AI Wayfinding Assistant
- Crowd management — Live Crowd Density Map + predictive alerts, rolled up tournament-wide in the Organizer KPI strip
- Accessibility — Accessibility Mode across all three portals
- Transportation — Shuttle/Transit ETA Assistant, extended by the Organizer resource allocation view
- Sustainability — Sustainability Dashboard, rolled up in the Organizer KPI strip
- Multilingual assistance — AI Concierge Chatbot (EN/ES/FR)
- Operational intelligence — Ops Command Center live feed + Organizer executive briefing
- Real-time decision support — AI Incident Advisor + Organizer resource allocation recommendations

## Solution Overview
**StadiumPulse AI** is a three-portal web application (Fan Portal, Ops Command Center, Organizer Command View) powered by Gemini 2.0 Flash. It addresses all 8 problem-statement pillars by delivering real-time, AI-driven insights and interactive features for the fictional Global Soccer Tournament 2026 host stadium (MetLife Stadium, NJ).

| Pillar | Feature | Portal |
|---|---|---|
| Navigation | AI Wayfinding Assistant — natural-language directions + nearest amenities | Fan |
| Crowd management | Live Crowd Density Map with predictive alerts and AI reroutes | Fan + Ops + Organizer |
| Accessibility | Accessibility Mode — screen-reader optimized, high-contrast, mobility assist | Fan + Ops + Organizer |
| Transportation | Transit ETA Assistant with AI "leave by X" recommendations | Fan + Organizer |
| Sustainability | Sustainability Dash — live stats + AI per-visitor eco tips | Fan + Ops + Organizer |
| Multilingual | AI Concierge Chatbot — auto-detect EN/ES/FR support | Fan |
| Operational Intel | Ops Command Center — live feed, AI shift briefings, anomaly flags | Ops + Organizer |
| Real-time Decisions | AI Incident Advisor — action checklist + escalation recommendation | Ops + Organizer |

## Architecture
```mermaid
graph TD
  User(Fans / Staff) --> NextApp[Next.js 14 App Router]
  NextApp --> FanPortal[Fan Portal]
  NextApp --> OpsPortal[Ops Command Center]
  FanPortal --> API[/api/* Routes]
  OpsPortal --> API
  API --> Zod[Zod Validation]
  Zod --> RateLimit[Rate Limiter]
  RateLimit --> Sanitize[Sanitization]
  Sanitize --> Gemini[Gemini 2.0 Flash]
```

## Tech Stack
- **Framework**: Next.js 14 (App Router, Server Components)
- **Styling**: Tailwind CSS, `lucide-react`
- **AI**: Gemini 2.0 Flash (`@google/genai`)
- **Security**: Zod (validation), custom rate limiter, input sanitization
- **Testing**: Vitest, React Testing Library, `jest-axe`

## Setup Instructions
1. Run `npm install`
2. Copy `.env.example` to `.env.local` and add your `GEMINI_API_KEY`.
3. Run `npm run dev` to start the server on `http://localhost:3000`.

## Testing Instructions
- **Unit & Component Tests**: `npm test`
- **Coverage**: `npm run test:coverage`
- **Accessibility**: Covered in `tests/accessibility.test.tsx` using `jest-axe`.

## Disclaimer
*This is a fictional concept project built for a hackathon. It is not affiliated with FIFA, the Global Soccer Tournament 2026, or MetLife Stadium.*
