import React from "react";
import { LogoutButton } from "~/features/auth/logout-button";
import { Button } from "~/components/ui/button";
import { currentUser } from "~/lib/auth";

const DashboardPage = async () => {
  const user = await currentUser();

  if (!user) {
    return <div>Not authenticated</div>;
  }

  return (
    <div className="">
      <h4>SettingsPage</h4>
      <div>Name: {user?.name}</div>
      <div className="border">
        <h4>List</h4>
      </div>
      <LogoutButton>
        <Button>Logout</Button>
      </LogoutButton>
    </div>
  );
};

export default DashboardPage;
