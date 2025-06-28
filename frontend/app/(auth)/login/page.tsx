import { redirect } from "next/navigation";
import { authSession } from "~/auth";
import { LoginScreen } from "~/features/auth/ui/login-screen";

const LoginPage = async () => {
  const session = await authSession();

  if (session) {
    console.log("session", session);
    redirect("/dashboard");
  }

  return <LoginScreen />
};

export default LoginPage;
