import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/hooks/useAuth";
import { ProtectedRoute } from "@/components/ProtectedRoute";
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
        <AuthProvider>
          <Routes>
            <Route path="/" element={<Splash />} />
            <Route path="/onboarding" element={<Onboarding />} />
            <Route path="/auth" element={<Auth />} />
            
            {/* Patient Routes */}
            <Route path="/patient/dashboard" element={<ProtectedRoute allowedRoles={["patient"]}><PatientDashboard /></ProtectedRoute>} />
            <Route path="/patient/booking" element={<ProtectedRoute allowedRoles={["patient"]}><PatientBooking /></ProtectedRoute>} />
            <Route path="/patient/medical-records" element={<ProtectedRoute allowedRoles={["patient"]}><PatientMedicalRecords /></ProtectedRoute>} />
            <Route path="/patient/chatbot" element={<ProtectedRoute allowedRoles={["patient"]}><PatientChatbot /></ProtectedRoute>} />
            <Route path="/patient/medications" element={<ProtectedRoute allowedRoles={["patient"]}><PatientMedications /></ProtectedRoute>} />
            <Route path="/patient/notifications" element={<ProtectedRoute allowedRoles={["patient"]}><PatientNotifications /></ProtectedRoute>} />
            <Route path="/patient/reminders" element={<ProtectedRoute allowedRoles={["patient"]}><PatientReminders /></ProtectedRoute>} />
            <Route path="/patient/profiles" element={<ProtectedRoute allowedRoles={["patient"]}><PatientProfiles /></ProtectedRoute>} />
            <Route path="/patient/settings" element={<ProtectedRoute allowedRoles={["patient"]}><PatientSettings /></ProtectedRoute>} />
            <Route path="/patient/articles" element={<ProtectedRoute allowedRoles={["patient"]}><PatientArticles /></ProtectedRoute>} />
            
            {/* Admin Routes */}
            <Route path="/admin/dashboard" element={<ProtectedRoute allowedRoles={["admin"]}><AdminDashboard /></ProtectedRoute>} />
            <Route path="/admin/register-patient" element={<ProtectedRoute allowedRoles={["admin"]}><AdminRegisterPatient /></ProtectedRoute>} />
            
            {/* Doctor Routes */}
            <Route path="/doctor/dashboard" element={<ProtectedRoute allowedRoles={["doctor"]}><DoctorDashboard /></ProtectedRoute>} />
            
            {/* Pharmacist Routes */}
            <Route path="/pharmacist/dashboard" element={<ProtectedRoute allowedRoles={["pharmacist"]}><PharmacistDashboard /></ProtectedRoute>} />
            
            {/* Owner Routes */}
            <Route path="/owner/dashboard" element={<ProtectedRoute allowedRoles={["owner"]}><OwnerDashboard /></ProtectedRoute>} />
            
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
