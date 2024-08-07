import Image from "next/image";
import React from "react";
import MyLink from "../components/MyLink";

const NotFound = () => {
  return (
    <div className="flex items-center justify-center w-screen h-screen">
      <div className="flex flex-col gap-m">
        <div className="flex flex-col">
          <div className="flex items-start">
            <Image
              src="/img/letraElia.svg"
              width={100}
              height={100}
              alt="Elia logo"
            />
            <p className="text-8xl">404</p>
          </div>
          <h2 className="text-heading1">Page not found</h2>
        </div>
        <p>The page you are looking for does not exist</p>
        <MyLink href={"/"}>Go to home</MyLink>
      </div>
    </div>
  );
};

export default NotFound;
