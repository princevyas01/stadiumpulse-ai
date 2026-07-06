# StadiumPulse AI — GenAI Command Center for Global Soccer Tournament 2026

## Problem Statement
Build a GenAI-enabled solution that enhances stadium operations and the overall tournament experience for fans, organizers, volunteers, or venue staff. The solution must leverage Generative AI to improve navigation, crowd management, accessibility, transportation, sustainability, multilingual assistance, operational intelligence, or real-time decision support during the Global Soccer Tournament 2026.

## Solution Overview
**StadiumPulse AI** is a two-portal web application (Fan Portal and Ops Command Center) powered by Gemini 2.0 Flash. It addresses all 8 problem-statement pillars by delivering real-time, AI-driven insights and interactive features for the fictional Global Soccer Tournament 2026 host stadium (MetLife Stadium, NJ).

| Pillar | Feature | Portal |
|---|---|---|
| Navigation | AI Wayfinding Assistant — natural-language directions + nearest amenities | Fan |
| Crowd management | Live Crowd Density Map with predictive alerts and AI reroutes | Fan + Ops |
| Accessibility | Accessibility Mode — screen-reader optimized, high-contrast, mobility assist | Fan |
| Transportation | Transit ETA Assistant with AI "leave by X" recommendations | Fan |
| Sustainability | Sustainability Dash — live stats + AI per-visitor eco tips | Fan + Ops |
| Multilingual | AI Concierge Chatbot — auto-detect EN/ES/FR support | Fan |
| Operational Intel | Ops Command Center — live feed, AI shift briefings, anomaly flags | Ops |
| Real-time Decisions | AI Incident Advisor — action checklist + escalation recommendation | Ops |

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
