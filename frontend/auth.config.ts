import type { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import Github from "next-auth/providers/github";
import Google from "next-auth/providers/google";

import { siteConfig } from "./config/site";

// Define your configuration in a separate variable and pass it to NextAuth()
// This way we can also 'export const config' for use later
const authConfig = {
  // trustHost: true,
  secret: process.env.AUTH_SECRET,
  pages: {
    signIn: "/login",
  },
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    Github({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    }),
    Credentials({
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      // id: "credentials",
      name: "Email Password Login",
      credentials: {
        email: { name: "email", type: "email", label: "Email", required: true },
        password: {
          name: "password",
          type: "password",
          label: "Password",
          required: true,
        },
      },
      async authorize(credentials) {
        const payload = {
          email: credentials.email,
          password: credentials.password,
        };

        const res = await fetch(`${siteConfig.apiBaseUrl}/api/v1/auth/login`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });

        const { data, error } = await res.json();
        // console.log("API Response:", data);

        if (!res.ok) {
          // console.error("API request error:", error);
          throw new Error(error.message);
        }

        if (res.ok && data.user) {
          const user = {
            ...data.user,
            tokens: {
              accessToken: data.tokenPayload.AccessToken,
              refreshToken: data.tokenPayload.RefreshToken,
              userId: data.user.id,
            },
          };

          return user;
        }

        return null;
      },
    }),
  ],
  callbacks: {
    async signIn({ user, account, credentials }) {
      // console.log("calbacks.signIn", user, account, credentials);

      if (account?.provider === "google") {
        console.log("Login with google");
        // const res = await socialLogin({
        //   provider: "google",
        //   accessToken: account.access_token as string,
        // });
        // if (!res.ok) return false;
      }

      return true;
    },
    async jwt({ token, user, account, trigger, session }) {
      // console.log("calbacks.jwt", token, user, account, trigger, session);

      if (account?.provider === "google") {
        // const res = await socialLogin({ provider: "google", access_token: account.access_token as string });
        // const userRes = await queryClient.fetchQuery(getUserQuery(res.data.access_token))
        // return userRes ? { ...token, tokens: res.data, user: { ...userRes.data, tokens: res.data } } : token;
      }

      // if (isTokenExpired(token.tokens.access_token)) {
      //   const refreshedTokens = await refreshToken(token.tokens.refresh_token);
      //   return { ...token, tokens: refreshedTokens.data, user: token.user };
      // }

      if (user) {
        token.user = user;
        token.tokens = user.tokens;
      }

      return token;
    },
    async session({ session, token }: any) {
      // console.log("calbacks.session", session, token);

      if (token) {
        session.user = token.user;
        // session.user = {
        //   ...token.user,
        //   tokens: token.tokens,
        //   id: token.user.id.toString(),
        // };
        session.isValid = !!token.user.email;
      }

      return session;
    },
    // authorized({ request, auth }) {
    //   const { pathname } = request.nextUrl;

    //   // get the route name from the url such as "/about"
    //   const searchTerm = request.nextUrl.pathname
    //     .split("/")
    //     .slice(0, 2)
    //     .join("/");

    //   const privateRoutes = ["/dashboard", "/protected"];
    //   // if the private routes array includes the search term, we ask authorization here and forward any unauthorized users to the login page
    //   if (privateRoutes.includes(searchTerm)) {
    //     console.log(
    //       `${!!auth ? "Can" : "Cannot"} access private route ${searchTerm}`
    //     );
    //     return !!auth;
    //     // if the pathname starts with one of the routes below and the user is already logged in, forward the user to the home page
    //   } else if (
    //     pathname.startsWith("/login") ||
    //     pathname.startsWith("/forgot-password") ||
    //     pathname.startsWith("/signup")
    //   ) {
    //     const isLoggedIn = !!auth;

    //     if (isLoggedIn) {
    //       return Response.redirect(new URL("/", request.nextUrl));
    //     }

    //     return true;
    //   }

    //   return true;
    // },
  },
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60,
  },
  theme: {
    colorScheme: "auto", // "auto" | "dark" | "light"
    brandColor: "", // Hex color code #33FF5D
    logo: "/logo.png", // Absolute URL to image
  },
  // Enable debug messages in the console if you are having problems
  debug: process.env.NODE_ENV === "development",
} satisfies NextAuthConfig;

export default authConfig;
