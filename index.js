const express = require("express");
const connectDB = require("./config/db.js");

const app = express();

connectDB();

app.use(express.json({ extended: true }));

const PORT = process.env.PORT || 4000;

app.use("/api/users", require("./routes/users"));
app.use("/api/auth", require("./routes/auth"));
app.use("/api/categorie", require("./routes/categorie"));
app.use("/api/movie", require("./routes/movie"));

app.listen(PORT, () => {
  console.log(`El servidor esta encendido en el puerto ${PORT}`);
});
