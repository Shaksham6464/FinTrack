import React from "react";
import { useAppContext } from "@/hooks/useAppContext";
import Topbar from "./Topbar";
import Sidebar from "./Sidebar";
import MobileNav from "./MobileNav";
import Overview from "@/pages/Overview";
import Transactions from "@/pages/Transactions";
import Insights from "@/pages/Insights";
import TransactionModal from "@/components/transactions/TransactionModal";
import Toast from "@/components/ui/Toast";

const PAGE_MAP = {
  overview:     Overview,
  transactions: Transactions,
  insights:     Insights,
};

export default function Shell() {
  const { dark, page } = useAppContext();
  const PageComponent = PAGE_MAP[page] || Overview;

  return (
    <div className={`shell ${dark ? "" : "light-mode"}`}>
      <Topbar />
      <div className="body-wrap">
        <Sidebar />
        <main className="main">
          <PageComponent />
        </main>
      </div>
      <MobileNav />
      <TransactionModal />
      <Toast />
    </div>
  );
}
