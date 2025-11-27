import { SignInButton, SignOutButton, UserButton } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex p-4 items-center w-full justify-center gap-4 gradient-background2">
      <h2 className="text-white">WECOME</h2>
      <div className="bg-white p-1 rounded-lg">
        <SignInButton />
      </div>

      <Link className="text-white" href={"/dashboard"}>
        Dashboard
      </Link>
      <UserButton />
    </div>
  );
}
