require("dotenv").config({ path: __dirname + "/../.env" });
const path = require("path");
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const loginRoutes = require("./routes/login.routes");
const privateRoutes = require("./routes/private.routes");
const cors = require("cors");

app.use(express.static(path.join(__dirname, "/public")));
app.use(
   cors({
      origin: "https://todo-juansevillano.herokuapp.com/",
      methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
      credentials: true,
   })
);

const uri = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@todo.6zkk22a.mongodb.net/?retryWrites=true&w=majority`;
mongoose.connect(uri);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const isAuth = require("./middlewares/isAuth");

app.use("/api/auth", loginRoutes);
app.use("/api/", isAuth, privateRoutes);

app.get("*", (req, res) => {
   res.sendFile(path.resolve(__dirname + "/public/index.html"));
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`App running in port ${PORT}`));
