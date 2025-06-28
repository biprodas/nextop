"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { FormError } from "~/components/form-error";
import { FormSuccess } from "~/components/form-success";
import { Button } from "~/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage
} from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { CardWrapper } from "~/features/auth/card-wrapper";
import { RegisterSchema } from "~/schemas/auth";
import { useSignupMutation } from "../apis/queries";

export const RegisterScreen = () => {
  const [success, setSuccess] = useState<string | undefined>("");
  const [error, setError] = useState<string | undefined>("");
  const [isPending, setIsPending] = useState(false);
  const router = useRouter();

  const { mutate: signup, isPending: isSigningUp } = useSignupMutation();

  const form = useForm<z.infer<typeof RegisterSchema>>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof RegisterSchema>) => {
    setError("");
    signup(values, {
      onSuccess: async () => {
        setIsPending(true);
        form.reset();
        setSuccess("Account created successfully. Logging in...");
        const res = await signIn("credentials", {
          email: values.email,
          password: values.password,
          redirect: false,
        });

        setIsPending(false);

        if (res?.error) {
          setSuccess("");
          setError("Error signing in. Redirecting to login page...");
          router.push("/login");
        } else {
          router.push("/dashboard");
        }
      },
      onError: (error) => {
        setError(error.message);
      }
    });
  };

  return (
    <CardWrapper
      headerLabel="Register"
      headerDescription="Create an account"
      backButtonLabel="Already have an account?"
      backButtonHref="/login"
      showSocial
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <Label htmlFor={field.name}>Name</Label>
                  <FormControl>
                    <Input
                      {...field}
                      id={field.name}
                      disabled={isSigningUp || isPending}
                      placeholder="John Doe"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
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
                      disabled={isSigningUp || isPending}
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
                      disabled={isSigningUp || isPending}
                      placeholder="******"
                      type="password"
                      autoComplete="new-password"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormError message={error} />
          <FormSuccess message={success} />
          <Button disabled={isSigningUp || isPending} type="submit" className="w-full">
            Create an account
          </Button>
        </form>
      </Form>
    </CardWrapper>
  );
};
