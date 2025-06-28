const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="h-screen flex items-center justify-center bg-[#111827]">
      {children}
    </main>
  );
};

export default AuthLayout;