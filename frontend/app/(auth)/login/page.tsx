import { redirect } from "next/navigation";
import { authSession } from "~/auth";
import { LoginForm } from "~/components/auth/login-form";

const LoginPage = async () => {
  const session = await authSession();

  if (session) {
    redirect("/dashboard");
  }

  return (
    <div className="h-screen flex justify-center items-center">
      <LoginForm />
    </div>
  );
};

export default LoginPage;
