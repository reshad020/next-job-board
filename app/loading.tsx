import {
  ComputerIcon,
  Laptop,
  Laptop2Icon,
  LoaderCircleIcon,
  WorkflowIcon,
} from "lucide-react";

export default function Loading() {
  return (
    <div className="flex h-[100vh] w-full items-center justify-center">
      <div className="flex h-20 w-20 animate-pulse items-center justify-center rounded-full border-foreground bg-slate-200 ring-2">
        <Laptop size={36} className="animate-pulse" />
      </div>
    </div>
  );
}
