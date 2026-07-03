# Dave Flew Automotive

A high-performance, brutalist-inspired web application for Dave Flew Automotive. Built with a focus on speed, high-contrast accessibility, and a seamless booking experience for customers in Weston-super-Mare.

## 🏎️ Tech Stack

- **Frontend:** [Next.js](https://nextjs.org/) (App Router) & React 19
- **Styling:** [Tailwind CSS](https://tailwindcss.com/) (Brutalist Design System)
- **Backend & Database:** [Supabase](https://supabase.com/) (PostgreSQL)
- **Deployment:** [Vercel](https://vercel.com/) (Co-located in London `lhr1`)

## 🎨 Design Philosophy

The site employs a **Brutalist** aesthetic characterized by:
- High-contrast, monochromatic color palette with stark black (`#000000`) and pure white.
- Aggressive, hard-edged borders and un-blurred drop shadows (`shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]`).
- Bold, uppercase typography for maximum readability.
- Micro-animations and hover effects that emphasize structural weight (e.g., buttons depressing on click).

## 🔒 Security & Architecture

- **Server Components (RSC):** The majority of the application renders on the server, shipping zero unnecessary JavaScript to the client.
- **Secure Server Actions:** Database mutations strictly run on the server and mathematically verify the user's authentication token (`getUser()`) before execution.
- **Optimized Latency:** The Vercel frontend (`lhr1`) and Supabase database (`eu-west-2`) are geographically co-located in London to ensure sub-millisecond database queries.

## 🚀 Getting Started

### 1. Clone the repository
```bash
git clone https://github.com/BAT4K/dave-flew-automotive.git
cd dave-flew-automotive
```

### 2. Install dependencies
```bash
npm install
```

### 3. Environment Variables
Create a `.env.local` file in the root directory and add your Supabase keys:
```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 4. Run the Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 🔧 Database Setup

If you need to rebuild the Supabase backend from scratch, simply copy and paste the contents of `database_setup.md` (or the unified setup script) into your Supabase SQL Editor. This will automatically generate the `jobs` table, configure the security policies, and apply necessary Row Level Security (RLS) triggers.

---

*Designed and engineered for Dave Flew Automotive.*
