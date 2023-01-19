/* eslint-disable global-require */

const paths = {
  wallpaper: require("public/svg/wallpaper.svg"),
};

type ImgPaths = keyof typeof paths;

const getImg = (path: ImgPaths) => paths[path];

export { getImg, paths };
export type { ImgPaths };
