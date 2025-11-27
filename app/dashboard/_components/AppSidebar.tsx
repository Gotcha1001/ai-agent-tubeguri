"use client";
import { Button } from "@/components/ui/button";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { UserDetailContext } from "@/context/UserDetailContext";
import { api } from "@/convex/_generated/api";
import { useAuth } from "@clerk/nextjs";
import { useConvex } from "convex/react";
import {
  Database,
  Gem,
  Headphones,
  LayoutDashboard,
  User,
  WalletCards,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useContext, useEffect, useState } from "react";

const MenuOptions = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "AI Agents",
    url: "/dashboard/my-agents",
    icon: Headphones,
  },
  // {
  //   title: "Data",
  //   url: "#",
  //   icon: Database,
  // },
  {
    title: "Pricing",
    url: "/dashboard/pricing",
    icon: WalletCards,
  },
  {
    title: "Profile",
    url: "/dashboard/profile",
    icon: User,
  },
];

function AppSidebar() {
  const { open } = useSidebar();
  const { userDetail, setUserDetail } = useContext(UserDetailContext);
  const path = usePathname();
  const { has } = useAuth();

  const isPaidUser = has && has({ plan: "unlimited_plan" });
  console.log("isPaidUser", isPaidUser);
  const convex = useConvex();
  const [totalRemainingCredits, setTotalRemainingCredits] = useState<number>(0);

  useEffect(() => {
    if (!isPaidUser && userDetail) {
      GetUserAgent();
    }
  }, [isPaidUser]);

  const GetUserAgent = async () => {
    const result = await convex.query(api.agent.GetUserAgents, {
      userId: userDetail?._id,
    });
    setTotalRemainingCredits(2 - Number(result?.length || 0));
    setUserDetail((prev: any) => ({
      ...prev,
      totalRemainingCredits: 2 - Number(result?.length || 0),
    }));
    console.log("AGENTS:", result);
  };

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="bg-radial from-purple-500 to-indigo-900">
        <div className="flex justify-center items-center">
          {open && (
            <Image
              src={"/logo.jpg"}
              alt="Logo"
              height={200}
              width={200}
              className="rounded-lg"
            />
          )}
        </div>
      </SidebarHeader>
      <SidebarContent className="bg-radial from-purple-500 to-indigo-900">
        <SidebarGroup>
          <SidebarGroupLabel>Application</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {MenuOptions.map((menu, index) => (
                <SidebarMenuItem key={index}>
                  <SidebarMenuButton
                    isActive={path === menu.url}
                    asChild
                    size={open ? "default" : "sm"}
                  >
                    <Link href={menu.url}>
                      <menu.icon />
                      {open && <span>{menu.title}</span>}
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup />
      </SidebarContent>
      <SidebarFooter className="bg-radial from-purple-500 to-indigo-900">
        {!isPaidUser ? (
          <div>
            <div className="flex gap-2 items-center mb-5">
              <Gem />
              {open && (
                <h2>
                  Remaining Credits:{" "}
                  <span className="font-bold">{totalRemainingCredits}/2</span>
                </h2>
              )}
            </div>
            {open && (
              <Button className="mt-2" variant={"sex"}>
                Upgrade To Umlimited
              </Button>
            )}
          </div>
        ) : (
          <div>
            <h2>You can create unlimited Agents</h2>
          </div>
        )}
      </SidebarFooter>
    </Sidebar>
  );
}

export default AppSidebar;
