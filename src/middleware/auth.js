var jwt = require("jsonwebtoken");

// auth middleware for protected apis
const secratekey = process.env.SECRET;
const auth = async (req, res, next) => {
  try {
    const token = req.header("Authorization");

    if (!token) {
      res.status(401).send("Please Authenticate");
    } else {
      const tokenArray = token.split(" ");
      const decoded = jwt.verify(tokenArray[1], "secret");
      req.user = decoded;
      if (!decoded) {
        res.status(401).send("Please Authenticate");
      }

      next();
    }
  } catch (err) {
    res.status(401).send("Please Authenticate");
  }
};
module.exports = auth;
