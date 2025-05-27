import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";
import { writeFileSync } from "fs";
dotenv.config();
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUDINARY_KEY,
    api_secret: process.env.CLOUDINARY_SECRET,
});
export const imageStore = {
    async uploadImage(imageBuffer) {
        const tempPath = "./public/temp.img";
        writeFileSync(tempPath, imageBuffer);
        const result = await cloudinary.uploader.upload(tempPath);
        return result.secure_url;
    },
    async deleteImage(publicId) {
        await cloudinary.uploader.destroy(publicId);
    },
    async getAllImages() {
        const result = await cloudinary.api.resources();
        return result.resources;
    }
};
