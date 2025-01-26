"use client";

import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { Button } from "../ui/button";

export function Navbar() {
  const { user } = useAuth();

  return (
    <nav className="border-b border-border bg-white/80 backdrop-blur-lg backdrop-filter">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="text-xl font-bold text-primary">
            HelpMeFund
          </Link>

          <div className="hidden space-x-8 md:flex">
            <Link href="/projects" className="text-text hover:text-primary">
              Browse Projects
            </Link>
            <Link href="/about" className="text-text hover:text-primary">
              How It Works
            </Link>
          </div>

          <div className="flex items-center gap-4">
            {user
              ? (
                <>
                  <Link href="/dashboard">
                    <Button variant="ghost">Dashboard</Button>
                  </Link>
                  <Link href="/projects/new">
                    <Button className="btn-primary">Create Project</Button>
                  </Link>
                </>
              )
              : (
                <>
                  <Link href="/login">
                    <Button variant="ghost">Login</Button>
                  </Link>
                  <Link href="/register">
                    <Button className="btn-primary">Get Started</Button>
                  </Link>
                </>
              )}
          </div>
        </div>
      </div>
    </nav>
  );
}
