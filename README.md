# BookWise - Book Management System

## Overview
BookWise is a modern web application for managing book borrowing and tracking. Built with Next.js 14, it features secure authentication, email verification, and real-time book status tracking.

## Features
- 🔐 Secure JWT Authentication
- ✉️ Email OTP Verification
- 📚 Book Management System
- 👤 User Profile Management
- 📊 Real-time Book Status Tracking

## Tech Stack
- **Frontend:** Next.js 14, React, TailwindCSS
- **Backend:** Next.js API Routes
- **Database:** PostgreSQL with Drizzle ORM
- **Authentication:** NextAuth.js
- **Email:** Nodemailer
- **Styling:** Tailwind CSS, HeadlessUI

## Getting Started

### Prerequisites
- Node.js 18+
- PostgreSQL
- npm/yarn

### Installation
```bash
# Clone repository
git clone <repository-url>

# Install dependencies
npm install

# Setup environment variables
cp .env.example .env.local

# Run database migrations
npm run db:migrate

# Start development server
npm run dev
