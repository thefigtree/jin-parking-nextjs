import Sidebar from "@/components/sidebar";
import { Sheet, SheetContent } from "@/components/ui/sheet";

export default function MobileSidebar({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetContent side="left" className="w-[256px]">
        <Sidebar></Sidebar>
      </SheetContent>
    </Sheet>
  );
}
