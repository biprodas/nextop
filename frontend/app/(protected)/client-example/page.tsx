"use client";

import { LogoutButton } from "~/components/auth/logout-button";
import { Button } from "~/components/ui/button";
import { useCurrentUser } from "~/hooks/use-current-user";

const ClientPage = () => {
  const user = useCurrentUser();

  if (!user) {
    return <div>Not authenticated</div>;
  }

  return (
    <div className="p-3">
      <h4>Client Component</h4>
      <div>Name: {user?.name}</div>
      <LogoutButton>
        <Button>Logout</Button>
      </LogoutButton>
    </div>
  );
};

export default ClientPage;
