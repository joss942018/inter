import React from "react";
import { DefaultSession } from "next-auth";
type Props = { user: DefaultSession["user"] };

const TestUserCard = ({ user }: Props) => {
  return (
    <div className="card">
      <div className="card-body">
        Current Logged In User
        <p className="card-title">{user?.name}</p>
        <p className="card-text">{user?.email}</p>
      </div>
    </div>
  );
};

export default TestUserCard;
