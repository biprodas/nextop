import React from "react";
import { LogoutButton } from "~/components/auth/logout-button";
import { Button } from "~/components/ui/button";
import { currentUser } from "~/lib/auth";

const SettingsPage = async () => {
  const user = await currentUser();

  if (!user) {
    return <div>Not authenticated</div>;
  }

  return (
    <div className="p-3">
      <h4>SettingsPage</h4>
      <div>Name: {user?.name}</div>
      <LogoutButton>
        <Button>Logout</Button>
      </LogoutButton>
    </div>
  );
};

export default SettingsPage;
