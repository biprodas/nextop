import { authSession } from "~/auth";

export const currentUser = async () => {
  const session = await authSession();

  return session?.user;
};

// export const currentRole = async () => {
//   const session = await auth();

//   return session?.user?.role;
// };
