import cors from 'cors';
import dotenv from 'dotenv';
import rateLimiter from './middleware/rateLimiter.js';
import express from 'express';
import notesRoutes from './routes/notesRoutes.js';
import { connectDB } from './config/db.js';


dotenv.config();


const app = express();
const PORT = process.env.PORT || 5001;


// Middleware to parse JSON
app.use(cors({
    origin: 'http://localhost:5173',
})
);
app.use(express.json());
app.use(rateLimiter);

app.use("/api/notes", notesRoutes);

// Connect to Database
connectDB().then(() => {
    console.log("Connected to the database");
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });

});