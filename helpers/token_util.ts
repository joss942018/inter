import axios from "axios";
import Cookie from "universal-cookie";
// import jwt_decode from "jwt-decode";
import getEnv from "./Env";

export async function getTokenOrRefresh() {
  const cookie = new Cookie();
  const speechToken = cookie.get("speech-token");
  let validToken = false;
  try {
    validToken =
      speechToken && speechToken !== "null" && speechToken !== "undefined";
    // &&
    // !!jwt_decode(speechToken);
  } catch (error) {
    validToken = false;
    console.error(error);
  }
  if (validToken) {
    const idx = speechToken.indexOf(":");
    return {
      authToken: speechToken.slice(idx + 1),
      region: speechToken.slice(0, idx),
    };
  } else {
    try {
      const websocketURL = `${getEnv(
        "NEXT_PUBLIC_BACKEND_ENDPOINT",
      )}/streaming/api/get-speech-token`;
      const res = await axios.get(websocketURL);
      const token = res.data.token.token;
      const region = res.data.token.region;
      cookie.set("speech-token", region + ":" + token, {
        maxAge: 540,
        path: "/",
      });
      return { authToken: token, region: region };
    } catch (err: any) {
      console.error(err.response.data);
      return { authToken: null, error: err.response.data };
    }
  }
}
