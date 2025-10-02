"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
  useUser,
} from "@clerk/nextjs";

export default function Navbar() {
  const pathname = usePathname();
  const { user } = useUser();

  const links = [
    { href: "/", label: "Главная", icon: "home" },
    { href: "/sleep-data", label: "Данные сна", icon: "bedtime" },
    { href: "/ai-analysis", label: "AI анализ", icon: "analytics" },
    { href: "/settings", label: "Настройки", icon: "settings" },
    { href: "/about", label: "О нас", icon: "info" },
    { href: "/contact", label: "Контакты", icon: "contacts" },
  ];

  return (
    <nav
      className="
        group fixed top-0 left-0 h-full
        w-22 hover:w-64
        bg-gray-900 text-white shadow-md
        transition-all duration-300 ease-in-out
        overflow-hidden
          border-r-2 border-blue-500
          z-100
      "
    >
      <div className="flex flex-col h-full p-4">
        <Link href="/" className="flex items-center gap-3 mb-10 pl-2">
          <img
            src="/sleep-tracker-logo.png"
            alt="Sleep Tracker Logo"
            className="w-10 h-10 object-cover"
          />
          <span
            className="
              text-2xl font-bold
              bg-gradient-to-r from-[#1173d4] via-white to-[#1173d4]
              bg-clip-text text-transparent animate-gradient-logo
              opacity-0 group-hover:opacity-100 transition-opacity duration-300
              whitespace-nowrap
            "
          >
            SleepTracker
          </span>
        </Link>

        <ul className="flex flex-col space-y-2 flex-grow">
          {links.map((link) => {
            const isActive = pathname === link.href;
            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={`
                    flex items-center gap-2 px-4 py-2 rounded-md transition-colors
                    ${
                      isActive
                        ? "bg-[#1173d4] text-white"
                        : "text-gray-300 hover:bg-[#1173d4] hover:text-white"
                    }
                  `}
                >
                  <span className="material-symbols-outlined">{link.icon}</span>
                  <span
                    className="
                      opacity-0 group-hover:opacity-100
                      transition-opacity duration-300
                      whitespace-nowrap
                    "
                  >
                    {link.label}
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>

        <div className="mt-auto space-y-4 cursor-pointer">
          <SignedOut>
            <SignInButton>
              <div className="relative w-full">
                <div className="flex items-center justify-center w-12 h-12 absolute left-0 top-0 group-hover:opacity-0 opacity-100 transition-opacity duration-300">
                  <span className="material-symbols-outlined">login</span>
                </div>

                <div className="flex items-center gap-2 px-3 py-1 h-12 bg-[#1173d4] rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span className="material-symbols-outlined">login</span>
                  Sign In
                </div>
              </div>
            </SignInButton>
          </SignedOut>

          <SignedIn>
            <div className="flex items-center gap-3 px-3 pb-2">
              <UserButton />
              <div
                className="
                  flex flex-col
                  opacity-0 group-hover:opacity-100
                  transition-opacity duration-300
                  whitespace-nowrap
                "
              >
                <span className="font-medium">
                  {user?.fullName || "Пользователь"}
                </span>
                <span className="text-xs text-gray-400">
                  {user?.primaryEmailAddress?.emailAddress ||
                    "no-email@example.com"}
                </span>
              </div>
            </div>
          </SignedIn>
        </div>
      </div>
    </nav>
  );
}
