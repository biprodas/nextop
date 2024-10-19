import React from "react";
import { Input } from "~/components/ui/input";
import { cn } from "~/lib/utils";

const ListeningAnswerSheet = () => {
  return (
    <div className="">
      <h4>Listening Answer Sheet</h4>
      <div className="sm:flex">
        <ul className="flex-1 space-y-2">
          {Array.from({ length: 20 }, (_, idx) => (
            <li key={idx} className="flex space-x-10">
              <code
                className={cn("px-2 py-1 rounded-sm bg-blue-50", {
                  "bg-slate-50": idx & 1,
                })}
              >
                {(idx + 1).toString().padStart(2, "0")}
              </code>
              <Input className="w-[200px] h-8 px-2 shadow-none" />
            </li>
          ))}
        </ul>
        <ul className="flex-1 space-y-2">
          {Array.from({ length: 20 }, (_, idx) => (
            <li key={idx} className="flex space-x-10">
              <code
                className={cn("px-2 py-1 rounded-sm bg-blue-50", {
                  "bg-slate-50": idx & 1,
                })}
              >
                {(idx + 21).toString().padStart(2, "0")}
              </code>
              <Input className="w-[200px] h-8 px-2 shadow-none" />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ListeningAnswerSheet;
