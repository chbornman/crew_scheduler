"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  Calendar,
  Users,
  FolderOpen,
  Map,
  Settings,
  Menu,
  X,
  HardHat,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useState } from "react";
import { format, startOfWeek, endOfWeek } from "date-fns";
import { assignments } from "@/lib/mock-data";

const navigation = [
  {
    name: "Schedule",
    href: "/dashboard",
    icon: Calendar,
  },
  {
    name: "Resources",
    href: "/dashboard/resources",
    icon: Users,
  },
  {
    name: "Projects",
    href: "/dashboard/projects",
    icon: FolderOpen,
  },
  {
    name: "Map View",
    href: "/dashboard/map",
    icon: Map,
  },
  {
    name: "Settings",
    href: "/dashboard/settings",
    icon: Settings,
  },
];

export function Navigation() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Calculate current week dates
  const currentDate = new Date("2025-06-09");
  const weekStart = startOfWeek(currentDate, { weekStartsOn: 1 }); // Monday
  const weekEnd = endOfWeek(currentDate, { weekStartsOn: 1 }); // Sunday

  return (
    <>
      {/* Desktop Navigation */}
      <nav className="hidden lg:flex lg:flex-col lg:w-64 lg:fixed lg:inset-y-0 lg:z-50 lg:bg-secondary">
        <div className="flex flex-col gap-y-5 overflow-y-auto px-6">
          <div className="flex h-16 shrink-0 items-center gap-2">
            <HardHat className="h-8 w-8 text-primary" />
            <span className="text-xl font-bold text-white">Crew Scheduler</span>
          </div>
          <nav className="flex flex-1 flex-col">
            <ul role="list" className="flex flex-1 flex-col gap-y-7">
              <li>
                <ul role="list" className="-mx-2 space-y-1">
                  {navigation.map((item) => (
                    <li key={item.name}>
                      <Link
                        href={item.href}
                        className={cn(
                          pathname === item.href
                            ? "bg-primary text-white"
                            : "text-gray-300 hover:text-white hover:bg-secondary/80",
                          "group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold transition-colors",
                        )}
                      >
                        <item.icon
                          className="h-6 w-6 shrink-0"
                          aria-hidden="true"
                        />
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </li>
              <li className="mt-auto mb-6">
                <div className="rounded-lg bg-primary/10 p-4">
                  <p className="text-xs text-gray-300">Current Week</p>
                  <p className="text-sm font-semibold text-white mt-1">
                    {format(weekStart, "MMM d")} -{" "}
                    {format(weekEnd, "MMM d, yyyy")}
                  </p>
                  <p className="text-xs text-gray-300 mt-2">
                    {assignments.length} Active Assignments
                  </p>
                </div>
              </li>
            </ul>
          </nav>
        </div>
      </nav>

      {/* Mobile Navigation */}
      <div className="lg:hidden">
        <div className="fixed top-0 left-0 right-0 z-50 flex items-center gap-x-6 bg-secondary px-4 py-4 shadow-sm">
          <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="text-white">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-72 bg-secondary p-0">
              <div className="flex h-full flex-col gap-y-5 overflow-y-auto px-6 pb-4">
                <div className="flex h-16 shrink-0 items-center gap-2">
                  <HardHat className="h-8 w-8 text-primary" />
                  <span className="text-xl font-bold text-white">
                    Crew Scheduler
                  </span>
                </div>
                <nav className="flex flex-1 flex-col">
                  <ul role="list" className="flex flex-1 flex-col gap-y-7">
                    <li>
                      <ul role="list" className="-mx-2 space-y-1">
                        {navigation.map((item) => (
                          <li key={item.name}>
                            <Link
                              href={item.href}
                              onClick={() => setMobileMenuOpen(false)}
                              className={cn(
                                pathname === item.href
                                  ? "bg-primary text-white"
                                  : "text-gray-300 hover:text-white hover:bg-secondary/80",
                                "group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold",
                              )}
                            >
                              <item.icon
                                className="h-6 w-6 shrink-0"
                                aria-hidden="true"
                              />
                              {item.name}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </li>
                  </ul>
                </nav>
              </div>
            </SheetContent>
          </Sheet>
          <div className="flex items-center gap-2">
            <HardHat className="h-6 w-6 text-primary" />
            <span className="text-lg font-bold text-white">Crew Scheduler</span>
          </div>
        </div>
      </div>
    </>
  );
}
