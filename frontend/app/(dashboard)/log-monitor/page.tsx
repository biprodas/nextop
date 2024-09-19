import { ArrowUp, Search } from "lucide-react";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";

export default async function LogMonitor() {
  return (
    <div>
      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-3 mb-3">
        <div>
          <h1 className="text-xl lg:text-2xl">Logs of App</h1>
          <p className="text-[#7B7B7B]">Lorem iposome</p>
        </div>
        <div className="flex justify-between items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-[#7B7B7B]" />
            <Input id="search" placeholder="Search..." className="pl-10" />
          </div>
          <Button className="">
            Export
            <ArrowUp size={16} className="ml-2" />
          </Button>
        </div>
      </div>

      <div>Log monitors</div>
    </div>
  );
}
