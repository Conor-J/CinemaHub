// src/server.ts
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import axios from "axios";

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// TMDB API base URL
const TMDB_API_URL = "https://api.themoviedb.org/3";

// ✅ Safe middleware: Handles all paths under /api/
app.use(/^\/api\/(.*)/, async (req: any, res: any) => {

   const path = req.params[0];

  const url = new URL(`${TMDB_API_URL}/${path}`);

  // 🔐 Ensure TMDB API key is defined and valid
  const apiToken = process.env.API_TOKEN;

  if (!apiToken) {
    console.error("❌ API token is missing or empty in .env!");
    return res.status(500).json({ error: "TMDB API token not configured" });
  }

  // 🔐 Only send the key in Authorization header (never in URL)
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${apiToken}`, // 🔐 Only on backend
    },
    data: req.body,
  };

  try {
    const response = await axios(url.toString(), options);
    console.log(
      `✅ TMDB Response: ${response.status} - ${response.data.results?.length || 0} results`,
    );
    res.status(response.status).json(response.data);
  } catch (error: any) {
    console.error(
      "❌ Error fetching from TMDB:",
      error.response?.data || error.message,
      path,
    );
    if (error.response?.status === 401) {
      return res.status(401).json({ error: "Invalid or expired API key" });
    }
    res.status(error.response?.status || 500).json({
      error: error.response?.data?.message || "Failed to fetch data from TMDB",
    });
  }
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ TMDB Proxy Server running on http://localhost:${PORT}`);
});
