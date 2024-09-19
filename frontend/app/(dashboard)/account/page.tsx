import { ScrollArea } from "~/components/ui/scroll-area";

const AccountSetting = () => {
  return (
    <div className="md:col-span-8 lg:col-span-9">
      <div className="mb-5">
        <h1 className="text-xl lg:text-[22px] font-semibold">
          Account Settings
        </h1>
        <p className="text-sm font-light text-[#7B7B7B]">
          Reset your name and email, Make Api key etc
        </p>
      </div>

      <ScrollArea className="sm:h-[calc(100vh-270px)] 2xl:h-[calc(100vh-350px)] sm:pe-3">
        <div className="border">Content</div>
      </ScrollArea>
    </div>
  );
};

export default AccountSetting;
