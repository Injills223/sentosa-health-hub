import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Pill, 
  Package, 
  AlertTriangle,
  CheckCircle,
  Clock,
  TrendingDown,
  ChevronRight,
  LogOut
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";

const PharmacistDashboard = () => {
  const navigate = useNavigate();
  const { signOut } = useAuth();

  const pendingPrescriptions = [
    { id: "R-024", patient: "John Doe", doctor: "Dr. Amanda", items: 3, time: "10:45", status: "pending" },
    { id: "R-025", patient: "Jane Smith", doctor: "Dr. Budi", items: 2, time: "11:20", status: "preparing" },
    { id: "R-026", patient: "Bob Johnson", doctor: "Dr. Amanda", items: 4, time: "11:50", status: "pending" },
  ];

  const lowStockItems = [
    { name: "Paracetamol 500mg", stock: 45, minStock: 100, unit: "tablet" },
    { name: "Amoxicillin 500mg", stock: 28, minStock: 50, unit: "kapsul" },
    { name: "Vitamin C", stock: 15, minStock: 50, unit: "tablet" },
  ];

  const stats = [
    { label: "Resep Hari Ini", value: "18", icon: Pill, color: "bg-primary" },
    { label: "Resep Selesai", value: "12", icon: CheckCircle, color: "bg-success" },
    { label: "Dalam Proses", value: "6", icon: Clock, color: "bg-warning" },
    { label: "Stok Menipis", value: "3", icon: AlertTriangle, color: "bg-destructive" },
  ];

  return (
    <div className="min-h-screen bg-gradient-medical-soft pb-20">
      <div className="bg-gradient-medical p-6 rounded-b-3xl shadow-medical">
        <div className="flex justify-between items-start mb-6">
          <div>
            <h1 className="text-2xl font-bold text-white mb-1">Dashboard Apoteker</h1>
            <p className="text-white/90">Klinik Sentosa Pharmacy</p>
          </div>
          <div className="flex gap-2">
            <Badge className="bg-white/20 text-white">Apoteker</Badge>
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
        <Card className="shadow-card">
          <CardHeader className="flex flex-row items-center justify-between pb-3">
            <CardTitle className="text-lg">Resep Masuk</CardTitle>
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => navigate("/pharmacist/prescriptions")}
            >
              Lihat Semua
            </Button>
          </CardHeader>
          <CardContent className="space-y-3">
            {pendingPrescriptions.map((prescription) => (
              <div 
                key={prescription.id}
                className="p-4 rounded-lg border cursor-pointer hover:bg-muted transition-colors"
                onClick={() => navigate(`/pharmacist/prescription/${prescription.id}`)}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <Badge variant={prescription.status === "preparing" ? "default" : "outline"}>
                      {prescription.id}
                    </Badge>
                    <p className="font-semibold">{prescription.patient}</p>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground text-sm">
                    <Clock className="w-4 h-4" />
                    {prescription.time}
                  </div>
                </div>
                <p className="text-sm text-muted-foreground mb-2">
                  Dokter: {prescription.doctor}
                </p>
                <div className="flex items-center justify-between">
                  <Badge variant="secondary" className="text-xs">
                    {prescription.items} item obat
                  </Badge>
                  <ChevronRight className="w-4 h-4 text-muted-foreground" />
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="shadow-card border-l-4 border-l-destructive">
          <CardHeader className="flex flex-row items-center justify-between pb-3">
            <div className="flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-destructive" />
              <CardTitle className="text-lg">Stok Menipis</CardTitle>
            </div>
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => navigate("/pharmacist/inventory")}
            >
              Kelola Stok
            </Button>
          </CardHeader>
          <CardContent className="space-y-3">
            {lowStockItems.map((item, index) => (
              <div 
                key={index}
                className="p-3 rounded-lg bg-destructive/5 border border-destructive/20"
              >
                <div className="flex items-center justify-between mb-2">
                  <p className="font-medium text-sm">{item.name}</p>
                  <Badge variant="destructive" className="text-xs">
                    Menipis
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-sm">
                    <Package className="w-4 h-4 text-muted-foreground" />
                    <span className="text-muted-foreground">
                      Stok: <span className="font-semibold text-destructive">{item.stock}</span> {item.unit}
                    </span>
                  </div>
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <TrendingDown className="w-3 h-3" />
                    <span>Min: {item.minStock}</span>
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <div className="grid grid-cols-2 gap-3">
          <Card 
            className="shadow-card cursor-pointer hover:shadow-md"
            onClick={() => navigate("/pharmacist/inventory")}
          >
            <CardContent className="p-4 flex flex-col items-center text-center">
              <div className="bg-primary/10 p-3 rounded-2xl mb-3">
                <Package className="w-6 h-6 text-primary" />
              </div>
              <p className="text-sm font-medium">Kelola Inventori</p>
            </CardContent>
          </Card>
          <Card 
            className="shadow-card cursor-pointer hover:shadow-md"
            onClick={() => navigate("/pharmacist/reports")}
          >
            <CardContent className="p-4 flex flex-col items-center text-center">
              <div className="bg-secondary/10 p-3 rounded-2xl mb-3">
                <Pill className="w-6 h-6 text-secondary" />
              </div>
              <p className="text-sm font-medium">Laporan Obat</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default PharmacistDashboard;
