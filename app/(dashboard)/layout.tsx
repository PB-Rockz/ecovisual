import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import React from "react";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <Header />
      <div className="flex ">
        <div className="w-full">{children}</div>
      </div>
    </div>
  );
};

export default DashboardLayout;
