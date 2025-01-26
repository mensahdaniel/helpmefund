"use client";
import { Navbar } from "@/components/shared/navbar";

import { usePathname } from "next/navigation";

const shouldHideNavbar = (pathname: string) => {
  return pathname.startsWith("/dashboard") ||
    pathname.startsWith("/admin") ||
    pathname.startsWith("/auth");
};

export function MainLayout(
  { children }: { children: React.ReactNode },
) {
  const pathname = usePathname();
  const hideNavbar = shouldHideNavbar(pathname);

  return (
    <>
      {!hideNavbar && <Navbar />}
      <main
        className={`${
          !hideNavbar ? "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8" : ""
        }`}
      >
        {children}
      </main>
    </>
  );
}
