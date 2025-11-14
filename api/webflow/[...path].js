const fetch = require("node-fetch");

const WEBFLOW_API_BASE = "https://api.webflow.com/v2";
const WEBFLOW_API_TOKEN =
  process.env.WEBFLOW_API_TOKEN ||
  "aeeca164e5e58e745946f476932a6528fa93248fb7ba8402145d5f40d997d543";

module.exports = async (req, res) => {
  // Enable CORS
  res.setHeader("Access-Control-Allow-Credentials", true);
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET,OPTIONS,PATCH,DELETE,POST,PUT"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version"
  );

  if (req.method === "OPTIONS") {
    res.status(200).end();
    return;
  }

  try {
    // Get the path from the catch-all route
    const path = req.query.path || [];
    const webflowPath = Array.isArray(path) ? `/${path.join("/")}` : `/${path}`;

    // Build the query string if present
    const queryString = req.url.includes("?")
      ? req.url.substring(req.url.indexOf("?"))
      : "";
    // Remove the path parameter from query string
    const cleanQueryString = queryString
      .split("&")
      .filter((param) => !param.startsWith("path="))
      .join("&");

    const url = `${WEBFLOW_API_BASE}${webflowPath}${
      cleanQueryString ? `?${cleanQueryString.replace(/^\?/, "")}` : ""
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
};
