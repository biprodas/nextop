"use client";

import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import { FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { Button } from "~/components/ui/button";
import { DEFAULT_LOGIN_REDIRECT } from "~/routes";

export const Social = () => {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl");

  const onClick = (provider: "google" | "github") => {
    signIn(provider, {
      callbackUrl: callbackUrl || DEFAULT_LOGIN_REDIRECT,
    });
  };

  return (
    <div className="flex items-center w-full gap-3">
      <Button
        className="w-full"
        variant="outline"
        onClick={() => onClick("google")}
      >
        <FcGoogle className="size-5 me-3" /> Google
      </Button>
      <Button
        className="w-full"
        variant="outline"
        onClick={() => onClick("github")}
      >
        <FaGithub className="size-5 me-3" /> Github
      </Button>
    </div>
  );
};
