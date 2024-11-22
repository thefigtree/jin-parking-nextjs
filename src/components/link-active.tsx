"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

type Props = {
  children: React.ReactNode;
  href: string;
};

export default function LinkActive({ children, href }: Props) {
  const pathname = usePathname();
  const isActive = pathname === href ? "bg-yellow-600" : "";

  return (
    <Link href={href} className={`${isActive}`}>
      <div className={cn("px-4 py-2 rounded-md hover:bg-yellow-100", isActive)}>
        {children}
      </div>
    </Link>
  );
}
