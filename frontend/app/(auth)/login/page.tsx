import React from "react";
import SignIn from "~/components/auth/signin-button";

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
