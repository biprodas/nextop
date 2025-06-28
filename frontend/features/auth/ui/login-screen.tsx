"use client";

import * as z from "zod";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";

import { LoginSchema } from "~/schemas/auth";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import { CardWrapper } from "~/features/auth/card-wrapper";
import { Input } from "~/components/ui/input";
import { Button } from "~/components/ui/button";
import { FormError } from "~/components/form-error";
import { FormSuccess } from "~/components/form-success";
import { Label } from "~/components/ui/label";
import { Checkbox } from "~/components/ui/checkbox";
import { signIn } from "next-auth/react";

export const LoginScreen = () => {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl");
  const router = useRouter();
  const errorUrl =
    searchParams.get("error") === "OAuthAccountNotLinked"
      ? "Email already in use with a different provider"
      : "";

  const [showTwoFactor, setShowTwoFactor] = useState(false);
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, setIsPending] = useState(false);

  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof LoginSchema>) => {
    setError("");
    setSuccess("");
    console.log("Credentials", values);

    setIsPending(true);

    // const result = await login(values, callbackUrl);
    const res = await signIn("credentials", {
      email: values.email,
      password: values.password,
      redirect: false,
      // callbackUrl: absoluteUrl("/dashboard"),
    });

    if (res?.error) {
      setError("Invalid email or password");
    } else {
      router.push(callbackUrl || "/dashboard");
    }

    setIsPending(false);
  };

  return (
    <CardWrapper
      headerLabel="Login"
      headerDescription="Login to your account"
      backButtonLabel="Don't have an account?"
      backButtonHref="/register"
      showSocial
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
          <div className="space-y-4">
            {showTwoFactor && (
              <FormField
                control={form.control}
                name="code"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Two factor code</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        disabled={isPending}
                        placeholder="123456"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}
            {!showTwoFactor && (
              <>
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <Label htmlFor={field.name}>Email</Label>
                      <FormControl>
                        <Input
                          {...field}
                          id={field.name}
                          disabled={isPending}
                          placeholder="john.doe@example.com"
                          type="email"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <Label htmlFor={field.name}>Password</Label>
                      <FormControl>
                        <Input
                          {...field}
                          id={field.name}
                          disabled={isPending}
                          placeholder="********"
                          type="password"
                        />
                      </FormControl>
                      <FormMessage />
                      <div className="flex justify-between">
                        <div className="flex items-center gap-2">
                          <Checkbox
                            id="remember"
                            // checked={form.getValues("remember")}
                            // onCheckedChange={form.setValue("remember")}
                          />
                          <Label htmlFor="remember" className="font-normal">Remember me</Label>
                        </div>

                        <Button size="sm" variant="link" asChild>
                          <Link href="#">Forgot password?</Link>
                        </Button>
                      </div>
                    </FormItem>
                  )}
                />
              </>
            )}
          </div>
          <FormError message={error || errorUrl} />
          <FormSuccess message={success} />
          <Button type="submit" disabled={isPending} className="w-full">
            {showTwoFactor ? "Confirm" : "Login"}
          </Button>
        </form>
      </Form>
    </CardWrapper>
  );
};
