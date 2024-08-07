import React from "react";

interface Props {
  fontSize: number;
}

const LogoPrototype = ({ fontSize }: Props) => {
  return (
    <div
      className="w-full items-center gap-my-8 text-center !font-bold"
      style={{ fontSize }}
    >
      elia
    </div>
  );
};

export default LogoPrototype;
