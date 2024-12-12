"use client";

import { Menu } from "lucide-react";
import { useState } from "react";
import MobileSidebar from "./mobile-sidebar";
import DesktopSidebar from "./desktop-sidebar";

export default function SidebarLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex flex-col h-screen">
      <div className="flex w-full bg-yellow-500 h-12 lg:hidden p-2 text-white">
        <Menu onClick={() => setOpen((open) => !open)}></Menu>

        <h1 className="text-2xl pl-4">관리자모드</h1>
      </div>

      <div className="flex h-screen">
        <MobileSidebar open={open} setOpen={setOpen}></MobileSidebar>
        <DesktopSidebar></DesktopSidebar>
        <main className="flex-1 bg-yellow-200 p-4">{children}</main>
      </div>
    </div>
  );
}
