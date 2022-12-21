import NextImage from "next/image";
import type { ImageProps } from "next/image";

const Image = ({
  alt,
  fill,
  height,
  src,
  priority,
  placeholder,
  quality,
  width,
}: ImageProps): JSX.Element => (
  <NextImage
    alt={alt}
    fill={fill}
    height={height}
    placeholder={placeholder}
    priority={priority}
    quality={quality}
    sizes="(max-width: 768px) 100vw,
              (max-width: 1200px) 50vw,
              33vw"
    src={src}
    style={{ height: "auto", width: "100%" }}
    width={width}
  />
);

export default Image;
