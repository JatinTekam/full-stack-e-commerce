import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
const app = express();

// app.get("/",(req,res)=>{

//     return res.status(200).json({"status":"done"})
// })

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser())

const corsOption={
    origin:"http://localhost:5173",
    credentials:true
}

app.use(cors(corsOption));

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
    console.log(`Server Running On Port ${PORT}`);
    
});
