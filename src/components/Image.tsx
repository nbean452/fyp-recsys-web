import NextImage from "next/image";
import type { ImageProps } from "next/image";

const Image = ({
  alt,
  src,
  priority,
  placeholder,
  quality,
}: ImageProps): JSX.Element => (
  <NextImage
    alt={alt}
    placeholder={placeholder}
    priority={priority}
    quality={quality}
    sizes="(max-width: 768px) 100vw,
              (max-width: 1200px) 50vw,
              33vw"
    src={src}
    style={{ height: "auto", width: "100%" }}
  />
);

export default Image;
