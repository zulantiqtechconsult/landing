# ZULANTIQ Landing - Frontend

Angular 17 application for ZULANTIQ's landing page.

## Prerequisites

- Node.js 18+ and npm
- Angular CLI 17+ (optional, included in devDependencies)

## Installation

```bash
npm install
```

## Development Server

Run the development server:

```bash
npm start
```

Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Build

Build the project for production:

```bash
npm run build:prod
```

The build artifacts will be stored in the `dist/` directory.

## Project Structure

```
frontend/
├── src/
│   ├── app/
│   │   ├── components/      # All page components
│   │   │   ├── navbar/
│   │   │   ├── hero/
│   │   │   ├── services/
│   │   │   ├── why/
│   │   │   ├── locations/
│   │   │   ├── startup/
│   │   │   ├── contact/
│   │   │   └── footer/
│   │   ├── services/        # Angular services
│   │   │   ├── api.service.ts
│   │   │   └── language.service.ts
│   │   ├── models/          # TypeScript interfaces
│   │   │   └── models.ts
│   │   ├── app.module.ts
│   │   ├── app-routing.module.ts
│   │   └── app.component.*
│   ├── assets/              # Static assets
│   │   └── images/
│   ├── index.html
│   └── styles.scss          # Global styles
├── angular.json
├── tsconfig.json
└── package.json
```

## Features

- **Responsive Design**: Optimized for all screen sizes
- **Language Toggle**: Spanish/English support
- **Contact Form**: Reactive forms with validation
- **Smooth Scrolling**: Navigation with anchor links
- **API Integration**: Connects to Node.js backend
- **Modern UI**: Animations and glassmorphism effects

## Backend Connection

The frontend connects to the backend API at `http://localhost:3000/api`. Make sure the backend server is running:

```bash
cd ../backend
npm install
npm start
```

## Environment Variables

The API URL is configured in `api.service.ts`. For production, update the `apiUrl` to your production backend URL.

## Technologies

- Angular 17
- TypeScript 5.2
- RxJS 7.8
- SCSS
- Reactive Forms
- HttpClient

## License

Copyright © 2025 ZULANTIQ. All rights reserved.
