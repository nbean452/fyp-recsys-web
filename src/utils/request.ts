import trimStart from "lodash/trimStart";
import superagent from "superagent";

// interface RequestType {
//   type: "get" | "put" | "post" | "delete";
// }

const requests = {
  delete: superagent.delete,
  get: superagent.get,
  post: superagent.post,
  put: superagent.put,
};

// interface RequestType {
//   type: keyof typeof requests;
//   url: string;
// }

// type RequestType = (type: keyof typeof request, url: string)=> vo;

type RequestType = (
  // eslint-disable-next-line no-unused-vars
  type: keyof typeof requests,
  // eslint-disable-next-line no-unused-vars
  url: string,
  // eslint-disable-next-line no-unused-vars
  token: string,
  // eslint-disable-next-line no-unused-vars
  action: any,
) => any;

const request: RequestType = async (type, url, token, action) => {
  const URL_API =
    process.env.REACT_APP_DEVELOPMENT === "PRODUCTION"
      ? "https://capstone-api.nbenedictcodes.com/"
      : "http://localhost:9000/";
  const newUrl = URL_API + trimStart(url, "/");

  return requests[type](newUrl)
    .set({
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    })
    .end((err, res) => {
      action(res);
    });
};

export default request;
