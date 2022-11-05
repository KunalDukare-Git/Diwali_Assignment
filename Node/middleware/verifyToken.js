import jwt from "jsonwebtoken";

export const verifyToken = async (req, res, next) => {
  try {
    const token = req.header("Authorization");
    let jwtSecretKey = "SECRET_KEY";

    if (!token) {
      return res.send({
        status: false,
        message: "A token is required for authentication",
      });
    }
    try {
      const decode = jwt.verify(token, jwtSecretKey);
      req.verifiedToken = decode;
      next();
    } catch (err) {
      return res.status(401).send("Invalid Token");
    }
  } catch (error) {
    throw error
  }
};
