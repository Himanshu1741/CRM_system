# CRM System

A comprehensive Customer Relationship Management (CRM) system built with modern web technologies.

## Project Structure

```
crm-system/
├── client/              # Frontend (React / Next.js)
├── server/              # Backend (Node.js / Express)
├── database/            # DB schema & migrations
├── docs/                # Documentation
├── .env                 # Environment variables
├── package.json         # Dependencies
└── README.md            # This file
```

## Getting Started

### Prerequisites
- Node.js (>= 14.x)
- npm or yarn

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   ```bash
   cp .env.example .env
   ```

4. Run the application:
   ```bash
   npm run dev
   ```

## Features

- **Client**: Responsive React/Next.js frontend
- **Server**: Express.js RESTful API
- **Database**: SQL schema with migrations
- **Documentation**: Comprehensive guides and API docs

## Development

- Frontend: `npm run client`
- Backend: `npm run server`
- Both: `npm run dev`

## Contributing

Please follow the coding standards and commit conventions outlined in the docs.

## License

ISC
