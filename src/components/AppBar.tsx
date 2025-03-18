"use client"

import { useState } from "react";
import Link from "next/link";
import { ChevronDown, Leaf, Menu, User } from "lucide-react";
import { Poppins } from "next/font/google";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { signOut, useSession } from "next-auth/react";

const poppins = Poppins({ subsets: ["latin"], weight: ["300", "400", "500", "600", "700"] });

export default function AppBar() {
  const [isOpen, setIsOpen] = useState(false);
  const { data: session } = useSession();

  return (
    <nav className={`sticky top-0 z-50 w-full bg-gradient-to-r from-[#d0bfff] via-[#e6ccff] to-[#ffc0d9] shadow-lg ${poppins.className}`}>
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo and Brand */}
          <div className="flex items-center">
            <Link href={session?.user ? "/home" : "/"} className="flex items-center space-x-2">
              <Leaf className="h-6 w-6 text-[#00000]" />
              <span className="text-xl text-[#00000]">Mind NutriAi</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          {/* <div className="hidden md:flex md:items-center md:space-x-8">
            <Link href="/meal-plans" className="text-[#00000]  hover:text-[#7b2cbf] transition-colors">
              Meal Plans
            </Link>
            <Link href="/recipes" className="text-[#00000]  hover:text-[#7b2cbf] transition-colors">
              Recipes
            </Link>
            <Link href="/nutrition" className="text-[#00000]  hover:text-[#7b2cbf] transition-colors">
              Nutrition
            </Link>
            <Link href="/about" className="text-[#00000]  hover:text-[#7b2cbf] transition-colors">
              About
            </Link>
          </div> */}

          {/* User Profile Dropdown */}
          {session?.user ? (
            <div className="flex items-center">
              <DropdownMenu>
                <DropdownMenuTrigger className="focus:outline-none">
                  <div className="flex items-center space-x-1 rounded-full bg-[#9d4edd] p-2 text-white transition-colors hover:bg-[#7b2cbf]">
                    <User className="h-5 w-5" />
                    <ChevronDown className="h-4 w-4" />
                  </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56 bg-[#f3e8ff] text-[#00000]">
                  <DropdownMenuItem>
                    <Link href={"/profile"} className="flex w-full">
                      Profile
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Link href={"/report-analysys"} className="flex w-full">
                      Report Analysis
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Link href={"/meal-plan"} className="flex w-full">
                      Saved Meal Plan
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <div className="flex w-full">Saved Recipes</div>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <div onClick={() => signOut()} className="flex w-full">
                      Logout
                    </div>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              {/* Mobile Menu Button */}
              <Sheet open={isOpen} onOpenChange={setIsOpen}>
                <SheetTrigger asChild>
                  <button className="ml-4 rounded-md p-2 text-[#5a189a] md:hidden">
                    <Menu className="h-6 w-6" />
                  </button>
                </SheetTrigger>
                <SheetContent side="right" className="bg-[#9d4edd] text-white">
                  <div className="flex flex-col space-y-6 pt-6">
                    <div className="pt-4">
                      <div className="h-px w-full bg-[#d0bfff]" />
                    </div>
                    <Link href={"/profile"} className="text-lg" onClick={() => setIsOpen(false)}>
                      Profile
                    </Link>
                    <div className="text-lg" onClick={() => setIsOpen(false)}>
                      Settings
                    </div>
                    <div className="text-lg" onClick={() => setIsOpen(false)}>
                      Saved Recipes
                    </div>
                    <div className="text-lg" onClick={() => signOut()}>
                      Logout
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          ) : (
            <Link href="/login" className="text-[#00000] hover:text-[#7b2cbf] transition-colors">
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}