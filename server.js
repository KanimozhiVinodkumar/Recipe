// server.js
const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const recipeRoutes = require("./routes/recipeRoutes");

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/recipes", recipeRoutes);

const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => console.error("MongoDB connection error:", err));
  
  app.get('/', (req, res) => {
    res.send('🍽️ Welcome to the RecipeDB API!');
  });
  
