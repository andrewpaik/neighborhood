"use client";

import { useState } from "react";
import { CalendarPlus } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface ProposeFormProps {
  neighborhoodId: string;
  userId: string;
}

export const ProposeForm = ({ neighborhoodId, userId }: ProposeFormProps) => {
  const [open, setOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [locationName, setLocationName] = useState("");
  const [locationAddress, setLocationAddress] = useState("");
  const [proposedTime, setProposedTime] = useState("");

  const resetForm = () => {
    setTitle("");
    setDescription("");
    setLocationName("");
    setLocationAddress("");
    setProposedTime("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !proposedTime) return;

    setSubmitting(true);
    try {
      const response = await fetch("/api/hangouts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          neighborhoodId,
          proposedBy: userId,
          title: title.trim(),
          description: description.trim(),
          locationName: locationName.trim(),
          locationAddress: locationAddress.trim(),
          proposedTime,
        }),
      });

      if (response.ok) {
        toast.success("Hangout proposed! Let's see who's in.");
        resetForm();
        setOpen(false);
      } else {
        const data = await response.json();
        toast.error(data.message || "Failed to propose hangout");
      }
    } catch {
      toast.error("Something went wrong");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="gap-2 rounded-full bg-teal-500 px-5 font-semibold text-white hover:bg-teal-600">
          <CalendarPlus className="h-4 w-4" />
          Propose a hangout
        </Button>
      </DialogTrigger>
      <DialogContent className="rounded-2xl sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-warmgray-900">
            Propose a hangout
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="title" className="text-sm text-warmgray-700">
              What are we doing?
            </Label>
            <Input
              id="title"
              placeholder="Coffee at Blue Bottle Saturday"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="mt-1 rounded-xl border-warmgray-200"
              required
            />
          </div>
          <div>
            <Label htmlFor="description" className="text-sm text-warmgray-700">
              Details (optional)
            </Label>
            <Textarea
              id="description"
              placeholder="Any extra details people should know..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="mt-1 min-h-[60px] resize-none rounded-xl border-warmgray-200"
            />
          </div>
          <div>
            <Label htmlFor="location" className="text-sm text-warmgray-700">
              Where?
            </Label>
            <Input
              id="location"
              placeholder="Blue Bottle Coffee, Arts District"
              value={locationName}
              onChange={(e) => setLocationName(e.target.value)}
              className="mt-1 rounded-xl border-warmgray-200"
            />
          </div>
          <div>
            <Label htmlFor="address" className="text-sm text-warmgray-700">
              Address (optional)
            </Label>
            <Input
              id="address"
              placeholder="582 Mateo St, Los Angeles"
              value={locationAddress}
              onChange={(e) => setLocationAddress(e.target.value)}
              className="mt-1 rounded-xl border-warmgray-200"
            />
          </div>
          <div>
            <Label htmlFor="time" className="text-sm text-warmgray-700">
              When?
            </Label>
            <Input
              id="time"
              type="datetime-local"
              value={proposedTime}
              onChange={(e) => setProposedTime(e.target.value)}
              className="mt-1 rounded-xl border-warmgray-200"
              required
            />
          </div>
          <Button
            type="submit"
            disabled={submitting || !title.trim() || !proposedTime}
            className="w-full rounded-full bg-teal-500 font-semibold text-white hover:bg-teal-600"
          >
            {submitting ? "Proposing..." : "Propose hangout"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};
