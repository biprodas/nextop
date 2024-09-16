import type { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import Github from "next-auth/providers/github";
import Google from "next-auth/providers/google";

import { LoginSchema } from "~/schemas";
import { siteConfig } from "./config/site";
import { cookies } from "next/headers";

// Define your configuration in a separate variable and pass it to NextAuth()
// This way we can also 'export const config' for use later
const authConfig = {
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
      name: "NextUp",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "john.doe@gmail.com",
        },
        password: {
          label: "Password",
          type: "password",
          placeholder: "*******",
        },
      },
      async authorize(credentials) {
        // const validatedFields = LoginSchema.safeParse(credentials);
        // console.log("authorize.Credentials", credentials, validatedFields);

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
        // If no error and we have user data, return it
        if (res.ok && data) {
          const user = {
            ...data.user,
            // id: data.user.id,
            // name: data.user.name,
            accessToken: data.token,
            refreshToken: data.tokenPayload.RefreshToken,
          };

          const prefix = process.env.NODE_ENV === "development" ? "__Dev-" : "";

          // we set http only cookie here to store refresh token information as we will not append it to our session to avoid maximum size warning for the session cookie (4096 bytes)
          cookies().set({
            name: `${prefix}xxx.refresh-token`,
            value: data.tokenPayload.refreshToken,
            httpOnly: true,
            sameSite: "strict",
            secure: true,
          } as any);

          return user;
        }

        // Return null if user data could not be retrieved
        return null;

        // if (validatedFields.success) {
        //   const { email, password } = validatedFields.data;

        //   const user = await getUserByEmail(email);
        //   if (!user || !user.password) return null;

        //   const passwordsMatch = await bcrypt.compare(password, user.password);

        //   if (passwordsMatch) return user;
        // }

        // let user = null;

        // logic to verify if the user exists
        // user = { name: "Biprodas", id: "test_id_123" }; // await getUserFromDb(credentials.email, pwHash);

        // if (!user) {
        //   // No user found, so this is their first attempt to login
        //   // meaning this is also the place you could do registration
        //   throw new Error("User not found.");
        // }

        // return user object with their profile data
        // return user;
      },
    }),
  ],
  secret: process.env.JWT_SECRET,
  pages: {
    signIn: "/login",
  },
  callbacks: {
    // async signIn({ user, account }) {
    //   console.log("calbacks.signIn", user, account);

    //   // Allow OAuth without email verification
    //   if (account?.provider !== "credentials") return true;

    //   // const existingUser = await getUserById(user.id);

    //   // // Prevent sign in without email verification
    //   // if (!existingUser?.emailVerified) return false;

    //   // //2FA check
    //   // if (existingUser.isTwoFactorEnabled) {
    //   //   const twoFactorConfirmation = await getTwoFactorConfirmationByUserId(
    //   //     existingUser.id
    //   //   );

    //   //   if (!twoFactorConfirmation) return false;

    //   //   //Delete the two factor confirmation for next sign in
    //   //   await db.twoFactorConfirmation.delete({
    //   //     where: { id: twoFactorConfirmation.id },
    //   //   });
    //   // }

    //   return true;
    // },
    async jwt({ token, user, account }) {
      console.log("calbacks.jwt", token, user, account);

      // if (!token.sub) return token;

      if (account && user) {
        token.user = user;
        // token.id = user.id;
        token.accessToken = user.accessToken;
        token.refreshToken = user.refreshToken;
        // token.role = "Unknown"; // the user role

        // const decodedAccessToken = JSON.parse(
        //   Buffer.from(user.accessToken.split(".")[1], "base64").toString()
        // );

        // if (decodedAccessToken) {
        //   token.userId = decodedAccessToken["sub"] as string;
        //   token.accessTokenExpires = decodedAccessToken["exp"] * 1000;
        // }

        // // get some info about user from the id token
        // const decodedIdToken = JSON.parse(
        //   Buffer.from(user.idToken.split(".")[1], "base64").toString()
        // );

        // if (decodedIdToken) {
        //   token.email = decodedIdToken["email"];
        //   token.cognitoGroups = decodedIdToken["cognito:groups"];
        //   token.role = decodedIdToken["cognito:groups"].length
        //     ? decodedIdToken["cognito:groups"][0]
        //     : "Unknown";
        // }
      }

      // const existingUser = await getUserById(token.sub);

      // if (!existingUser) return token;

      // const existingAccount = await getAccountByUserId(existingUser.id);

      // token.isOAuth = !!existingAccount;
      // token.name = existingUser.name;
      // token.email = existingUser.email;
      // token.role = existingUser.role;
      // token.isTwoFactorEnabled = existingUser.isTwoFactorEnabled;

      return token;
    },
    async session({ session, token }: any) {
      console.log("calbacks.session", session, token);

      session.user = token.user;

      session.user.accessToken = token.accessToken;
      session.user.refreshToken = token.refreshToken;
      session.user.accessTokenExpires = token.accessTokenExpires;

      const newSession = {
        ...session,
        user: {
          ...session.user,
          id: token.id as string,
          email: token.email as string,
          accessToken: token.accessToken as string,
          accessTokenExpires: token.accessTokenExpires as number,
          refreshToken: token.refreshToken as string,
          role: token.role as string,
          // image: user.image,
        },
        error: token.error,
      };

      // if (token.sub && session.user) {
      //   session.user.id = token.sub;
      // }

      // if (token.role && session.user) {
      //   session.user.role = token.role as UserRole;
      // }

      // if (session.user) {
      //   session.user.name = token.name;
      //   session.user.email = token.email;
      //   session.user.isOAuth = token.isOAuth as boolean;
      //   session.user.isTwoFactorEnabled = token.isTwoFactorEnabled as boolean;
      // }

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
  session: { strategy: "jwt" },
  // theme: {
  //   colorScheme: "auto", // "auto" | "dark" | "light"
  //   brandColor: "", // Hex color code #33FF5D
  //   logo: "/logo.png", // Absolute URL to image
  // },
  // // Enable debug messages in the console if you are having problems
  debug: process.env.NODE_ENV === "development",
} satisfies NextAuthConfig;

export default authConfig;
