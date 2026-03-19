import jwt from "jsonwebtoken";

const genToken = (userId) => {
  if (!userId) {
    throw new Error("User ID is required to generate token");
  }

  try {
    const token = jwt.sign(
      { id: userId },                 // payload
      process.env.JWT_SECRET,         // secret key
      { expiresIn: "7d" }             // expiry
    );

    return token;
  } catch (error) {
    console.error("JWT Generation Error:", error.message);
    throw error;
  }
};

export default genToken;