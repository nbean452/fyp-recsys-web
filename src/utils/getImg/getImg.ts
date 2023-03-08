/* eslint-disable global-require */

const paths = {
  confused: require("public/img/confused.jpg"),
  // wallpaper: require("public/svg/wallpaper.svg"),
  placeholder: require("public/img/placeholder.jpg"),
};

type ImgPaths = keyof typeof paths;

const getImg = (path: ImgPaths) => paths[path];

export { getImg, paths };
export type { ImgPaths };
