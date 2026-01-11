require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const seedRoles = require("./config/seedRoles");
const seedUsers = require("./config/seedUsers");


const app = express();
connectDB().then(async () => {
  await seedRoles();
  await seedUsers();
});

app.use(cors());
app.use(express.json());

app.use("/api/auth", require("./routes/auth.routes"));
app.use("/api/roles", require("./routes/role.routes"));
app.use("/api/books", require("./routes/book.routes"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
