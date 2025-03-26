
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Index";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import UploadDatabase from "./pages/UploadDatabase";
import TryChatbot from "./pages/TryChatbot";
import Docs from "./pages/Docs";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";
import Auth from "./pages/Auth";
import { AuthProvider } from "./contexts/AuthContext";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Auth />} />
            <Route path="/signup" element={<Auth />} />
            <Route path="/upload-database" element={<UploadDatabase />} />
            <Route path="/try-chatbot" element={<TryChatbot />} />
            <Route path="/docs/*" element={<Docs />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
