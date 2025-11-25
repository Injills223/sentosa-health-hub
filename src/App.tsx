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
import AdminQueue from "./pages/admin/Queue";
import AdminPayment from "./pages/admin/Payment";
import AdminReports from "./pages/admin/Reports";
import DoctorDashboard from "./pages/doctor/Dashboard";
import DoctorExamination from "./pages/doctor/Examination";
import DoctorPatients from "./pages/doctor/Patients";
import DoctorRecords from "./pages/doctor/Records";
import PharmacistDashboard from "./pages/pharmacist/Dashboard";
import PharmacistPrescriptionDetail from "./pages/pharmacist/PrescriptionDetail";
import PharmacistPrescriptions from "./pages/pharmacist/Prescriptions";
import PharmacistInventory from "./pages/pharmacist/Inventory";
import PharmacistReports from "./pages/pharmacist/Reports";
import OwnerDashboard from "./pages/owner/Dashboard";
import OwnerRevenue from "./pages/owner/Revenue";
import OwnerReports from "./pages/owner/Reports";
import OwnerAnalytics from "./pages/owner/Analytics";
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
          <Route path="/admin/queue" element={<AdminQueue />} />
          <Route path="/admin/payment" element={<AdminPayment />} />
          <Route path="/admin/reports" element={<AdminReports />} />
          
          {/* Doctor Routes */}
        <Route path="/doctor/dashboard" element={<DoctorDashboard />} />
        <Route path="/doctor/examination/:patientId" element={<DoctorExamination />} />
        <Route path="/doctor/patient/:patientId" element={<DoctorExamination />} />
        <Route path="/doctor/patients" element={<DoctorPatients />} />
        <Route path="/doctor/records" element={<DoctorRecords />} />
          
          {/* Pharmacist Routes */}
        <Route path="/pharmacist/dashboard" element={<PharmacistDashboard />} />
        <Route path="/pharmacist/prescription/:prescriptionId" element={<PharmacistPrescriptionDetail />} />
        <Route path="/pharmacist/prescriptions" element={<PharmacistPrescriptions />} />
        <Route path="/pharmacist/inventory" element={<PharmacistInventory />} />
        <Route path="/pharmacist/reports" element={<PharmacistReports />} />
          
          {/* Owner Routes */}
          <Route path="/owner/dashboard" element={<OwnerDashboard />} />
          <Route path="/owner/revenue" element={<OwnerRevenue />} />
          <Route path="/owner/reports" element={<OwnerReports />} />
          <Route path="/owner/analytics" element={<OwnerAnalytics />} />
          
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
