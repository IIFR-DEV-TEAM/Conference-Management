# Conference Management System

A modern conference management platform built with Next.js 14 and Supabase, designed to streamline academic conference organization.

## Features

- **Authentication**
  - Email/Password signup with verification
  - Password recovery flow
  - Protected routes and session management

- **User Interface**
  - Responsive design (mobile-first)
  - Dark/Light mode toggle
  - Modern UI components with shadcn/ui
  - Smooth animations with Framer Motion

- **Conference Management** 
  - Create and manage conferences
  - Author paper submissions
  - Review management
  - Conference schedules

## Tech Stack

- **Frontend:** Next.js 14, TypeScript, Tailwind CSS
- **Backend:** Supabase
- **Authentication:** Supabase Auth
- **UI Components:** shadcn/ui
- **Form Validation:** React Hook Form, Zod
- **Icons:** Lucide Icons

## Getting Started

1. Clone the repository:
```bash
git clone https://github.com/yourusername/Conference-Management.git
cd Conference-Management
```
2.Install dependencies:

```bash
npm install
```

3.Set up environment variables: 
```bash
cp .env.example .env.local
```
Update .env.local with your credentials:

```bash
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
NEXT_PUBLIC_RECAPTCHA_SITE_KEY=your_recaptcha_site_key
RECAPTCHA_SECRET_KEY=your_recaptcha_secret_key
```

4. Start the development server:

```bash
npm run dev
```
Visit http://localhost:3000 to see the application.

## Project Structure
```plaintext
Conference-Management/
├── app/                    # Next.js app directory
│   ├── (auth)/            # Authentication routes
│   │   ├── login/         # Login page
│   │   ├── register/      # Registration page
│   │   └── verify/        # Email verification
│   ├── dashboard/         # Dashboard pages
│   └── api/               # API routes
├── components/            # Reusable components
│   ├── ui/               # UI components
│   └── forms/            # Form components
├── lib/                   # Utility functions
├── styles/               # Global styles
└── types/                # TypeScript types
```

## Authentication Flow

### Registration:
- User signs up with email/password
- Email verification with OTP
- reCAPTCHA verification
- Profile completion

### Login:
- Email/password authentication
- Persistent sessions
- Password recovery option

### Protected Routes:
- Route protection with middleware
- Role-based access control
- Session management

## Development 
```bash

# Run development server
npm run dev

# Run type checking
npm run type-check

# Run linting
npm run lint

# Run tests
npm run test

```

## Contributing 

1. Fork the repository  
2. Create a feature branch (`git checkout -b feature/amazing-feature`)  
3. Commit changes (`git commit -m 'Add amazing feature'`)  
4. Push to branch (`git push origin feature/amazing-feature`)  
5. Open a Pull Request  


## License
This project is licensed under the MIT License - see the LICENSE file for details. 

