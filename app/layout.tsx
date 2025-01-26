import { Metadata } from "next";
import { Geist } from "next/font/google";
import { Toaster } from "sonner";
import "./globals.css";
import { AuthProvider } from "@/context/AuthContext";
import { MainLayout } from "@/layouts/main";

const geist = Geist({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "HelpMeFund - Student Project Crowdfunding",
  description: "Connect students with sponsors for project funding",
};

// Add a function to check if the current path should hide the navbar

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={geist.className}>
        <AuthProvider>
          <MainLayout>{children}</MainLayout>
          <Toaster position="top-center" />
        </AuthProvider>
      </body>
    </html>
  );
}
