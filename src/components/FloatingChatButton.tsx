import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { MessageCircle } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import ChatAssistant from "./ChatAssistant";

export default function FloatingChatButton() {
  const [open, setOpen] = useState(false);
  const isMobile = useIsMobile();

  const trigger = (
    <Button
      size="lg"
      className="fixed bottom-6 right-6 h-14 w-14 rounded-full shadow-strong bg-gradient-hero hover:opacity-90 z-50"
    >
      <MessageCircle className="h-6 w-6 text-white" />
    </Button>
  );

  if (isMobile) {
    return (
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          {trigger}
        </SheetTrigger>
        <SheetContent side="bottom" className="h-[85vh] p-0">
          <ChatAssistant />
        </SheetContent>
      </Sheet>
    );
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger}
      </DialogTrigger>
      <DialogContent className="max-w-2xl h-[700px] p-0">
        <ChatAssistant />
      </DialogContent>
    </Dialog>
  );
}
