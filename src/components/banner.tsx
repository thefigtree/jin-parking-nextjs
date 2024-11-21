import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MenuIcon } from "lucide-react";

export default function Banner() {
  return (
    <div className="w-full mx-auto bg-yellow-600 text-white">
      <div className="flex items-center justify-between px-8">
        <header>
          <h1 className="text-2xl font-bold sm:text-4xl">
            <Link href="/">Parking</Link>
          </h1>
        </header>

        {/* Shadcn Dropdown Menu */}
        <div>
          <div className="sm:hidden flex space-x-2 items-start">
            <DropdownMenu>
              <DropdownMenuTrigger>
                <MenuIcon></MenuIcon>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem>로그아웃</DropdownMenuItem>
                <DropdownMenuItem>
                  <Link href="/mybookings">내 예약 목록</Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link href="/dashboard">관리자 모드</Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            로그아웃 로그인
          </div>

          <div className="hidden sm:flex gap-x-4 items-center">
            <Link href="/mybookings">내 예약 목록</Link>
            <Link href="/dashboard">관리자 모드</Link>
            로그아웃 로그인
          </div>
        </div>
      </div>

      <div className="bg-yellow-600 w-full h-20"></div>
    </div>
  );
}
