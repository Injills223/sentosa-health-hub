import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, Calendar, Pill } from "lucide-react";

const PatientReminders = () => {
  const navigate = useNavigate();

  const reminders = [
    {
      title: "Kontrol Dokter",
      date: "25 Des 2025",
      time: "10:00",
      type: "appointment"
    },
    {
      title: "Minum Obat Amoxicillin",
      time: "14:00",
      type: "medication"
    },
    {
      title: "Minum Obat Paracetamol",
      time: "20:00",
      type: "medication"
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
        <h1 className="text-2xl font-bold text-white">Pengingat</h1>
        <p className="text-white/90">Semua pengingat Anda</p>
      </div>

      <div className="p-6 space-y-3">
        {reminders.map((reminder, index) => (
          <Card key={index} className="shadow-card">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-lg ${
                  reminder.type === 'appointment' ? 'bg-primary/10' : 'bg-secondary/10'
                }`}>
                  {reminder.type === 'appointment' ? (
                    <Calendar className="w-5 h-5 text-primary" />
                  ) : (
                    <Pill className="w-5 h-5 text-secondary" />
                  )}
                </div>
                <div className="flex-1">
                  <p className="font-medium text-sm">{reminder.title}</p>
                  <p className="text-xs text-muted-foreground">
                    {reminder.date && `${reminder.date}, `}{reminder.time}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default PatientReminders;
