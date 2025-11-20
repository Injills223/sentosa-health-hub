import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, Bell } from "lucide-react";

const PatientNotifications = () => {
  const navigate = useNavigate();

  const notifications = [
    {
      title: "Pengingat Kontrol",
      message: "Jadwal kontrol dokter Anda pada 25 Des 2025, pukul 10:00",
      time: "2 jam yang lalu",
      read: false
    },
    {
      title: "Pengingat Minum Obat",
      message: "Waktunya minum Amoxicillin 500mg",
      time: "4 jam yang lalu",
      read: true
    }
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
        <h1 className="text-2xl font-bold text-white">Notifikasi</h1>
        <p className="text-white/90">Pengingat dan pemberitahuan penting</p>
      </div>

      <div className="p-6 space-y-3">
        {notifications.map((notif, index) => (
          <Card key={index} className={`shadow-card ${!notif.read ? 'border-primary' : ''}`}>
            <CardContent className="p-4">
              <div className="flex gap-3">
                <div className={`p-2 rounded-lg ${!notif.read ? 'bg-primary/10' : 'bg-muted'}`}>
                  <Bell className={`w-5 h-5 ${!notif.read ? 'text-primary' : 'text-muted-foreground'}`} />
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-sm">{notif.title}</p>
                  <p className="text-sm text-muted-foreground mt-1">{notif.message}</p>
                  <p className="text-xs text-muted-foreground mt-2">{notif.time}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default PatientNotifications;
