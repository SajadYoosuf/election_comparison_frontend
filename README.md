# 🏛️ Kerala Polls Archive - Frontend Data Explorer

[![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=nextdotjs)](https://nextjs.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-0055FF?style=for-the-badge&logo=framer)](https://www.framer.com/motion/)
[![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)

A premium, high-fidelity data exploration interface for the Kerala Election Comparison System. Designed with a corporate-grade dark aesthetic, this dashboard provides seamless access to 70 years of electoral history.

---

## ✨ Features

*   **Modern Visual Language:** Sleek dark mode with glassmorphism, fluid animations (Framer Motion), and responsive high-fidelity layouts.
*   **Historical Timeline (1957–2026):** Interactive exploration of every legislative assembly election cycle.
*   **Deep-Dive Dashboards:**
    *   **Candidate Career Tracker:** Benchmarking performance across decades.
    *   **Constituency Trends:** Visualizing seat flips and alliance strongholds.
    *   **Party Analytics:** Comparing retention and swing metrics.
*   **Multilingual Support:** One-click toggle between English and Malayalam (മലയാളം).
*   **Projection Explorer:** Interactive "Results Modal" for upcoming 2026 data projections.

## 🛠️ Tech Stack

*   **Framework:** Next.js 15+ (App Router)
*   **Styling:** Tailwind CSS (Modern Glassmorphism)
*   **Animations:** Framer Motion
*   **Icons:** Lucide React
*   **Charts:** Recharts (High-performance SVG charts)

## 🏗️ Getting Started

### 1. Prerequisites
*   Node.js 20+
*   npm or yarn

### 2. Installation
```bash
# Navigate to directory
cd frontend

# Install dependencies
npm install
```

### 3. Environment Variables
Create a `.env.local` file:
```env
NEXT_PUBLIC_API_URL=https://your-backend-url.com/api/v1
```

### 4. Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) to view the application.

## 📱 Mobile-First Design
The UI is strictly optimized for mobile responsiveness with:
*   **Custom Bottom Navigation:** Animated pill-indicators for mobile-specific UX.
*   **Adaptive Hero Sections:** Optimized typography and spatial layouts for smaller viewports.
*   **Touch-Target Precision:** High accessibility for interactive data elements.

---

## 🎨 Design System
*   **Core Colors:**
    *   Primary: `#4ae176` (Electric Green)
    *   Background: `#08090a` (Pure Black-Tint)
    *   Surface: `rgba(255, 255, 255, 0.02)`
*   **Typography:** Inter / System Sans for maximum readability of dense data.

Developed with ❤️ by the Kerala Election Archive Team.
