"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Bell, Home, LogOut, FlipHorizontalIcon as SwapHorizontal } from "lucide-react"
import { cn } from "@/lib/utils"
import { Logo } from "@/components/logo"

export function Sidebar() {
  const pathname = usePathname()

  const navItems = [
    {
      name: "Home",
      href: "/",
      icon: Home,
    },
    {
      name: "Swap Request",
      href: "/swap-request",
      icon: SwapHorizontal,
    },
    {
      name: "Notifications",
      href: "/notifications",
      icon: Bell,
      badge: 12,
    },
  ]

  return (
    <div className="w-56 border-r bg-white flex flex-col h-full">
      <div className="p-4">
        <Logo />
      </div>
      <nav className="flex-1">
        <ul className="space-y-1">
          {navItems.map((item) => (
            <li key={item.name}>
              <Link
                href={item.href}
                className={cn(
                  "flex items-center gap-3 px-4 py-3 text-sm font-medium",
                  pathname === item.href ? "bg-blue-50 text-blue-600" : "text-gray-600 hover:bg-gray-100",
                )}
              >
                <item.icon className="h-5 w-5" />
                {item.name}
                {item.badge && (
                  <span className="ml-auto flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs text-white">
                    {item.badge}
                  </span>
                )}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      <div className="p-4 mt-auto">
        <Link
          href="/logout"
          className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-red-600 hover:bg-red-50 rounded-md"
        >
          <LogOut className="h-5 w-5" />
          Log out
        </Link>
      </div>
    </div>
  )
}

