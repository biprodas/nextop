import NextAuth from "next-auth";
import credentials from "next-auth/providers/credentials";
import google from "next-auth/providers/google";

// Define your configuration in a separate variable and pass it to NextAuth()
// This way we can also 'export const config' for use later
export const config = {
  providers: [
    google,
    credentials({
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials) => {
        let user = null;

        console.log("Credentials", credentials);

        // logic to salt and hash password
        // const pwHash = saltAndHashPassword(credentials.password);

        // logic to verify if the user exists
        user = { name: "Biprodas" }; // await getUserFromDb(credentials.email, pwHash);

        if (!user) {
          // No user found, so this is their first attempt to login
          // meaning this is also the place you could do registration
          throw new Error("User not found.");
        }

        // return user object with their profile data
        return user;
      },
    }),
  ],
  // pages: {
  //   signIn: "/login",
  // },
};

export const { handlers, signIn, signOut, auth } = NextAuth(config);
