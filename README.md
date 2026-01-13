# ARİS VİA MEDIA - Premium Digital Agency Website

A modern, luxury digital agency website built with Next.js 16, featuring a premium dark aesthetic with gold accents.

## Features

- ✨ **Premium Design** - Dark theme with gold accents, glassmorphism effects
- 🎨 **Dynamic Hero Section** - Animated floating cards with admin management
- 📁 **Portfolio Management** - Showcase your work with file uploads
- 💰 **Service Packages** - Manage pricing and features
- 💬 **Testimonials** - Customer reviews management
- ⚙️ **Admin Panel** - Full CMS for managing all content
- 📱 **Responsive** - Works on all devices
- 🚀 **Fast** - Optimized with Next.js Turbopack

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Fonts**: Plus Jakarta Sans, Syne
- **Database**: PostgreSQL (optional - works with localStorage)

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/arisvia-web.git
cd arisvia-web
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000)

### Database Setup (Optional)

The app works without a database using localStorage. For production with persistent storage:

1. Create a PostgreSQL database (Vercel Postgres, Neon, Supabase, etc.)
2. Set `DATABASE_URL` in your environment variables
3. Enable database in `lib/prisma.ts`: `const ENABLE_DATABASE = true`
4. Run `npx prisma db push` to create tables

## Deployment to Vercel

1. Push your code to GitHub
2. Import the repository in [Vercel](https://vercel.com)
3. Vercel will auto-detect Next.js and configure build settings
4. (Optional) Add `DATABASE_URL` environment variable for persistent storage
5. Deploy!

## Project Structure

```
├── app/
│   ├── admin/           # Admin panel pages
│   ├── actions/         # Server actions
│   ├── api/             # API routes (file uploads)
│   ├── page.tsx         # Homepage
│   └── layout.tsx       # Root layout
├── components/
│   ├── home/            # Homepage sections
│   ├── ui/              # Reusable UI components
│   ├── Navbar.tsx       # Navigation
│   └── HeroSection.tsx  # Hero with floating cards
├── lib/
│   ├── prisma.ts        # Database client
│   └── localData.ts     # localStorage management
├── public/
│   └── uploads/         # Uploaded files
└── prisma/
    └── schema.prisma    # Database schema
```

## Admin Panel

Access the admin panel at `/admin`:

- **Hero Cards** - Manage floating cards on homepage
- **Portfolio** - Add/edit projects with file uploads
- **Packages** - Manage pricing plans
- **Testimonials** - Customer reviews
- **Logo Settings** - Upload and configure logo
- **Site Settings** - SEO and global settings

## License

MIT License - Feel free to use for personal or commercial projects.

---

Built with ❤️ by ARİS VİA MEDIA
