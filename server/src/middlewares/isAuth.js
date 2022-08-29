const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
   try {
      const userHeader = req.headers["authorization"];
      if (!userHeader) return res.status(401).json("You must log to continue");

      const bearer = userHeader.split(" ");
      const bearerToken = bearer[1];
      const token = jwt.verify(bearerToken, process.env.SESSION_SECRET);
      if (!token) throw new Error();
      const id = token.id;
      req.user = id;
      next();
   } catch (error) {
      res.status(error.status || 500).json({
         status: "error",
         message: error.message,
         data: null,
      });
   }
};
