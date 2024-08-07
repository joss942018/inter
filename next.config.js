/** @type {import('next').NextConfig} */

// const { i18n } = require("./next-i18next.config");

const withNextIntl = require("next-intl/plugin")(
  // This is the default (also the `src` folder is supported out of the box)
  "./internationalization/i18n.ts",
);

const nextConfig = {
  // output: "export",
  // exportTrailingSlash: true,
  // trailingSlash: true,
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "storage.googleapis.com",
        port: "",
        pathname: "/elia_data/**",
      },
    ],
  },
};

module.exports = withNextIntl({ ...nextConfig });
// module.exports = nextConfig;
