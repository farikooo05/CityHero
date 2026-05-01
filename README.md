This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

# CityHero 🦸‍♂️🏙️

**CityHero** is a gamified urban reporting platform built for the hackathon. It empowers citizens to easily report urban problems (broken traffic lights, potholes, etc.) while earning **Microtokens (🪙)** and climbing the district/city leaderboards.

## Features (MVP)
1. **Interactive Map**: Live status of reported problems across the city (using Leaflet).
2. **One-Tap Reporting**: An intuitive, animated flow to capture a photo, location, and issue details.
3. **Gamification & Leaderboard**: Earn microtokens for valid reports. Compete against neighbors on the local and global leaderboards.
4. **Reward System**: A profile view where microtokens can be redeemed for transit passes or partner discounts.
5. **Modern Tech Stack**: Built with Next.js 15, Tailwind CSS v4, and Framer Motion for smooth, wow-factor animations.

## How to Run locally

### Prerequisites
- Node.js (v18.x or later)
- npm or pnpm

### Getting Started

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Run the development server**:
   ```bash
   npm run dev
   ```

3. **Open the app**:
   Navigate to [http://localhost:3000](http://localhost:3000) in your browser.
   *Tip: Use Chrome DevTools to simulate a mobile device (e.g., iPhone 14 Pro) for the best viewing experience, as CityHero is designed mobile-first!*

## Hackathon Pitch & Demo Flow
For a 3-4 minute presentation, follow this simulation flow:
1. **Introduction**: Show the home screen and explain the "gamified civic duty" concept.
2. **The "Wow" Action**: Click the central **Report** button. 
   - Walk through the 3-step animated modal. 
   - Note the automatic location tracking.
   - Show the success animation and points earned.
3. **The Map**: Navigate to the Map tab. Show the new problem marker dropped dynamically with an orange "Pending" icon. Point out other green "Approved" markers.
4. **The Competition**: Open the **Rank** tab. Show how the leaderboard dynamically lists top contributors.
5. **The Payoff**: Open the **Profile** tab. Show the rewards card highlighting that points equal real-world benefits.

## Built With
- **Frontend**: Next.js App Router, React
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Maps**: React-Leaflet
- **Icons**: Lucide-React

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
