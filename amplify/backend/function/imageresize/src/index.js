const sharp = require("sharp");

const aws = require("aws-sdk");
const s3 = new aws.S3();

exports.handler = async function (event, context) {
  if (event.Records[0].eventName === "ObjectRemoved:Delete") {
    return;
  }
  //Resize image
  //Resize image

  const BUCKET = event.Records[0].s3.bucket.name;
  const KEY = event.Records[0].s3.object.key;
  const TYPE = event.Records[0].s3.object.type;

  if (["jpeg", "jpg", "gif", "png"].includes(TYPE)) {
    try {
      let image = await s3.getObject({ Bucket: BUCKET, Key: KEY }).promise();
      image = await sharp(image.Body);
      const metadata = await image.metadata();

      if (metadata.width >= 600) {
        const resizeImage = await image.resize({ width: 600 }).toBuffer();
        await s3
          .putObject({
            Bucket: BUCKET,
            Body: resizeImage,
            Key: KEY,
            Body: buffer,
          })
          .promise();
        return;
      } else {
        return;
      }
    } catch (error) {
      context.fail(`Error resizing image: ${error}`);
    }
  }
};
