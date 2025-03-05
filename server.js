require("dotenv").config(); // Load environment variables
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

// Middleware
app.use(cors()); // Enable CORS
app.use(express.json()); // Parse JSON body

console.log("MongoDB URI:", process.env.MONGO_URI);

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log("MongoDB Connected"))
.catch(err => console.error("MongoDB Connection Error:", err));

app.get("/",async (req, res) => {
    res.send(`Available options:
        - /users - ooo
        - /students
        - /students/name`);
})

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
const userRoutes = require("./routes/userRoutes");
app.use("/users", userRoutes);
// const studentRoutes = require("./routes/studentRoutes");
// app.use("/students", studentRoutes);
const productRoutes = require("./routes/productRoutes");
app.use("/products", productRoutes);


