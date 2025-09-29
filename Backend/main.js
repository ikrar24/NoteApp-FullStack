import express from "express"
import connectDB from "./Database/Connetion/mongoDbConnetion.js"
import cors from "cors"
import UserRoute from "./Database/Modals/User/UserRoutes.js"
import UserLogin from "./Database/Modals/User/User.Login.js"
import NoteRoutes from "./Database/Modals/Notes/noteRoutes.js"
import cookieParser from "cookie-parser";



const app = express()

// origin and cookie set 
app.use(cors({
  origin: (origin, callback) => {
    if (!origin) return callback(null, true); // Postman / server request allow
    callback(null, origin); // dynamically set incoming origin
  },
  credentials: true
}));

// Mongo DB Connection 
connectDB()


const PORT = process.env.PORT || 8000;


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());



// authToken check 
app.get('/check-auth', (req, res) => {
  const token = req.cookies.authToken; // httpOnly cookie read
  if (!token) {
    return res.json({ authenticated: false });
  }

 
  res.json({ authenticated: true });
});


// heath check 
app.get("/" ,(req, res )=>{
    res.send("Hello World")
})


// CRUD of User 
app.use("/api/user" , UserRoute)

// user Login hare 
app.post("/api/login" , UserLogin)


// Create notes 
app.use("/api/notes", NoteRoutes)




app.listen(PORT,()=>{
    console.log("server is Running at PORT" , PORT);
})