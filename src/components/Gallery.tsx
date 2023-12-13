import images from "@/data/images.json";
import Image from "next/image";
import sharp from "sharp";

async function getBlurredImage(url: string) {
  const response = await fetch(url);
  const arrayBuffer = await response.arrayBuffer();
  const image = sharp(arrayBuffer);
  const { width, height } = await image.metadata();
  const resizedImageBuffer = await image
    .resize(32, 32, { fit: "inside" })
    .png({
      quality: 40,
    })
    .toBuffer();

  const imageBase64 = `data:image/jpeg;base64,${resizedImageBuffer.toString(
    "base64"
  )}`;

  return {
    imageBase64,
    width,
    height,
  };
}

async function getImages() {
  // images with blur hashes
  const withBlurredImages = images.map(async (image) => {
    const { imageBase64, width, height } = await getBlurredImage(image.src);
    return {
      ...image,
      width,
      height,
      imageBase64,
    };
  });

  // wait for all images to be processed
  return await Promise.all(withBlurredImages);
}

export default async function Gallery() {
  const imagesToShow = await getImages();
  return (
    <div className="flex flex-wrap justify-center">
      {imagesToShow.map((image, index) => (
        <Image
          src={image.src}
          alt={image.title}
          width={200}
          height={200}
          placeholder="blur"
          blurDataURL={image.imageBase64}
          key={image.id}
        />
      ))}
    </div>
  );
}
