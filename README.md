# SimpleCater

A restaurant listing application with Webflow CMS integration.

## Features

- Browse restaurants with filtering by market, region, cuisine, and dietary preferences
- Real-time filtering and pagination
- Progressive loading of restaurant data
- Responsive design

## Local Development

1. Install dependencies:
```bash
npm install
# or
yarn install
```

2. Set up environment variables (optional - defaults are provided):
```bash
export WEBFLOW_API_TOKEN=your_token_here
```

3. Start the development server:
```bash
npm start
# or
npm run dev  # with nodemon for auto-reload
```

4. Open http://localhost:3000 in your browser

## Vercel Deployment

This project is configured for Vercel deployment.

### Deploy to Vercel

1. Install Vercel CLI (if not already installed):
```bash
npm i -g vercel
```

2. Deploy:
```bash
vercel
```

3. Set environment variables in Vercel dashboard:
   - Go to your project settings
   - Add `WEBFLOW_API_TOKEN` environment variable

### Manual Deployment

1. Push your code to GitHub
2. Import the repository in Vercel
3. Vercel will automatically detect the configuration
4. Add the `WEBFLOW_API_TOKEN` environment variable in project settings

## Project Structure

- `index.html` - Main application file
- `server.js` - Express server for local development and Vercel
- `api/webflow/[...path].js` - Serverless function for Webflow API proxy
- `vercel.json` - Vercel configuration

## Environment Variables

- `WEBFLOW_API_TOKEN` - Your Webflow API token (required for API calls)
