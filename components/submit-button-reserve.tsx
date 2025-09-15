"use client";

import { useFormStatus } from "react-dom";
import { Button } from "@/components/ui/button";
import { LoadingSpinner } from "@/components/ui/loading-spinner";

export function SubmitButtonBooking() {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" className="w-full cursor-pointer" disabled={pending}>
      {pending ? (
        <>
          <LoadingSpinner className="mr-2 h-4 w-4" />
          Processing...
        </>
      ) : (
        "Reserve Table"
      )}
    </Button>
  );
}
