import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AppProvider } from "@/context/AppContext";
import Shell from "@/components/layout/Shell";
import Landing from "@/pages/Landing";

export default function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/dashboard" element={<Shell />} />
        </Routes>
      </BrowserRouter>
    </AppProvider>
  )
}