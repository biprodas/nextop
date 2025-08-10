import { Footer } from "./_components/footer";
import { Header } from "./_components/header";


const SiteLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="relative z-10 flex flex-col min-h-screen w-full bg-white dark:bg-[#0a0a0a]">
      <div
        className={`
          absolute inset-0 z-0 
          bg-[radial-gradient(circle_at_center,#8FFFB0,transparent)] 
          dark:bg-[radial-gradient(ellipse_at_20%_30%,rgba(56,189,248,0.4)_0%,transparent_60%),radial-gradient(ellipse_at_80%_70%,rgba(139,92,246,0.3)_0%,transparent_70%),radial-gradient(ellipse_at_60%_20%,rgba(236,72,153,0.25)_0%,transparent_50%),radial-gradient(ellipse_at_40%_80%,rgba(34,197,94,0.2)_0%,transparent_65%)]
        `}
        style={{
          // background: "linear-gradient(120deg, #d5c5ff 0%, #a7f3d0 50%, #f0f0f0 100%)",
          // backgroundImage: `
          //   radial-gradient(circle at center, #8FFFB0, transparent)
          // `,
        }}
      />
      <Header />
      <main className="flex-grow z-10">{children}</main>
      <Footer />
    </div>
  );
};

export default SiteLayout;

