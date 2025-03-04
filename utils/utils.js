import {v2 as cloudinary} from "cloudinary";
import streamifier from "streamifier";


export const customError = (statusCode,message) =>
{
  const error = new Error();
  error.message = message;
  error.statusCode = statusCode;
  return error
}

export const imageUploder = (req) =>
  {
    return new Promise((resolve,reject)=>
    {
      const uploadStream = cloudinary.uploader.upload_stream(
        { public_id: req.file.originalname,
          folder: "Profile-Pics"
         },
        (error, result) => {
  
          if (!result) {
            reject(error);
          }
          resolve(result.secure_url);
        }
      );
      streamifier.createReadStream(req.file.buffer).pipe(uploadStream)
    })
  }
  