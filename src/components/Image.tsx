import NextImage, { StaticImageData } from "next/image";

type ImageProps = {
  alt: string;
  src: string | StaticImageData;
  priority?: boolean;
  quality?: number;
};

const Image = ({ alt, src, priority, quality }: ImageProps): JSX.Element => (
  <NextImage
    alt={alt}
    priority={priority}
    quality={quality}
    sizes="(max-width: 768px) 100vw,
              (max-width: 1200px) 50vw,
              33vw"
    src={src}
    style={{ height: "auto", width: "100%" }}
  />
);

Image.defaultProps = {
  priority: false,
  quality: 75,
};

export default Image;
