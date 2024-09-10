import React from "react";
import Footer from "~/components/footer";
import Header from "~/components/header";

const SiteLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="relative z-10 flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">{children}</main>
      <Footer />
    </div>
  );
};

export default SiteLayout;
