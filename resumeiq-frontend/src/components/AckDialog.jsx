import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

export default function AckDialog({ open, setOpen, result }) {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Resume Uploaded!</DialogTitle>
        </DialogHeader>
        <div className="py-4 text-green-700 text-lg font-medium text-center">
          Your resume was received and analyzed. 🎉
        </div>
        <DialogFooter>
          <Button onClick={() => setOpen(false)}>
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
