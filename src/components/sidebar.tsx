import Link from "next/link";

export interface MenuItem {
  id: string;
  href: string;
  title: string;
}

export default function Sidebar() {
  return (
    <div className="flex flex-col z-10 w-[250px] h-full overflow-auto p-4">
      <h1 className="text-2xl pl-4">
        <Link href="/dashboard">Dashboard</Link>
      </h1>
    </div>
  );
}
