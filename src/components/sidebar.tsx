import Link from "next/link";
import LinkActive from "./link-active";

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

      <div className="flex flex-col justify-between h-full">
        <ul className="w-full pt-8 space-y-2 flex flex-col">
          <li>
            <LinkActive href="/dashboard/locations/title">위치 보기</LinkActive>
          </li>

          <li>
            <LinkActive href="/dashboard/bookings">예약 목록</LinkActive>
          </li>

          <li>
            <LinkActive href="/dashboard/revenues">나의 수익</LinkActive>
          </li>
        </ul>

        <div className="pl-4 text-yellow-600">돌아가기</div>
      </div>
    </div>
  );
}
