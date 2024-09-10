import React from "react";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="relative z-10 flex flex-col min-h-screen">
      <div>Dashboard Layout</div>
      <main className="flex-grow">{children}</main>
    </div>
  );
};

export default DashboardLayout;
