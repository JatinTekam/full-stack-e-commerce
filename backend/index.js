import express from "express";
import cors from "cors";

const app = express();

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
    console.log(`Server Running On Port ${PORT}`);
    
});
