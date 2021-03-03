exports.handler = async (event, context) => {
  const existingUrl = JSON.parse(event.body).url;
  const newPublicId = JSON.parse(event.body).publicid;
  const tag = JSON.parse(event.body).tag;

  require("dotenv").config();
  const cloudinary = require("cloudinary").v2;
  cloudinary.uploader
    .upload(existingUrl, {
      public_id: newPublicId,
      tag: tag,
      background_removal: "cloudinary_ai",
    })
    .then((uploadResult) => {
      console.log(JSON.stringify(result, null, 1));
      return {
        statusCode: 200,
        body: JSON.stringify({
          message: `New URL ${result.secure_url}`,
          link: result.secure_url,
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
