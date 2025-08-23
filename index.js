const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const authRoutes = require("./routes/auth.route");
const postRoutes = require("./routes/post.route");
const userRoutes = require("./routes/user.route");
const adminRoutes = require("./routes/admin.route");
const commentRoutes = require("./routes/comment.route");
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

// Mount routes with proper prefixes
app.use("/api/auth", authRoutes);   // login, register
app.use("/api/posts", postRoutes);  // CRUD posts
app.use("/api/admin", adminRoutes);
app.use("/api/users", userRoutes);
app.use("/api/comments", commentRoutes);



app.listen(PORT, () => {
    console.log(`App is listening on port ${PORT}`);
});
