import { redirect } from "next/navigation";
import { authSession } from "~/auth";
import { RegisterScreen } from "~/features/auth/ui/register-screen";

const RegisterPage = async () => {
  const session = await authSession();

  if (session) {
    redirect("/dashboard");
  }

  return <RegisterScreen />
};

export default RegisterPage;
