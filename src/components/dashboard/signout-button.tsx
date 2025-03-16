"use client";

import { signOut } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface SignOutButtonProps {
  className?: string;
}

export function SignOutButton({ className }: SignOutButtonProps) {
  return (
    <Button 
      variant="outline" 
      size="sm" 
      onClick={() => signOut({ callbackUrl: "/auth/login" })}
      className={cn("text-gray-700 border-gray-300 hover:bg-gray-100 dark:text-gray-500 dark:border-gray-700 dark:hover:bg-gray-700", className)}
    >
      Sign Out
    </Button>
  );
}
