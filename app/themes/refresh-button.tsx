"use client";

import { Button } from "@/components/ui/button";
import { RefreshCw } from "lucide-react";
import { useRouter } from "next/navigation";
import { useTransition } from "react";

interface RefreshButtonProps {
  revalidateAction: () => Promise<void>;
}

export function RefreshButton({ revalidateAction }: RefreshButtonProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const handleRefresh = () => {
    startTransition(async () => {
      await revalidateAction();
      router.refresh();
    });
  };

  return (
    <Button
      onClick={handleRefresh}
      disabled={isPending}
      variant="outline"
      size="sm"
      className="gap-2"
    >
      <RefreshCw className={`h-4 w-4 ${isPending ? "animate-spin" : ""}`} />
      {isPending ? "Refreshing..." : "Refresh from Contentful"}
    </Button>
  );
}
