# Dino-Dash

A real-time dinosaur race tracker for tabletop gaming sessions. Display race progress on a big screen while players update their dinosaur's position from their phones.

## Features

- **Jumbotron View** - Live race visualization with animated bar chart
- **Player View** - Mobile-friendly controls to update distance, status, and rider name
- **Admin Panel** - Reset race or seed database
- **Real-time Sync** - All changes instantly appear across all connected devices
- **Winner Celebration** - Confetti explosion when a dinosaur crosses the finish line

## Setup

1. Clone the repo
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file with your Firebase config (see `.env.example`)
4. Start the dev server:
   ```bash
   npm run dev
   ```

## Firebase Setup

1. Create a project at [Firebase Console](https://console.firebase.google.com)
2. Enable Realtime Database
3. Copy your web app config to `.env`

## Usage

1. Open `/host` on a TV or big screen
2. Players open `/play` on their phones
3. Each player selects a dinosaur and enters their character name
4. Add distance as the race progresses
5. First to 400ft wins!

## Tech Stack

- React 19
- Vite
- Firebase Realtime Database
- Recharts
- Tailwind CSS v4
