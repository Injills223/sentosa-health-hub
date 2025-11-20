import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Splash from "./pages/Splash";
import Onboarding from "./pages/Onboarding";
import Auth from "./pages/Auth";
import PatientDashboard from "./pages/patient/Dashboard";
import PatientBooking from "./pages/patient/Booking";
import PatientMedicalRecords from "./pages/patient/MedicalRecords";
import PatientChatbot from "./pages/patient/Chatbot";
import PatientMedications from "./pages/patient/Medications";
import PatientNotifications from "./pages/patient/Notifications";
import PatientReminders from "./pages/patient/Reminders";
import PatientProfiles from "./pages/patient/Profiles";
import PatientSettings from "./pages/patient/Settings";
import PatientArticles from "./pages/patient/Articles";
import AdminDashboard from "./pages/admin/Dashboard";
import AdminRegisterPatient from "./pages/admin/RegisterPatient";
import DoctorDashboard from "./pages/doctor/Dashboard";
import PharmacistDashboard from "./pages/pharmacist/Dashboard";
import OwnerDashboard from "./pages/owner/Dashboard";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Splash />} />
          <Route path="/onboarding" element={<Onboarding />} />
          <Route path="/auth" element={<Auth />} />
          
          {/* Patient Routes */}
          <Route path="/patient/dashboard" element={<PatientDashboard />} />
          <Route path="/patient/booking" element={<PatientBooking />} />
          <Route path="/patient/medical-records" element={<PatientMedicalRecords />} />
          <Route path="/patient/chatbot" element={<PatientChatbot />} />
          <Route path="/patient/medications" element={<PatientMedications />} />
          <Route path="/patient/notifications" element={<PatientNotifications />} />
          <Route path="/patient/reminders" element={<PatientReminders />} />
          <Route path="/patient/profiles" element={<PatientProfiles />} />
          <Route path="/patient/settings" element={<PatientSettings />} />
          <Route path="/patient/articles" element={<PatientArticles />} />
          
          {/* Admin Routes */}
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/register-patient" element={<AdminRegisterPatient />} />
          
          {/* Doctor Routes */}
          <Route path="/doctor/dashboard" element={<DoctorDashboard />} />
          
          {/* Pharmacist Routes */}
          <Route path="/pharmacist/dashboard" element={<PharmacistDashboard />} />
          
          {/* Owner Routes */}
          <Route path="/owner/dashboard" element={<OwnerDashboard />} />
          
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
