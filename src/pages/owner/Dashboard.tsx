import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  TrendingUp,
  DollarSign,
  Users,
  Activity,
  Calendar,
  BarChart3,
  FileText,
  Clock
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const OwnerDashboard = () => {
  const navigate = useNavigate();

  const stats = [
    { label: "Pendapatan Bulan Ini", value: "Rp 45.2jt", change: "+12%", icon: DollarSign, color: "bg-success" },
    { label: "Total Kunjungan", value: "680", change: "+8%", icon: Users, color: "bg-primary" },
    { label: "Pasien Aktif", value: "324", change: "+15%", icon: Activity, color: "bg-secondary" },
    { label: "Rata-rata Harian", value: "28", change: "+5%", icon: Calendar, color: "bg-info" },
  ];

  const revenueData = [
    { month: "Jul", value: 38000000 },
    { month: "Agu", value: 42000000 },
    { month: "Sep", value: 39000000 },
    { month: "Okt", value: 45000000 },
    { month: "Nov", value: 48000000 },
    { month: "Des", value: 45200000 },
  ];

  const busyHours = [
    { time: "08:00 - 10:00", patients: 45, percentage: 75 },
    { time: "10:00 - 12:00", patients: 38, percentage: 63 },
    { time: "13:00 - 15:00", patients: 28, percentage: 47 },
    { time: "15:00 - 17:00", patients: 22, percentage: 37 },
  ];

  return (
    <div className="min-h-screen bg-gradient-medical-soft pb-20">
      <div className="bg-gradient-medical p-6 rounded-b-3xl shadow-medical">
        <div className="flex justify-between items-start mb-6">
          <div>
            <h1 className="text-2xl font-bold text-white mb-1">Dashboard Owner</h1>
            <p className="text-white/90">Klinik Sentosa - Overview</p>
          </div>
          <Badge className="bg-white/20 text-white">Owner</Badge>
        </div>

        <div className="grid grid-cols-2 gap-3">
          {stats.slice(0, 2).map((stat, index) => (
            <Card key={index} className="bg-white/10 backdrop-blur-sm border-white/20">
              <CardContent className="p-4">
                <stat.icon className="w-8 h-8 text-white mb-2" />
                <p className="text-xl font-bold text-white">{stat.value}</p>
                <div className="flex items-center justify-between">
                  <p className="text-white/80 text-sm">{stat.label}</p>
                  <Badge className="bg-white/20 text-white text-xs">
                    {stat.change}
                  </Badge>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <div className="p-6 space-y-6">
        <div className="grid grid-cols-2 gap-3">
          {stats.slice(2).map((stat, index) => (
            <Card key={index} className="shadow-card">
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <stat.icon className="w-6 h-6 text-muted-foreground" />
                  <Badge variant="outline" className="text-xs">
                    {stat.change}
                  </Badge>
                </div>
                <p className="text-2xl font-bold">{stat.value}</p>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card className="shadow-card">
          <CardHeader className="flex flex-row items-center justify-between pb-3">
            <CardTitle className="text-lg">Pendapatan 6 Bulan Terakhir</CardTitle>
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => navigate("/owner/revenue")}
            >
              Detail
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {revenueData.map((data, index) => (
                <div key={index} className="space-y-1">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">{data.month}</span>
                    <span className="font-semibold">
                      Rp {(data.value / 1000000).toFixed(1)}jt
                    </span>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-medical rounded-full"
                      style={{ width: `${(data.value / 50000000) * 100}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-card">
          <CardHeader className="flex flex-row items-center justify-between pb-3">
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-primary" />
              <CardTitle className="text-lg">Jam Sibuk</CardTitle>
            </div>
            <Button variant="ghost" size="sm">
              Minggu Ini
            </Button>
          </CardHeader>
          <CardContent className="space-y-4">
            {busyHours.map((hour, index) => (
              <div key={index} className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="font-medium">{hour.time}</span>
                  <Badge variant="outline">{hour.patients} pasien</Badge>
                </div>
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <div 
                    className={`h-full rounded-full ${
                      hour.percentage > 60 ? "bg-destructive" : 
                      hour.percentage > 40 ? "bg-warning" : "bg-success"
                    }`}
                    style={{ width: `${hour.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <div className="grid grid-cols-2 gap-3">
          <Card 
            className="shadow-card cursor-pointer hover:shadow-md"
            onClick={() => navigate("/owner/reports")}
          >
            <CardContent className="p-4 flex flex-col items-center text-center">
              <div className="bg-primary/10 p-3 rounded-2xl mb-3">
                <FileText className="w-6 h-6 text-primary" />
              </div>
              <p className="text-sm font-medium">Laporan Lengkap</p>
            </CardContent>
          </Card>
          <Card 
            className="shadow-card cursor-pointer hover:shadow-md"
            onClick={() => navigate("/owner/analytics")}
          >
            <CardContent className="p-4 flex flex-col items-center text-center">
              <div className="bg-secondary/10 p-3 rounded-2xl mb-3">
                <BarChart3 className="w-6 h-6 text-secondary" />
              </div>
              <p className="text-sm font-medium">Analitik</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default OwnerDashboard;
