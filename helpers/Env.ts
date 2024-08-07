type TypeEnvs =
  | "NEXT_PUBLIC_BACKEND_ENDPOINT"
  | "NEXT_PUBLIC_FRONTEND_URL"
  | "NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN"
  | "NEXT_PUBLIC_GEOLOCATION_API_KEY"
  | "NEXT_PUBLIC_CLIENT_ID"
  | "NEXT_PUBLIC_PLUS_ID"
  | "NEXT_PUBLIC_BUSINESS_ID"
  | "NEXT_PUBLIC_ENTERPRISE_ID"
  | "NEXT_PUBLIC_PLUS_NAME"
  | "NEXT_PUBLIC_BUSINESS_NAME"
  | "NEXT_PUBLIC_ENTERPRISE_NAME";

const getEnv = (env: TypeEnvs) => {
  switch (env) {
    case "NEXT_PUBLIC_BACKEND_ENDPOINT":
      return (
        process.env.NEXT_PUBLIC_BACKEND_ENDPOINT ||
        //"https://tryelia-back.up.railway.app"
          "https://honest-cougars-rhyme.loca.lt/"
      );
    case "NEXT_PUBLIC_FRONTEND_URL":
      return (
        process.env.NEXT_PUBLIC_FRONTEND_URL || "https://eliadev.grehus.com"
      );
    case "NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN":
      return (
        process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN ||
        "pk.eyJ1Ijoibmljb2Rlc2QiLCJhIjoiY2xob3gxdm1nMjA2dDNmczZibmNzYTVwMiJ9.9RhIIzV_3cdfgzZ-ru8d6w"
      );
    case "NEXT_PUBLIC_GEOLOCATION_API_KEY":
      return (
        process.env.NEXT_PUBLIC_GEOLOCATION_API_KEY ||
        "AIzaSyBZUDe9DQlUqBdX0X5VLinc9uuPYvCGjIE"
      );
    case "NEXT_PUBLIC_CLIENT_ID":
      return (
        process.env.NEXT_PUBLIC_CLIENT_ID ||
        "AZuStmZudhGNu5VTixPduir8mdu9dTrm_ZnH0jy8X5WSFDRfdAzOMyaUH2x6ugaQpNB31CpxaOmkyUqR"
      );
    case "NEXT_PUBLIC_PLUS_ID":
      return process.env.NEXT_PUBLIC_PLUS_ID || "P-0DK669435S0797211MUKDYVA";
    case "NEXT_PUBLIC_BUSINESS_ID":
      return (
        process.env.NEXT_PUBLIC_BUSINESS_ID || "P-8DV23956L8475684UMUKDZ5A"
      );
    case "NEXT_PUBLIC_ENTERPRISE_ID":
      return (
        process.env.NEXT_PUBLIC_ENTERPRISE_ID || "P-9GH71976H51687635MUKD2YI"
      );
    case "NEXT_PUBLIC_PLUS_NAME":
      return process.env.NEXT_PUBLIC_PLUS_NAME || "PLUS";
    case "NEXT_PUBLIC_BUSINESS_NAME":
      return process.env.NEXT_PUBLIC_BUSINESS_NAME || "BUSINESS";
    case "NEXT_PUBLIC_ENTERPRISE_NAME":
      return process.env.NEXT_PUBLIC_ENTERPRISE_NAME || "ENTERPRISE";
    default:
      return "";
  }
};

export default getEnv;
