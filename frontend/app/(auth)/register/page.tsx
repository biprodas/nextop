import { redirect } from "next/navigation";
import { authSession } from "~/auth";
import { RegisterForm } from "~/features/auth/register-form";

const RegisterPage = async () => {
  const session = await authSession();

  if (session) {
    redirect("/dashboard");
  }

  return <RegisterForm />
};

export default RegisterPage;
