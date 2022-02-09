const jwt = require("jsonwebtoken");

module.exports = function(req, res, next) {

  console.log("Auth Express Mid: " , req.header);

  let token = req.headers['x-access-token'] || req.headers['authorization']; 

  // Remove Bearer from string
  token = token.replace(/^Bearer\s+/, "");
  
  console.log('Auth Middle Token:' , token);

  if (!token) return res.status(401).json({ message: "Auth Error" });

  try {

      let decoded = jwt.verify( token , "randomString");
      console.log('Decoded:' , decoded);
      req.user = decoded.user;
      next();

  } catch (e) {

      console.error(e);
      res.status(500).send({ message: "Invalid Token" });

  }

};