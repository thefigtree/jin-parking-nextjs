import { ListIcon, MapIcon } from "lucide-react";
import Link from "next/link";

export default function LayoutSwitch() {
  return (
    <>
      <div className="flex justify-end space-x-2 text-yellow-600 p-4">
        <Link href="/dashboard/locations/tile" className="bg-white p-1 rounded">
          <ListIcon></ListIcon>
        </Link>

        <Link href="/dashboard/locations/map" className="bg-white p-1 rounded">
          <MapIcon></MapIcon>
        </Link>
      </div>
    </>
  );
}
