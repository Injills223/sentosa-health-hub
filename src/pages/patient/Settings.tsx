import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, User, Bell, Lock, HelpCircle, LogOut } from "lucide-react";

const PatientSettings = () => {
  const navigate = useNavigate();

  const settingsMenu = [
    { icon: User, label: "Edit Profil", path: "/patient/edit-profile" },
    { icon: Bell, label: "Pengaturan Notifikasi", path: "/patient/notification-settings" },
    { icon: Lock, label: "Ubah Password", path: "/patient/change-password" },
    { icon: HelpCircle, label: "Bantuan", path: "/patient/help" }
  ];

  return (
    <div className="min-h-screen bg-gradient-medical-soft pb-20">
      <div className="bg-gradient-medical p-6 rounded-b-3xl shadow-medical mb-6">
        <Button
          variant="ghost"
          onClick={() => navigate("/patient/dashboard")}
          className="text-white hover:bg-white/20 mb-4"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Kembali
        </Button>
        <h1 className="text-2xl font-bold text-white">Pengaturan</h1>
        <p className="text-white/90">Kelola akun dan preferensi</p>
      </div>

      <div className="p-6 space-y-3">
        {settingsMenu.map((item, index) => (
          <Card key={index} className="shadow-card cursor-pointer hover:shadow-md transition-shadow">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="bg-muted p-2 rounded-lg">
                  <item.icon className="w-5 h-5 text-foreground" />
                </div>
                <p className="flex-1 font-medium">{item.label}</p>
              </div>
            </CardContent>
          </Card>
        ))}

        <Button 
          variant="destructive" 
          className="w-full mt-6"
          onClick={() => navigate("/")}
        >
          <LogOut className="w-5 h-5 mr-2" />
          Keluar
        </Button>
      </div>
    </div>
  );
};

export default PatientSettings;
