const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();


// ===============================
// CORS
// ===============================

const allowedOrigins = [
  "https://watan-seatb-lining-works-m1h5msujw.vercel.app",
  "https://watan-seatb-lining-works-gdvycsvol.vercel.app",
];

app.use(
  cors({
    origin: function (origin, callback) {

      // Allow requests from tools such as
      // Thunder Client / Postman
      if (!origin) {
        return callback(null, true);
      }

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      console.log("Blocked CORS origin:", origin);

      return callback(new Error("Not allowed by CORS"));
    },

    methods: [
      "GET",
      "POST",
      "PUT",
      "DELETE",
      "OPTIONS",
    ],

    allowedHeaders: [
      "Content-Type",
      "Authorization",
    ],

    credentials: false,
  })
);


// ===============================
// Middleware
// ===============================

app.use(express.json());


// ===============================
// Routes
// ===============================

app.use(
  "/api/customers",
  require("./routes/customers")
);

app.use(
  "/api/auth",
  require("./routes/auth")
);

app.use(
  "/api/works",
  require("./routes/works")
);

app.use(
  "/api/payments",
  require("./routes/payments")
);

app.use(
  "/api/dashboard",
  require("./routes/dashboard")
);

app.use(
  "/api/reports",
  require("./routes/reports")
);


// ===============================
// Test API
// ===============================

app.get("/", (req, res) => {
  res.json({
    message: "Watan Seat Lining Works API is running 🚀",
  });
});


// ===============================
// 404
// ===============================

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "API route not found",
  });
});


// ===============================
// Error Handler
// ===============================

app.use((err, req, res, next) => {

  console.error("SERVER ERROR:", err);

  if (err.message === "Not allowed by CORS") {
    return res.status(403).json({
      success: false,
      message: "CORS blocked this request",
    });
  }

  res.status(500).json({
    success: false,
    message: "Internal server error",
  });
});


// ===============================
// Start Server
// ===============================

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
