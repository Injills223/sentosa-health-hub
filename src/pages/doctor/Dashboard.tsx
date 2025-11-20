import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Users, 
  Calendar, 
  FileText,
  Clock,
  Activity,
  Stethoscope,
  ChevronRight,
  LogOut
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";

const DoctorDashboard = () => {
  const navigate = useNavigate();
  const { user, signOut } = useAuth();

  const todaySchedule = [
    { id: "A-024", name: "John Doe", time: "10:30", complaint: "Demam dan batuk", status: "waiting" },
    { id: "A-025", name: "Jane Smith", time: "11:00", complaint: "Pemeriksaan rutin", status: "current" },
    { id: "A-026", name: "Bob Johnson", time: "11:30", complaint: "Sakit kepala", status: "waiting" },
    { id: "A-027", name: "Alice Brown", time: "12:00", complaint: "Alergi kulit", status: "waiting" },
  ];

  const stats = [
    { label: "Pasien Hari Ini", value: "12", icon: Users },
    { label: "Selesai Diperiksa", value: "8", icon: Activity },
    { label: "Dalam Antrean", value: "4", icon: Clock },
  ];

  return (
    <div className="min-h-screen bg-gradient-medical-soft pb-20">
      <div className="bg-gradient-medical p-6 rounded-b-3xl shadow-medical">
        <div className="flex justify-between items-start mb-6">
          <div>
            <h1 className="text-2xl font-bold text-white mb-1">Dashboard Dokter</h1>
            <p className="text-white/90">{user?.user_metadata?.full_name || 'Dokter'}</p>
          </div>
          <div className="flex gap-2">
            <Badge className="bg-white/20 text-white">Dokter</Badge>
            <Button 
              variant="ghost" 
              size="icon"
              className="text-white hover:bg-white/20"
              onClick={signOut}
            >
              <LogOut className="w-6 h-6" />
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-3">
          {stats.map((stat, index) => (
            <Card key={index} className="bg-white/10 backdrop-blur-sm border-white/20">
              <CardContent className="p-3">
                <stat.icon className="w-6 h-6 text-white mb-2" />
                <p className="text-xl font-bold text-white">{stat.value}</p>
                <p className="text-white/80 text-xs">{stat.label}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <div className="p-6 space-y-6">
        <Card className="shadow-card border-l-4 border-l-warning">
          <CardContent className="p-4">
            <div className="flex items-center gap-3 mb-2">
              <Stethoscope className="w-5 h-5 text-warning" />
              <p className="font-semibold">Pasien Saat Ini</p>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-bold text-lg">A-025 - Jane Smith</p>
                <p className="text-sm text-muted-foreground">Pemeriksaan rutin</p>
              </div>
              <Button 
                size="sm"
                onClick={() => navigate("/doctor/examination/A-025")}
              >
                Mulai Periksa
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-card">
          <CardHeader className="flex flex-row items-center justify-between pb-3">
            <CardTitle className="text-lg">Jadwal Hari Ini</CardTitle>
            <Button variant="ghost" size="sm">
              <Calendar className="w-4 h-4 mr-2" />
              Lihat Kalender
            </Button>
          </CardHeader>
          <CardContent className="space-y-3">
            {todaySchedule.map((patient) => (
              <div 
                key={patient.id}
                className={`p-4 rounded-lg border-l-4 cursor-pointer hover:bg-muted transition-colors ${
                  patient.status === "current" 
                    ? "border-l-primary bg-primary/5" 
                    : "border-l-muted"
                }`}
                onClick={() => navigate(`/doctor/patient/${patient.id}`)}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <Badge variant={patient.status === "current" ? "default" : "outline"}>
                      {patient.id}
                    </Badge>
                    <p className="font-semibold">{patient.name}</p>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground text-sm">
                    <Clock className="w-4 h-4" />
                    {patient.time}
                  </div>
                </div>
                <p className="text-sm text-muted-foreground mb-2">{patient.complaint}</p>
                <div className="flex items-center justify-between">
                  <Badge variant="secondary" className="text-xs">
                    {patient.status === "current" ? "Sedang Diperiksa" : "Menunggu"}
                  </Badge>
                  <ChevronRight className="w-4 h-4 text-muted-foreground" />
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <div className="grid grid-cols-2 gap-3">
          <Card 
            className="shadow-card cursor-pointer hover:shadow-md"
            onClick={() => navigate("/doctor/patients")}
          >
            <CardContent className="p-4 flex flex-col items-center text-center">
              <div className="bg-primary/10 p-3 rounded-2xl mb-3">
                <Users className="w-6 h-6 text-primary" />
              </div>
              <p className="text-sm font-medium">Daftar Pasien</p>
            </CardContent>
          </Card>
          <Card 
            className="shadow-card cursor-pointer hover:shadow-md"
            onClick={() => navigate("/doctor/records")}
          >
            <CardContent className="p-4 flex flex-col items-center text-center">
              <div className="bg-secondary/10 p-3 rounded-2xl mb-3">
                <FileText className="w-6 h-6 text-secondary" />
              </div>
              <p className="text-sm font-medium">Rekam Medis</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default DoctorDashboard;
