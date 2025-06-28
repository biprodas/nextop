import { LogoutButton } from "~/features/auth/logout-button";
import { Button } from "~/components/ui/button";
import { currentUser } from "~/lib/auth";
import Users from "./_components/Users";
import { getUsers } from "~/apis/user/service";
import { IUser } from "~/types";
import ErrorHandler from "~/components/error-handler";

const UsersPage = async () => {
  let users: IUser[] = [];
  let errorMsg = null;

  try {
    const data = await getUsers();
    if (data.data) users = data.data;
  } catch (error) {
    console.error("Error fetching users:", error);
    errorMsg = "Failed to fetch users.";
  }

  console.log("user list", users, errorMsg);

  const user = await currentUser();
  if (!user) {
    return <div>Not authenticated</div>;
  }

  if (errorMsg) return <ErrorHandler error={errorMsg} />;

  return (
    <div className="p-3">
      <h4>SettingsPage</h4>
      <div>Name: {user?.name}</div>
      <div className="flex space-x-5">
        <div className="border p-3 my-3">
          <h4>User List (SSR)</h4>
          <ul>
            {users.map((user, idx) => (
              <li key={user.id}>
                {idx + 1}. {user.name}
              </li>
            ))}
          </ul>
        </div>
        <Users />
      </div>
      <LogoutButton>
        <Button>Logout</Button>
      </LogoutButton>
    </div>
  );
};

export default UsersPage;
