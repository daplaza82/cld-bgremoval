

exports.handler = async (event, context) => {
  require("dotenv").config();
  const cloudinary = require("cloudinary").v2;
  console.log(cloudinary.config.cloud_name);
  
  const existingUrl = JSON.parse(event.body).url;
  const newPublicId = JSON.parse(event.body).publicid;
  const tag = JSON.parse(event.body).tag;
  console.log(existingUrl,newPublicId,tag)

  cloudinary.uploader
    .upload(existingUrl, {
      public_id: newPublicId,
      tag: tag,
      background_removal: "cloudinary_ai",
    })
    .then((result) => {
      console.log(result);
      return {
        statusCode: 200,
        body: JSON.stringify({
          message: "success",
          res: result
        }),
      };
    })
    .catch((error) => {
      console.error(error);
      return {
        statusCode: 500,
        body: JSON.stringify({
          error: error,
        }),
      };
    });
};
