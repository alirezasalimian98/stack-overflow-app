import LeftSidebar from "@/components/shared/LeftSidebar";
import Navbar from "@/components/shared/navbar/Navbar";
import RightSidebar from "@/components/shared/RightSidebar";
import { Toaster } from "@/components/ui/toaster";
import { ClerkProvider } from "@clerk/nextjs";
import React from "react";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <ClerkProvider dynamic>
      <main className="background-light850_dark100 relative">
        <Navbar />
        <div className="flex">
          <LeftSidebar />
          <section className="flex min-h-screen flex-1 flex-col px-6 pb-6 pt-36 max-md:pb-14 sm:px-14 ">
            <div className="mx-auto w-full mx-w-5xl">{children}</div>
          </section>
          <RightSidebar />
        </div>
        <Toaster />
      </main>
    </ClerkProvider>
  );
};

export default Layout;
