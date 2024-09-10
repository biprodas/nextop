import React from "react";
import SignIn from "~/components/sign-in";

const LoginPage = () => {
  return (
    <div className="p-5">
      <h2>Login Page</h2>
      <div>
        <SignIn />
      </div>
    </div>
  );
};

export default LoginPage;
