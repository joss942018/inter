import getEnv from "@/helpers/Env";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
const handler = NextAuth({
  pages: {
    signIn: "/login",
    signOut: "/logout",
    newUser: "/register",
  },
  providers: [
    CredentialsProvider({
      // The name to display on the sign in form (e.g. "Sign in with...")
      name: "Credentials",
      // `credentials` is used to generate a form on the sign in page.
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        email: { label: "Username", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" },
        locale: { label: "Language", type: "text", placeholder: "en" },
      },
      async authorize(credentials, req) {
        // Add logic here to look up the user from the credentials supplied
        if (!credentials?.email || !credentials?.password)
          throw new Error("Missing credentials");

        const options = {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Accept-Language": credentials.locale ?? "en",
          },
          body: JSON.stringify({
            email: credentials.email,
            password: credentials.password,
          }),
        };

        try {
          const res = await fetch(
            `${getEnv("NEXT_PUBLIC_BACKEND_ENDPOINT")}/auth/token/login/`,
            options,
          );
          if (!res.ok) {
            throw new Error(
              "Error logging in. Please check your credentials and try again.",
            );
          }
          const data = await res.json();
          const resUserData = await fetch(
            `${getEnv("NEXT_PUBLIC_BACKEND_ENDPOINT")}/auth/users/me/`,
            {
              headers: {
                Authorization: `Token ${data.auth_token}`,
              },
            },
          );
          const userData = await resUserData.json();

          const user = {
            username: userData.username,
            language: userData.language,
            user_type: userData.user_type,
            first_name: userData.first_name,
            last_name: userData.last_name,
            id: userData.id,
            email: userData.email,
            token: data.auth_token,
          };
          return user;
        } catch (error) {
          console.error((error as any).message);
          throw new Error((error as any).message ?? "Unknown error");
        }

        // if (user) {
        //   // Any object returned will be saved in `user` property of the JWT
        //   return user;
        // } else {
        //   // If you return null then an error will be displayed advising the user to check their details.
        //   return null;

        //   // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
        // }
      },
    }),
    GoogleProvider({
      clientId:
        "3600391843-71r52ii8m52ghq5dige55gmu5rneu8hr.apps.googleusercontent.com",
      clientSecret: "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",
    }),
  ],
  callbacks: {
    jwt: (params) => {
      const { token, user } = params;
      if (user) {
        const u = user as unknown as any;
        // const res = await fetch(
        //   getEnv("NEXT_PUBLIC_BACKEND_ENDPOINT") + "/auth/users/me/",
        //   {
        //     headers: {
        //       Authorization: `Token ${u.token}`,
        //     },
        //   },
        // );
        // if (!res.ok)
        //   return {
        //     ...token,
        //     error: "AccessTokenError",
        //   };
        return {
          ...token,
          username: u.username,
          language: u.language,
          user_type: u.user_type,
          first_name: u.first_name,
          last_name: u.last_name,
          id: u.id,
          email: u.email,
          token: u.token,
        };
      }
      return token;
    },
    session: (params) => {
      const { session, token } = params;
      return {
        ...session,
        user: {
          username: token.username,
          language: token.language,
          user_type: token.user_type,
          first_name: token.first_name,
          last_name: token.last_name,
          id: token.id,
          email: token.email,
          token: token.token,
        },
        error: token.error,
      };
    },
    signIn: async (params) => {
      // const { account, user } = params;
      // if(params.account?.provider === "google"){

      //   const userExists = await checkIfUserExistsInDatabase(user.email);
      //   if (userExists) {
      //     // Redirect to surveys if the user exists
      //     return true;
      //   } else {
      //     // a modal should pop up in this case
      //     return false;
      //   }
      // }
      // console.log("signIn....", params);
      // let count = 0;
      // for (let i = 0; i < 3; i++) {
      //   count++;
      //   console.log("awaiting", count);
      //   await new Promise((r) => setTimeout(r, 2000));
      // }
      // console.log("finished authenticating");
      return true;
    },
  },
});

export { handler as GET, handler as POST };

// async function checkIfUserExistsInDatabase(email: string | null | undefined) {
//   try {

//     const query = `SELECT COUNT(*) AS count FROM users WHERE email = ?`; // 'users' -> table name
//     const result = await databaseName.query(query, [email]);

//     // Extract count from the result
//     const count = result[0].count;

//     // Return true if count is greater than 0 (user exists), otherwise false
//     return count > 0;
//   } catch (error) {
//     console.error("Error checking user existence:", error);
//     throw new Error("Error checking user existence");
//   }
// }

// console.log("signIn....", params);
//       let count = 0;
//       for (let i = 0; i < 3; i++) {
//         count++;
//         console.log("awaiting", count);
//         await new Promise((r) => setTimeout(r, 2000));
//       }
//       console.log("finished authenticating");
