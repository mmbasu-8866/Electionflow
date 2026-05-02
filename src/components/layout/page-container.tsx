"use client";

import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface PageContainerProps {
  children: ReactNode;
  title: string;
  icon?: ReactNode;
  headerContent?: ReactNode;
  maxWidth?: string;
  className?: string;
}

/**
 * PageContainer - A standardized wrapper for all top-level pages in the application.
 * Ensures consistent layout, header structure, and scroll behavior.
 * 
 * @param {PageContainerProps} props - The component props.
 * @returns {JSX.Element} The rendered page container.
 */
export function PageContainer({
  children,
  title,
  icon,
  headerContent,
  maxWidth = "max-w-[1600px]",
  className
}: PageContainerProps) {
  return (
    <div className="flex flex-col h-screen overflow-hidden bg-background">
      <header className="flex h-16 shrink-0 items-center gap-2 border-b px-6 bg-card shadow-sm" role="banner">
        {icon && <div className="text-primary">{icon}</div>}
        <h1 className="text-xl font-headline font-bold text-accent">{title}</h1>
        {headerContent && <div className="ml-auto">{headerContent}</div>}
      </header>
      <main className="flex-1 overflow-y-auto custom-scrollbar p-6" role="main">
        <div className={cn(maxWidth, "mx-auto space-y-6 animate-fade-in", className)}>
          {children}
        </div>
      </main>
    </div>
  );
}
