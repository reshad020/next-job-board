"use client";
import React from "react";
import { useFormStatus } from "react-dom";
import { Button } from "./ui/button";
import { Loader2 } from "lucide-react";

function FormSubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} className="w-full">
      {pending ? (
        <div className="flex items-center gap-2">
          <Loader2 size={16} className="animate-spin" />
          <span>Filtering..</span>
        </div>
      ) : (
        "Filter Jobs"
      )}
    </Button>
  );
}

export default FormSubmitButton;
