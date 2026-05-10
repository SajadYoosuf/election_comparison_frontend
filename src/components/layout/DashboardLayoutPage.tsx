import React, { useState } from 'react';
import { Sidebar } from './Sidebar';
import { cn } from '@/components/ui/Card';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export function DashboardLayoutPage({ children }: DashboardLayoutProps) {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="flex w-full min-h-screen bg-[#08090a]">
      <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />
      <div className={cn("flex-1 transition-all duration-300", isOpen ? "pl-64" : "pl-20")}>
        {children}
      </div>
    </div>
  );
}
