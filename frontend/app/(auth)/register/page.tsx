import { redirect } from "next/navigation";
import React from "react";
import { authSession } from "~/auth";
import { RegisterForm } from "~/components/auth/register-form";

const RegisterPage = async () => {
  const session = await authSession();

  if (session) {
    redirect("/dashboard");
  }

  return (
    <div className="h-screen flex justify-center items-center">
      <RegisterForm />
    </div>
  );
};

export default RegisterPage;
