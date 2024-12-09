import { FolderKanban, FileCheck, Inbox, UsersRound } from "lucide-react";
import { useLocation } from "react-router-dom";
import useLogOut from "@/utils/useLogout";
import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { ClassicSpinner } from "react-spinners-kit";


import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogDescription,
  DialogClose,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { auth } from "@/firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/firebase/db";

const items = [
  {
    title: "Manage Dormers",
    url: "/manage-dormers",
    icon: UsersRound,
  },
  {
    title: "Manage Permits",
    url: "/manage",
    icon: FileCheck,
  },
  {
    title: "Manage Rooms",
    url: "/manage-rooms",
    icon: FolderKanban,
  },
];



export function AppSidebar() {

  const location = useLocation();
  const logOut = useLogOut();
  const [isOpen, setIsOpen] = useState(false);
  const [user, isLoading] = useAuthState(auth);
  const [adminDetails, setAdminDetails] = useState(null);

  useEffect(()=>{
    const fetchAdmin = async () => {
      try {
        const adminRef = doc(db, "users", user.uid);
        const adminDocSnap = await getDoc(adminRef);

        if (adminDocSnap.exists()){
          setAdminDetails(adminDocSnap.data());
          console.log(adminDetails)
        } else {
          console.log("DNE")
        }
      } catch (error) {
        console.log("Error: ", error);
      }
    }

    fetchAdmin();

  }, [user, isLoading])



  const handleLogOut = () => {
    logOut();
    setIsOpen(false); 
  };

  return (
    <Sidebar className="bg-white w-64 text-[#ff8d4e]">
      <div className="p-4 text-2xl font-bold">DormMate</div>
      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu className>
            {items.map((item) => (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton asChild>
                  <a
                    href={item.url}
                    className={`flex items-center gap-3 px-4 py-2 rounded-lg ${
                      location.pathname === item.url
                        ? "bg-[#ff8d4e]  text-white"
                        : "hover:bg-[#d3723e] "
                    }`}
                  >
                    <item.icon />
                    <span>{item.title}</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <div className="mt-auto p-4 border-t">
        <div className="flex items-center gap-3 mb-3">
          <img
            src="https://via.placeholder.com/40"
            alt="Profile"
            className="w-10 h-10 rounded-full"
          />
          {adminDetails ? (
            <>
              <div className="flex flex-col">
                <span className="text-md font-bold">
                  {adminDetails.firstName} {adminDetails.lastName}
                </span>
                <p className="text-sm">{adminDetails.userDorm}</p>
              </div>
            </>
          ) : (
            <ClassicSpinner size={20} color="#ff8d4e" />
          )}
        </div>
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger className="mt-4 px-4 w-full py-2 bg-[#ff8d4e] text-white hover:bg-[#d3723e] rounded-lg">
            Log Out
          </DialogTrigger>

          <DialogContent>
            <DialogTitle>Are you sure you want to log out?</DialogTitle>
            <DialogDescription>
              You will be logged out of your account and redirected to the login
              page.
            </DialogDescription>
            <DialogFooter>
              <DialogClose
                onClick={() => setIsOpen(false)}
                className="px-4 py-2 bg-gray-500 text-white rounded-md mr-2"
              >
                Cancel
              </DialogClose>
              <button
                onClick={handleLogOut}
                className="px-4 py-2 bg-[#ff8d4e] text-white rounded-md "
              >
                Confirm
              </button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </Sidebar>
  );
}
