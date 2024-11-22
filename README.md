

## Getting Started

# Personal Blog THINKAI

## Overview

This is a personal blog platform where users can sign up, log in, and post articles. The platform allows users to view all posts, filter them by author, and manage their own content. It features a Node.js/Express backend and a Next.js 14 with TypeScript frontend.




### Frontend (Next.js 14/TypeScript)

1. Pages:

   - `/`: Homepage listing all blog posts (Server-Side Rendering).
   - `/login`: Login page for user authentication.
   - `/signup`: Sign-up page for user registration.
   - `/dashboard`: Private route for logged-in users to post articles and view their posts.

2. Features:
   - Client-side routing with protected routes.
   - Responsive and clean UI design using CSS Modules or styled-components.

## Setup Instructions

### Prerequisites

- Node.js >= 16.x
- NPM >= 8.x
- MongoDB instance running locally or on the cloud.

### Steps to Run the Application

1. **Clone the repository**:
   ```bash
   git clone https://github.com/singhvaishu/Thinkaifrontend
   
2.** Install dependencies**;
      
      npm install

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

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
