import express from "express";
import axios from "axios";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config(); // Load environment variables

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.post("/api/check-imei", async (req, res) => {
  try {
    const response = await axios.post(
      "https://api-citizens-prod-imei.gs-ef.com/ceirimeicheck/api/v1/imei/check",
      req.body,
      {
        headers: {
          Host: "api-citizens-prod-imei.gs-ef.com",
          "Content-Type": "application/json",
          Accept: "*/*",
          Connection: "keep-alive",
          "Accept-Language": "en",
          "Accept-Encoding": "gzip, deflate, br",
          "User-Agent":
            "CitizenApp_Ntra/1.0.0 CFNetwork/1568.300.101 Darwin/24.2.0",
        },
      }
    );

    res.json(response.data);
  } catch (error) {
    if (error.response) {
      res.status(error.response.status).json(error.response.data);
    } else if (error.request) {
      res.status(500).json({ error: "No response received from the API" });
    } else {
      res.status(500).json({ error: error.message });
    }
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});