# Demo Fork Cloud Kitchen Demo Website

A modern, beautiful demo website for Demo Fork Cloud Kitchen in Moodabidri, built with Next.js 14, TypeScript, and Tailwind CSS.

## Features

- 🎨 Modern, responsive design with smooth animations
- 🍽️ Hero section with compelling call-to-action
- 📸 Photo gallery showcasing special dishes 
- 📱 Instagram integration placeholder 
- 🍕 Comprehensive menu page with categories
- ⚡ Fast and optimized with Next.js 15
- 🎯 Built for demo/presentation purposes

## Tech Stack

- **Framework:** Next.js 15 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Icons:** Lucide React
- **Images:** Unsplash (demo images)

## Getting Started

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Run the development server:**
   ```bash
   npm run dev
   ```

3. **Open your browser:**
   Navigate to [http://localhost:3000](http://localhost:3000)

## Project Structure

```
demo-fork-cloud-kitchen/
├── app/
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Landing page
│   ├── menu/
│   │   └── page.tsx       # Menu page
│   └── globals.css        # Global styles
├── public/                # Static assets
├── package.json
├── tsconfig.json
├── tailwind.config.ts
└── next.config.ts
```

## Pages

### Landing Page (/)
- Hero section with restaurant branding
- "Our Specials" photo gallery
- Instagram feed placeholder
- Contact information
- Call-to-action buttons

### Menu Page (/menu)
- Categorized menu items
- Beautiful food photography
- Pricing information
- Vegetarian/Non-veg tags
- Add to order functionality (demo)

## Customization

To customize for actual deployment:

1. Replace demo food images in `app/page.tsx` and `app/menu/page.tsx`
2. Update contact information (phone number, address)
3. Add real menu items and prices
4. Connect Instagram API for live feed
5. Implement actual ordering functionality
6. Add Google Maps integration
7. Set up analytics

## Demo Notice

This is a demonstration website created to showcase design and functionality for Cravex Cloud Kitchen. All content, including images, prices, and menu items, are placeholders for presentation purposes.

## Build for Production

```bash
npm run build
npm start
```

## License

This is a demo project created for presentation purposes.
