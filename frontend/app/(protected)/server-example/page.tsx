import { LogoutButton } from "~/components/auth/logout-button";
import { Button } from "~/components/ui/button";
import { UserInfo } from "~/components/user-info";
import { currentUser } from "~/lib/auth";

const ServerPage = async () => {
  const user = await currentUser();

  if (!user) {
    return <div>Not authenticated</div>;
  }

  return (
    <div className="p-3">
      <h4>Server Component</h4>
      <div>Name: {user?.name}</div>
      <LogoutButton>
        <Button>Logout</Button>
      </LogoutButton>
    </div>
  );
};

export default ServerPage;
