import { configDotenv } from "dotenv";
configDotenv()
import express from "express";
import { connectDB } from "./config/db.js";
import { AuthRoutes  } from "./Routes/Auth.js";
import { UsersRoutes } from "./Routes/Users.Router.js";
import { authenticateToken } from "./middleware/auth.js";
import cors from "cors";
import dns from "dns";
dns.setServers(["1.1.1.1","8.8.8.8"]);



connectDB();

const app = express();

app.use(cors());


app.use(express.json());

app.get("/", (req, res) => {
    res.json({
        success: true,
        message: "Server is running",
    });
});

app.use('/v1', AuthRoutes)
app.use('/v1/users',  authenticateToken, UsersRoutes)

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});