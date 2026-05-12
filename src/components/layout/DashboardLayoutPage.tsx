import React, { useState } from 'react';
import { Sidebar } from './Sidebar';
import { BottomNav } from './BottomNav';
import { cn } from '@/components/ui/Card';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export function DashboardLayoutPage({ children }: DashboardLayoutProps) {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="flex w-full min-h-screen bg-[#08090a] overflow-x-hidden">
      <div className="hidden md:block">
        <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />
      </div>
      <div className={cn(
        "flex-1 transition-all duration-300 w-full pb-20 md:pb-0",
        isOpen ? "md:pl-64" : "md:pl-20"
      )}>
        {children}
      </div>
      <BottomNav />
    </div>
  );
}
