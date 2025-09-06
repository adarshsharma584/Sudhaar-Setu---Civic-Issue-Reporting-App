
# Sudhaar Setu - Civic Issue Reporting Platform

## Overview

Sudhaar Setu ("Bridge to Improvement") is a comprehensive civic issue reporting platform that connects citizens with government authorities to report, track, and resolve local infrastructure and public service issues. The platform enables citizens to report problems such as road potholes, water leakage, electricity issues, and cleanliness concerns, while allowing government officials to manage and respond to these reports.

## Features

### For Citizens

- **Issue Reporting**: Submit detailed reports with descriptions, images, and location information
- **Issue Tracking**: Monitor the status of reported issues (pending, in-progress, resolved)
- **Interactive Map**: View reported issues on a map interface to see problem areas in the community
- **User Authentication**: Secure login and signup system for citizens
- **Community Engagement**: Vote on issues to highlight their importance

### For Government Officials

- **Dedicated Portal**: Separate login and dashboard for government officials
- **Issue Management**: Review, update status, and respond to citizen reports
- **Resolution Documentation**: Upload images and comments when resolving issues
- **Department-based Assignment**: Route issues to the appropriate government departments

### General Features

- **Multilingual Support**: Interface available in multiple languages
- **Dark/Light Theme**: Adjustable theme for better user experience
- **Responsive Design**: Works on desktop and mobile devices
- **Real-time Statistics**: Dashboard showing issue statistics and resolution rates

## Technology Stack

- **Frontend**: Next.js 14, React 19
- **UI Components**: Shadcn UI components with Tailwind CSS
- **State Management**: React Context API
- **Authentication**: Local storage-based authentication (can be replaced with a proper backend)
- **Styling**: Tailwind CSS with custom gradients and animations
- **Icons**: Lucide React icons

## Project Structure

```
├── app/                  # Next.js app directory (pages and routes)
│   ├── dashboard/        # User dashboard
│   ├── gov-portal/       # Government official portal
│   ├── issues/           # Issue listing and details
│   ├── login/            # User login
│   ├── map/              # Map view of issues
│   ├── report/           # Issue reporting form
│   └── signup/           # User registration
├── components/           # Reusable React components
│   ├── ui/               # UI components (buttons, cards, etc.)
│   ├── map-component.jsx # Map visualization component
│   ├── navbar.jsx        # Navigation component
│   └── ...               # Other components
├── public/               # Static assets
│   └── images/           # Issue category images
└── styles/               # Global styles
```

## Installation and Setup

1. Clone the repository
   ```bash
   git clone https://github.com/yourusername/sudhaar-setu.git
   cd sudhaar-setu
   ```

2. Install dependencies
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. Run the development server
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Usage

### For Citizens

1. Create an account or log in
2. Report issues using the "Report Issue" button
3. Fill in details about the issue, including location and photos
4. Track the status of your reported issues in your dashboard
5. View all community issues on the map or issues page

### For Government Officials

1. Log in through the government portal
2. Review reported issues in the dashboard
3. Update issue status and add comments
4. Upload resolution photos when issues are fixed

## Customization

- **Theme**: Modify the theme in the `theme-provider.jsx` file
- **Languages**: Add or modify translations in the `language-provider.jsx` file
- **UI Components**: Customize UI components in the `components/ui` directory

## License

[MIT License](LICENSE)

## Acknowledgements

- Built with [Next.js](https://nextjs.org/)
- UI components from [shadcn/ui](https://ui.shadcn.com/)
- Icons from [Lucide React](https://lucide.dev/)

---

© 2023 Sudhaar Setu. All rights reserved.

        