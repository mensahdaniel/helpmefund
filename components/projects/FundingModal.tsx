"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Dialog } from "@headlessui/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
      toast.error("Failed to process funding");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      className="fixed inset-0 z-50 overflow-y-auto"
    >
      <div className="flex min-h-screen items-center justify-center p-4">
        <Dialog.Overlay className="fixed inset-0 bg-black/30" />

        <div className="relative w-full max-w-md rounded-lg bg-white p-6 shadow-xl">
          <Dialog.Title className="text-lg font-bold text-text-dark">
            Fund this Project
          </Dialog.Title>

          <form onSubmit={handleSubmit} className="mt-4 space-y-4">
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
        </div>
      </div>
    </Dialog>
  );
}
