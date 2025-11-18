import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Users, 
  Calendar, 
  DollarSign, 
  FileText,
  UserPlus,
  ClipboardList,
  TrendingUp,
  Clock
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Badge } from "@/components/ui/badge";

const AdminDashboard = () => {
  const navigate = useNavigate();

  const stats = [
    { label: "Pasien Hari Ini", value: "24", icon: Users, color: "bg-primary" },
    { label: "Total Pendaftaran", value: "18", icon: Calendar, color: "bg-secondary" },
    { label: "Pembayaran Hari Ini", value: "Rp 2.4jt", icon: DollarSign, color: "bg-success" },
    { label: "Antrean Aktif", value: "8", icon: Clock, color: "bg-warning" },
  ];

  const quickActions = [
    { icon: UserPlus, label: "Daftar Pasien Baru", path: "/admin/register-patient", color: "bg-primary" },
    { icon: ClipboardList, label: "Kelola Antrean", path: "/admin/queue", color: "bg-secondary" },
    { icon: DollarSign, label: "Input Pembayaran", path: "/admin/payment", color: "bg-success" },
    { icon: FileText, label: "Laporan", path: "/admin/reports", color: "bg-info" },
  ];

  const recentPatients = [
    { id: "A-024", name: "John Doe", time: "10:30", status: "waiting" },
    { id: "A-025", name: "Jane Smith", time: "11:00", status: "inProgress" },
    { id: "A-026", name: "Bob Johnson", time: "11:30", status: "waiting" },
  ];

  return (
    <div className="min-h-screen bg-gradient-medical-soft pb-20">
      <div className="bg-gradient-medical p-6 rounded-b-3xl shadow-medical">
        <div className="flex justify-between items-start mb-6">
          <div>
            <h1 className="text-2xl font-bold text-white mb-1">Dashboard Admin</h1>
            <p className="text-white/90">Klinik Sentosa - Front Office</p>
          </div>
          <Badge className="bg-white/20 text-white">Admin</Badge>
        </div>

        <div className="grid grid-cols-2 gap-3">
          {stats.map((stat, index) => (
            <Card key={index} className="bg-white/10 backdrop-blur-sm border-white/20">
              <CardContent className="p-4">
                <stat.icon className="w-8 h-8 text-white mb-2" />
                <p className="text-2xl font-bold text-white">{stat.value}</p>
                <p className="text-white/80 text-sm">{stat.label}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <div className="p-6 space-y-6">
        <div>
          <h2 className="text-lg font-semibold mb-4">Aksi Cepat</h2>
          <div className="grid grid-cols-2 gap-3">
            {quickActions.map((action, index) => (
              <Card 
                key={index}
                className="cursor-pointer hover:shadow-md transition-shadow"
                onClick={() => navigate(action.path)}
              >
                <CardContent className="p-4 flex flex-col items-center text-center">
                  <div className={`${action.color} p-3 rounded-2xl mb-3`}>
                    <action.icon className="w-6 h-6 text-white" />
                  </div>
                  <p className="text-sm font-medium">{action.label}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="text-lg">Antrean Hari Ini</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {recentPatients.map((patient) => (
              <div 
                key={patient.id}
                className="flex items-center justify-between p-3 bg-muted rounded-lg"
              >
                <div>
                  <p className="font-semibold">{patient.id} - {patient.name}</p>
                  <p className="text-sm text-muted-foreground">{patient.time}</p>
                </div>
                <Badge variant={patient.status === "inProgress" ? "default" : "outline"}>
                  {patient.status === "inProgress" ? "Sedang Diperiksa" : "Menunggu"}
                </Badge>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="text-lg">Statistik Minggu Ini</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Total Kunjungan</span>
                <span className="font-bold">156</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Pasien Baru</span>
                <span className="font-bold">12</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Rata-rata Waktu Tunggu</span>
                <span className="font-bold">18 menit</span>
              </div>
              <div className="flex items-center gap-2 text-success">
                <TrendingUp className="w-4 h-4" />
                <span className="text-sm">+12% dari minggu lalu</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard;
