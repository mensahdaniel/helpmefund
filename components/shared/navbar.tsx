"use client";

import { useState } from "react";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { Button } from "../ui/button";
import { LogOut, Menu, Plus, User } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

export function Navbar() {
  const { user, logout } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-40 w-full border-b bg-white/80 backdrop-blur-lg">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <span className="text-xl font-bold text-primary">HelpMeFund</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:space-x-6">
            <Link
              href="/projects"
              className="text-text-light hover:text-primary"
            >
              Browse Projects
            </Link>
            <Link href="/about" className="text-text-light hover:text-primary">
              How It Works
            </Link>
            {user
              ? (
                <div className="flex items-center gap-4">
                  <Link href="/projects/new">
                    <Button size="sm" className="gap-2">
                      <Plus className="h-4 w-4" />
                      Create Project
                    </Button>
                  </Link>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm">
                        <User className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <Link href="/dashboard">
                        <DropdownMenuItem>Dashboard</DropdownMenuItem>
                      </Link>
                      <Link href="/dashboard/settings">
                        <DropdownMenuItem>Settings</DropdownMenuItem>
                      </Link>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem onClick={() => logout()}>
                        <LogOut className="mr-2 h-4 w-4" />
                        Sign out
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              )
              : (
                <div className="flex items-center gap-4">
                  <Link href="/login">
                    <Button variant="ghost">Sign in</Button>
                  </Link>
                  <Link href="/register">
                    <Button>Get Started</Button>
                  </Link>
                </div>
              )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <Menu className="h-6 w-6" />
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <div className="md:hidden">
          <div className="space-y-1 px-4 pb-3 pt-2">
            <Link
              href="/projects"
              className="block px-3 py-2 text-base text-text-light hover:bg-gray-50"
            >
              Browse Projects
            </Link>
            <Link
              href="/about"
              className="block px-3 py-2 text-base text-text-light hover:bg-gray-50"
            >
              How It Works
            </Link>
            {user
              ? (
                <>
                  <Link
                    href="/dashboard"
                    className="block px-3 py-2 text-base text-text-light hover:bg-gray-50"
                  >
                    Dashboard
                  </Link>
                  <Link
                    href="/projects/new"
                    className="block px-3 py-2 text-base text-text-light hover:bg-gray-50"
                  >
                    Create Project
                  </Link>
                  <button
                    onClick={() => logout()}
                    className="block w-full px-3 py-2 text-left text-base text-red-600 hover:bg-gray-50"
                  >
                    Sign out
                  </button>
                </>
              )
              : (
                <>
                  <Link
                    href="/login"
                    className="block px-3 py-2 text-base text-text-light hover:bg-gray-50"
                  >
                    Sign in
                  </Link>
                  <Link
                    href="/register"
                    className="block px-3 py-2 text-base font-medium text-primary hover:bg-gray-50"
                  >
                    Get Started
                  </Link>
                </>
              )}
          </div>
        </div>
      )}
    </nav>
  );
}
