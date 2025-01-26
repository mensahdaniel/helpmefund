"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription, // Add this
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Project } from "@/types";
import { toast } from "sonner";

interface FundingModalProps {
  project: Project;
  isOpen: boolean;
  onClose: () => void;
  onFund: (projectId: string, amount: number) => Promise<void>;
}

export function FundingModal({
  project,
  isOpen,
  onClose,
  onFund,
}: FundingModalProps) {
  const router = useRouter();
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!amount || isNaN(Number(amount))) return;

    try {
      setLoading(true);
      await onFund(project.id, Number(amount));
      toast.success("Thank you for your contribution!");
      onClose();
      router.refresh();
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message || "Failed to process funding");
      } else {
        toast.error("Failed to process funding");
      }
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Fund this Project</DialogTitle>
          <DialogDescription>
            Enter the amount you would like to contribute to this project.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-text-dark">
              Amount ($)
            </label>
            <Input
              type="number"
              min="1"
              step="1"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Enter amount"
              className="input-field"
            />
          </div>

          <div className="flex gap-4">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="flex-1"
              disabled={loading || !amount}
            >
              {loading ? "Processing..." : "Confirm"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
