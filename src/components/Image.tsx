import NextImage, { StaticImageData } from "next/image";

type ImageProps = {
  alt: string;
  src: string | StaticImageData;
  quality?: number;
};

const Image = ({ alt, src, quality }: ImageProps): JSX.Element => (
  <NextImage
    alt={alt}
    quality={quality}
    sizes="(max-width: 768px) 100vw,
              (max-width: 1200px) 50vw,
              33vw"
    src={src}
    style={{ height: "auto", width: "100%" }}
  />
);

Image.defaultProps = {
  quality: 75,
};

export default Image;
