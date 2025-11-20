import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Pill } from "lucide-react";

const PatientMedications = () => {
  const navigate = useNavigate();

  const medications = [
    {
      name: "Amoxicillin",
      dosage: "500mg",
      frequency: "3x sehari",
      duration: "7 hari",
      date: "20 Des 2025"
    },
    {
      name: "Paracetamol",
      dosage: "500mg",
      frequency: "3x sehari",
      duration: "5 hari",
      date: "15 Des 2025"
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
        <h1 className="text-2xl font-bold text-white">Riwayat Obat</h1>
        <p className="text-white/90">Daftar obat yang pernah diberikan</p>
      </div>

      <div className="p-6 space-y-4">
        {medications.map((med, index) => (
          <Card key={index} className="shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Pill className="w-5 h-5 text-primary" />
                {med.name}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 text-sm">
                <p><span className="font-semibold">Dosis:</span> {med.dosage}</p>
                <p><span className="font-semibold">Frekuensi:</span> {med.frequency}</p>
                <p><span className="font-semibold">Durasi:</span> {med.duration}</p>
                <p className="text-muted-foreground">Tanggal: {med.date}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default PatientMedications;
