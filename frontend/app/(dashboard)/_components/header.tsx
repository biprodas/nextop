import { IoNotificationsOutline } from "react-icons/io5";
import { RxEnvelopeClosed } from "react-icons/rx";
import { Button } from "~/components/ui/button";
import UserDropdown from "./user-dropdown";
import MobileSidebar from "./mobile-sidebar";
import { ModeSelect } from "~/components/mode-select";

export default function Header() {
  return (
    <header className="flex items-center gap-4 h-16 lg:h-20 px-3 lg:px-10">
      <MobileSidebar />
      <div className="w-full flex-1">
        {/* <Logo width={24} height={24} className="lg:hidden" /> */}
        <span className="lg:hidden">NextUp</span>
      </div>
      <ModeSelect />
      <Button
        variant="outline"
        size="icon"
        className="hidden md:flex border-0 shadow"
      >
        <IoNotificationsOutline className="h-5 w-5" />
      </Button>
      <div className="relative">
        <Button
          variant="outline"
          size="icon"
          className="hidden md:flex border-0 shadow me-3 relative"
        >
          <RxEnvelopeClosed className="h-5 w-5" />
        </Button>
        <span className="absolute top-0 right-1.5 flex justify-center items-center w-[17px] h-[17px] rounded-full bg-[#FF8C5B] text-white text-[10px] font-bold">
          8
        </span>
      </div>
      <UserDropdown />
    </header>
  );
}
