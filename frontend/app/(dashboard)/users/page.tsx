import { LogoutButton } from "~/components/auth/logout-button";
import { Button } from "~/components/ui/button";
import { currentUser } from "~/lib/auth";
import apiClient from "~/utils/axios";
import Users from "./_components/Users";

interface IUser {
  id: number;
  name: string;
}

interface UserResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: IUser[];
}

const getUsers = async () => {
  try {
    const res = await apiClient.get<UserResponse>("/api/v1/users");
    console.log("res data", res.data);
    return res.data;
  } catch (error: any) {
    console.log("res error", error);
    // throw new Error(error.message);
  }
};

const UsersPage = async () => {
  const data = await getUsers();

  console.log("user list", data);

  const user = await currentUser();
  if (!user) {
    return <div>Not authenticated</div>;
  }

  return (
    <div className="p-3">
      <h4>SettingsPage</h4>
      <div>Name: {user?.name}</div>
      <div className="flex space-x-5">
        <div className="border p-3 my-3">
          <h4>User List (SSR)</h4>
          <ul>
            {data?.data.map((user, idx) => (
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
