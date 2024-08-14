import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { IoIosNotificationsOutline } from "react-icons/io";
import { CiSearch } from "react-icons/ci";

export default function Header() {
  return (
    <main className="p-4">
      <div className="container">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="capitalize font-bold">movie finder</h2>
          </div>
          <div className="flex items-center gap-5">
            <div className="text-xl flex items-center gap-4">
              <CiSearch />
              <IoIosNotificationsOutline />
            </div>
            <Avatar>
              <AvatarImage src={""} />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </div>
        </div>
      </div>
    </main>
  );
}
