"use client";

import { ViewProvider } from "@/app/context/ViewContext";
import Navbar from "../components/Navbar";
import { signOut, useSession } from "next-auth/react";
import { useCallback, useEffect } from "react";
import getEnv from "@/helpers/Env";

interface Props {
  children: React.ReactNode;
}

const Layout = ({ children }: Props) => {
  const session = useSession();

  // const logout = useCallback(() => {
  //   const accessToken = session?.data?.user?.token || undefined;

  //   fetch(`${getEnv("NEXT_PUBLIC_BACKEND_ENDPOINT")}/auth/token/logout/`, {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //       Authorization: `Token ${accessToken}`,
  //     },
  //   })
  //     .then((res) => res.json())
  //     .then((data) => {
  //       console.log(data);
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     })
  //     .finally(async () => {
  //       await signOut();
  //     });
  // }, [session]);

  // useEffect(() => {
  //   console.log(session);
  //   // @ts-ignore
  //   if (session?.error === "AccessTokenError") {
  //     logout();
  //   }
  // }, [session, logout]);

  if (session.status === "loading") return <p>loading...</p>;
  if (session.status === "unauthenticated") return <p>unauthenticated</p>;

  return (
    <main className="h-full min-h-screen w-full">
      <Navbar onSurveys />
      <ViewProvider>
        <div className="h-full min-h-screen">{children}</div>
      </ViewProvider>
    </main>
  );
};

export default Layout;
