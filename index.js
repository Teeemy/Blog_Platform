const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");

// Correct path and name
const authRoutes = require("./routes/auth.routes");
const blogRoutes = require("./routes/blog.routes")
const cookieParser = require("cookie-parser");

dotenv.config();
const app = express();

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URL)
    .then(() => console.log("DB is successfully connected"))
    .catch((error) => console.error("DB connection error:", error));

const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cookieParser());

// Test route
app.get("/", (req, res) => {
    res.send("Welcome to Mariam's Blog Platform");
});

// Mount routes
app.use("/", authRoutes);
app.use("/",blogRoutes)

app.listen(PORT, () => {
    console.log(`App is listening on port ${PORT}`);
});
