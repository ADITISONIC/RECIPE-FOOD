import express from "express";
import connectDB from "./db";
import authRoutes from './routes/auth'
import bodyParser from "body-parser";
import cors from "cors";
import recipeRoutes from "./routes/recipes";

connectDB();
const app = express();
app.use(express.json());
app.use(
  cors({
    origin: "*", // Or specify: 'http://localhost:3000' if using React frontend
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type"],
  })
);
console.log("Registering routes...");
app.use('/api/auth',authRoutes)
app.use('/api/recipes',recipeRoutes)
app.get("/test", (req, res) => {


  res.send("Server is working");
});



const PORT = 5050;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
