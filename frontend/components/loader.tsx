import { LoaderCircleIcon } from "lucide-react";

interface Props {
  mode?: "text" | "icon";
}

const Loader = ({ mode = "text" }: Props) => {
  return mode === "text" ? (
    <div>Loading...</div>
  ) : (
    <LoaderCircleIcon className="size-6 text-slate-700 animate-spin" />
  );
};

export default Loader;
