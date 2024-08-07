const Parse = {
  jwt: (code: string): Object => {
    const base64Url = code.split(".")[1];
    if (!base64Url) return JSON.parse("{}");
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = decodeURIComponent(
      window
        .atob(base64)
        .split("")
        .map(function (c) {
          return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
        })
        .join("")
    );
    return JSON.parse(jsonPayload);
  },
};

export default Parse;
