const SiteLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="relative z-10 flex flex-col min-h-screen">
      <header className="border-b p-3">IELTS</header>
      <main className="flex-grow p-3">{children}</main>
    </div>
  );
};

export default SiteLayout;
