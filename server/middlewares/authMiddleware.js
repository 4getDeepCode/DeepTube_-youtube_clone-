import jwt from "jsonwebtoken";

const authMiddleware = (req, res, next) => {
  try {
    const { token } = req.cookies;

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized: No token provided",
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (!decoded) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized: Invalid token",
      });
    }

    req.userId = decoded.id; // matches token.js payload
    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Unauthorized: Token failed",
    });
  }
};

export default authMiddleware;
