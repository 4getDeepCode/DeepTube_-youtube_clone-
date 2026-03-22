import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

// Configure ONCE
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadOnCloudinary = async (filePath, folder = "deeptube") => {
  try {
    if (!filePath) return null;

    const response = await cloudinary.uploader.upload(filePath, {
      resource_type: "auto",
      folder: folder,
    });

    // Delete local file safely
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }

    return response.secure_url;
  } catch (error) {
    console.log("Cloudinary Error Message:", error?.message);
    console.log("Cloudinary Error Response:", error?.response);

    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }

    return null;
  }
};

export default uploadOnCloudinary;
