import type React from "react";
import { cn } from "@/lib/utils";

interface PageHeaderProps {
  title: string;
  description?: string;
  className?: string;
  children?: React.ReactNode;
}

export function PageHeader({
  title,
  description,
  className,
  children,
}: PageHeaderProps) {
  return (
    <div className={cn("space-y-4", className)}>
      <div className="space-y-2">
        <h1 className="font-bold text-3xl font-[family-name:var(--font-space-grotesk)] text-balance">
          {title}
        </h1>
        {description && (
          <p className="text-muted-foreground text-lg text-pretty">
            {description}
          </p>
        )}
      </div>
      {children}
    </div>
  );
}
