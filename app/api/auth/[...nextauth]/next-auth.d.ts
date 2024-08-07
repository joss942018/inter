import NextAuth from "next-auth";
// import GoogleProvider from "next-auth/providers/google";
declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: {
      /** The user's postal address. */
      username: string;
      language: "spa" | "eng";
      user_type: "WOR";
      first_name: string;
      last_name: string;
      id: number;
      email: string;
      token: string;
    };
  }
}

// export default NextAuth({
//   providers: [
//     GoogleProvider({
//       clientId:
//         "3600391843-71r52ii8m52ghq5dige55gmu5rneu8hr.apps.googleusercontent.com",
//       clientSecret: "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",
//     }),
//   ],
// });
