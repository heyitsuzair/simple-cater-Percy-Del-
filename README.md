# SimpleCater

A restaurant listing application with Webflow CMS integration.

## Setup

1. Install dependencies:
```bash
npm install
```

2. Start the server:
```bash
npm start
```

The server will run on `http://localhost:3000`

## How it works

- The Node.js server acts as a proxy for the Webflow API, keeping the API token secure on the server side
- The frontend makes requests to `/api/webflow/*` which are proxied to the Webflow API
- The server also serves the static HTML file

## API Endpoints

- `GET /api/webflow/sites` - Get all sites
- `GET /api/webflow/sites/:siteId/collections` - Get collections for a site
- `GET /api/webflow/collections/:collectionId/items` - Get items from a collection

## Environment Variables

The Webflow API token is currently hardcoded in `server.js`. For production, consider using environment variables:

```javascript
const WEBFLOW_API_TOKEN = process.env.WEBFLOW_API_TOKEN || 'your-token-here';
```

Then set it when running:
```bash
WEBFLOW_API_TOKEN=your-token npm start
```

