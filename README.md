# HelpMeFund

HelpMeFund is a modern crowdfunding platform designed to connect student innovators with potential sponsors, including alumni, NGOs, investors, and educational institutions. Built with Next.js 14 and Firebase, it provides a seamless experience for students to showcase their projects and for sponsors to support promising initiatives.

## Features

### For Students
- Create and manage project campaigns
- Upload project images and details
- Track funding progress
- Post project updates
- Receive notifications for new sponsorships

### For Sponsors
- Browse innovative student projects
- Filter projects by category
- Secure payment processing via Stripe
- Track sponsorship history
- Receive project progress updates

### For Administrators
- Project moderation tools
- User management
- Platform analytics
- Content moderation

## Tech Stack

- **Frontend:** Next.js 14, TailwindCSS, shadcn/ui
- **Backend:** Firebase (Authentication, Firestore, Storage)
- **Authentication:** Firebase Auth (Google & Email)
- **Payments:** Stripe
- **Deployment:** Vercel

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn
- Firebase account
- Stripe account

### Environment Variables

Create a `.env.local` file in the root directory with the following variables:

```bash
# Firebase
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_auth_domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_storage_bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id

# Stripe
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_publishable_key
STRIPE_SECRET_KEY=your_secret_key
NEXT_PUBLIC_URL=http://localhost:3000
```

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/helpmefund.git
cd helpmefund
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Run the development server:
```bash
npm run dev
# or
yarn dev
```

4. Open [http://localhost:3000](http://localhost:3000) with your browser to view the application.

## Project Structure

```
helpmefund/
├── app/                    # Next.js 14 app directory
│   ├── (auth)/            # Authentication routes
│   ├── dashboard/         # Dashboard routes
│   └── api/               # API routes
├── components/            # Reusable UI components
│   ├── ui/               # Base UI components
│   ├── shared/           # Shared components
│   └── [feature]/        # Feature-specific components
├── lib/                  # Utility functions and configs
│   ├── firebase/         # Firebase configurations
│   └── utils.ts          # Helper functions
├── types/                # TypeScript type definitions
└── context/             # React Context providers
```

## Features in Detail

### Authentication
- Email/Password authentication
- Google authentication
- Protected routes
- Role-based access control

### Project Management
- Create and edit projects
- Image upload support
- Project updates
- Funding progress tracking

### Sponsorship System
- Secure payment processing
- Donation history
- Project bookmarking
- Email notifications

### Admin Dashboard
- User management
- Project moderation
- Platform statistics
- Content moderation tools

## Contributing

Contributions are welcome! Please read our [Contributing Guide](CONTRIBUTING.md) for details on our code of conduct and the process for submitting pull requests.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

For support, please open an issue in the GitHub repository or contact the maintainers at support@helpmefund.com.

## Acknowledgments

- [Next.js](https://nextjs.org/)
- [Firebase](https://firebase.google.com/)
- [Stripe](https://stripe.com/)
- [TailwindCSS](https://tailwindcss.com/)
- [shadcn/ui](https://ui.shadcn.com/)
