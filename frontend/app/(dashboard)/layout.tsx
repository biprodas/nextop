import React from "react";
import { ScrollArea } from "~/components/ui/scroll-area";
import Sidebar from "./_components/sidebar";
import Header from "./_components/header";
import Footer from "./_components/footer";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex min-h-screen w-full">
      <Sidebar />
      <div className="flex-1 flex-col h-screen overflow-hidden">
        <Header />
        <ScrollArea className="flex flex-col w-full h-[calc(100vh-64px-64px)] md:h-[calc(100vh-80px-64px)] lg:h-[calc(100vh-100px-64px)]">
          <main className="lg:container lg:mx-auto p-3 flex-grow">
            {children}
          </main>
          <div className="sticky bottom-0"></div>
        </ScrollArea>
        <Footer />
      </div>
    </div>
  );
};

export default DashboardLayout;
