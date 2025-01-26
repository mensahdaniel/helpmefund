"use client";

import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { Button } from "../ui/button";

export function Navbar() {
  const { user } = useAuth();

  return (
    <nav className="border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <Link href="/" className="flex items-center">
              HelpMeFund
            </Link>
          </div>

          <div className="flex items-center gap-4">
            {user
              ? (
                <>
                  <Link href="/dashboard">Dashboard</Link>
                  <Link href="/projects/new">
                    <Button>Create Project</Button>
                  </Link>
                </>
              )
              : (
                <>
                  <Link href="/login">Login</Link>
                  <Link href="/register">
                    <Button>Get Started</Button>
                  </Link>
                </>
              )}
          </div>
        </div>
      </div>
    </nav>
  );
}
