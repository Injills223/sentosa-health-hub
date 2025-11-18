import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, FileText, Calendar, User, ChevronRight } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const medicalRecords = [
  {
    id: "1",
    date: "15 Des 2025",
    doctor: "Dr. Amanda Wijaya",
    diagnosis: "Flu dan Batuk",
    notes: "Pasien mengalami demam ringan, batuk, dan pilek",
    prescription: "Paracetamol 500mg, Amoxicillin 500mg",
  },
  {
    id: "2",
    date: "02 Des 2025",
    doctor: "Dr. Budi Santoso",
    diagnosis: "Pemeriksaan Rutin",
    notes: "Tekanan darah normal, kondisi kesehatan baik",
    prescription: "Vitamin C",
  },
];

const PatientMedicalRecords = () => {
  const navigate = useNavigate();

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
        <h1 className="text-2xl font-bold text-white">Rekam Medis</h1>
        <p className="text-white/90">Riwayat kesehatan Anda</p>
      </div>

      <div className="p-6 space-y-6">
        <Tabs defaultValue="all" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="all">Semua</TabsTrigger>
            <TabsTrigger value="self">Saya</TabsTrigger>
            <TabsTrigger value="family">Keluarga</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="space-y-4 mt-4">
            {medicalRecords.map((record) => (
              <Card 
                key={record.id} 
                className="shadow-card cursor-pointer hover:shadow-md transition-shadow"
                onClick={() => navigate(`/patient/medical-record/${record.id}`)}
              >
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="bg-primary/10 p-2 rounded-lg">
                        <FileText className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <p className="font-semibold">{record.diagnosis}</p>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                          <Calendar className="w-3 h-3" />
                          <span>{record.date}</span>
                        </div>
                      </div>
                    </div>
                    <ChevronRight className="w-5 h-5 text-muted-foreground" />
                  </div>
                  
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                    <User className="w-3 h-3" />
                    <span>{record.doctor}</span>
                  </div>
                  
                  <p className="text-sm text-muted-foreground mb-2">{record.notes}</p>
                  
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="outline" className="text-xs">
                      {record.prescription.split(",")[0].trim()}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="self" className="space-y-4 mt-4">
            {medicalRecords.map((record) => (
              <Card key={record.id} className="shadow-card">
                <CardContent className="p-4">
                  <Badge className="mb-2">John Doe (Saya)</Badge>
                  <p className="font-semibold">{record.diagnosis}</p>
                  <p className="text-sm text-muted-foreground">{record.date}</p>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="family" className="space-y-4 mt-4">
            <Card className="shadow-card">
              <CardContent className="p-6 text-center">
                <FileText className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
                <p className="text-muted-foreground">Belum ada rekam medis keluarga</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default PatientMedicalRecords;
