const express = require("express");
const cors = require("cors");
require("dotenv").config();

const reportRoutes = require("./routes/reports");
const authRoutes = require("./routes/auth");
const app = express();


app.use(
  cors({
    origin: true,
    credentials: true,
  })
);
app.use(express.json());



// Routes
app.use("/api/customers", require("./routes/customers"));
app.use("/api/auth", authRoutes);
app.use("/api/works", require("./routes/works"));

app.use("/api/payments", require("./routes/payments"));

app.use("/api/dashboard", require("./routes/dashboard"));

app.use("/api/reports", require("./routes/reports"));



// Test
app.get("/", (req,res)=>{
    res.json({
        message:"Watan Seat Lining Works API is running 🚀"
    });
});



const PORT = process.env.PORT || 5000;


app.listen(PORT,()=>{

    console.log(`Server running on port ${PORT}`);

});
