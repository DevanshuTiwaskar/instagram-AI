import { v2 as cloudinary } from 'cloudinary'; // Import Cloudinary v2
import config from '../config/config.js'; // Import config file for credentials
import { Readable } from 'stream'; // Import Readable stream to convert buffer into a readable stream
import { assert } from 'console';
import { format } from 'path';

// Configure Cloudinary with credentials from the config file
cloudinary.config({
    cloud_name: config.CLOUD_NAME, // Cloudinary cloud name
    api_key: config.API_KEY, // Cloudinary API key
    api_secret: config.API_SERCRET // Cloudinary API secret
});

// Function to upload a file to Cloudinary
export const uploadFile = (fileBuffer) => {
    return new Promise((resolve, reject) => {
        // Create an upload stream to Cloudinary
        const uploadStream = cloudinary.
        uploader.
        upload_stream(
            { folder: 'instagram' }, // Upload files inside the 'instagram' folder on Cloudinary
            (err, fileData) => { 
         
                resolve({
                    url: fileData.url,
                    public_id: fileData.public_id,
                    asset_id: fileData.asset_id,
                    format: fileData.format

                }); // If successful, resolve with file data
            }
        );

        // Convert buffer to a readable stream and pipe it into the upload stream
        Readable.from(fileBuffer).pipe(uploadStream);
    });
};
