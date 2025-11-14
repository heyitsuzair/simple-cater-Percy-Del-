const express = require("express");
const cors = require("cors");
const fetch = require("node-fetch");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;
const WEBFLOW_API_TOKEN =
  process.env.WEBFLOW_API_TOKEN ||
  "aeeca164e5e58e745946f476932a6528fa93248fb7ba8402145d5f40d997d543";
const WEBFLOW_API_BASE = "https://api.webflow.com/v2";

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(__dirname));

// Proxy endpoint for Webflow API
app.get("/api/webflow/*", async (req, res) => {
  try {
    // Extract the path after /api/webflow/
    const webflowPath = req.path.replace("/api/webflow", "");
    const url = `${WEBFLOW_API_BASE}${webflowPath}${
      req.url.includes("?") ? req.url.substring(req.url.indexOf("?")) : ""
    }`;

    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${WEBFLOW_API_TOKEN}`,
        "accept-version": "1.0.0",
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      return res.status(response.status).json({
        error: `Webflow API error: ${response.status}`,
        details: errorText,
      });
    }

    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error("Proxy error:", error);
    res.status(500).json({
      error: "Internal server error",
      message: error.message,
    });
  }
});

// Serve the HTML file for all routes (SPA support)
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

// Only start server if not in Vercel environment
if (process.env.VERCEL !== "1") {
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

// Export for Vercel
module.exports = app;
