require("dotenv").config();
const cloudinary = require("cloudinary").v2;
exports.handler = async (event, context) => {

  console.log("config",cloudinary.config({ 
    cloud_name: process.env.CLOUD_NAME, 
    api_key: process.env.API_KEY, 
    api_secret: process.env.API_SECRET
  }).cloud_name);
  console.log("logging process.env",process.env.CLOUD_NAME);
 

  const existingUrl = JSON.parse(event.body).url;
  const newPublicId = JSON.parse(event.body).publicid;
  const tag = JSON.parse(event.body).tag;
  console.log(existingUrl, newPublicId, tag);

  cloudinary.uploader
    .upload(existingUrl, {
      public_id: newPublicId,
      tag: tag,
      background_removal: "cloudinary_ai",
    })
    .then((result) => {
      console.log(result);
      const retBody = JSON.stringify({
        message: "success",
        res: result,
      });
      console.log(retBody);
      console.log("oooooooo");

      return {
        statusCode: 200,
        body: retBody,
      };
    })
    .catch((error) => {
      console.error(error);
      console.log("error");
      const errBody = {
        statusCode: 500,
        body: JSON.stringify({
          error: error,
        }),
      };
      console.log(errBody);
      console.log("xxxxxxxxxxx")
      return {
        statusCode: 500,
        body: JSON.stringify({
          error: error,
        }),
      };
    });
};
