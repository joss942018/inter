import createMiddleware from "next-intl/middleware";
import { withAuth } from "next-auth/middleware";
import { locales } from "./internationalization/navigation";
import { NextRequest } from "next/server";

// for dynamic routes always use ":id" to indicate that it's going to be a number
const publicPages = [
  "/",
  "/login",
  "/signup",
  "/contact",
  "/help",
  "/survey/:id",
  "/componentsTest",
  "/subscription",
  "/password-recovery",
  "/password-recovery/new-password",
  "/email-verification/:id/:id",
  "/mental-health",
];

// export default createMiddleware({
//   // A list of all locales that are supported
//   locales,

//   // If this locale is matched, pathnames work without a prefix (e.g. `/about`)
//   defaultLocale: "en",
// });

const intlMiddleware = createMiddleware({
  locales,
  localePrefix: "as-needed",
  defaultLocale: "en",
});

const authMiddleware = withAuth(
  // Note that this callback is only invoked if
  // the `authorized` callback has returned `true`
  // and not for pages listed in `pages`.
  function onSuccess(req) {
    return intlMiddleware(req);
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
    pages: {
      signIn: "/login",
    },
  },
);

export default async function middleware(req: NextRequest) {
  const publicPathnameRegex = RegExp(
    `^(/(${locales.join("|")}))?(${publicPages
      .map((page) => page.replace(/:\w+/g, "[a-zA-Z0-9-]+")) // Reemplazar todos los parámetros dinámicos con [a-zA-Z0-9-]+
      .join("|")})?/?$`,
    // .join("|")})?(/[a-zA-Z0-9-]+)?/?$`,
    "i",
  );

  const isPublicPage = publicPathnameRegex.test(req.nextUrl.pathname);
  if (isPublicPage) {
    return intlMiddleware(req);
  } else {
    return (authMiddleware as any)(req);
  }
}

export const config = {
  // Skip all paths that should not be internationalized. This example skips the
  // folders "api", "_next" and all files with an extension (e.g. favicon.ico)
  matcher: ["/((?!api|_next|.*\\..*).*)"],
};
