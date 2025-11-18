import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Calendar, 
  FileText, 
  Pill, 
  Users, 
  Bell, 
  BookOpen,
  MessageCircle,
  Clock,
  Activity,
  ChevronRight
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Badge } from "@/components/ui/badge";

const PatientDashboard = () => {
  const navigate = useNavigate();

  const quickActions = [
    { icon: Calendar, label: "Booking Kunjungan", path: "/patient/booking", color: "bg-primary" },
    { icon: FileText, label: "Rekam Medis", path: "/patient/medical-records", color: "bg-secondary" },
    { icon: Pill, label: "Riwayat Obat", path: "/patient/medications", color: "bg-info" },
    { icon: Users, label: "Multi Profil", path: "/patient/profiles", color: "bg-success" },
  ];

  const upcomingReminders = [
    { title: "Kontrol Dokter", date: "25 Des 2025", time: "10:00", type: "appointment" },
    { title: "Minum Obat Amoxicillin", time: "14:00", type: "medication" },
  ];

  const healthArticles = [
    {
      title: "Tips Menjaga Kesehatan di Musim Hujan",
      category: "Kesehatan Umum",
      readTime: "5 menit"
    },
    {
      title: "Pentingnya Vaksinasi untuk Keluarga",
      category: "Pencegahan",
      readTime: "7 menit"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-medical-soft pb-20">
      {/* Header */}
      <div className="bg-gradient-medical p-6 rounded-b-3xl shadow-medical">
        <div className="flex justify-between items-start mb-6">
          <div>
            <h1 className="text-2xl font-bold text-white mb-1">Halo, John!</h1>
            <p className="text-white/90">Semoga sehat selalu</p>
          </div>
          <Button 
            variant="ghost" 
            size="icon"
            className="text-white hover:bg-white/20"
            onClick={() => navigate("/patient/notifications")}
          >
            <Bell className="w-6 h-6" />
            <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 bg-destructive">
              2
            </Badge>
          </Button>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 gap-3">
          <Card className="bg-white/10 backdrop-blur-sm border-white/20">
            <CardContent className="p-4">
              <Activity className="w-8 h-8 text-white mb-2" />
              <p className="text-2xl font-bold text-white">3</p>
              <p className="text-white/80 text-sm">Kunjungan Bulan Ini</p>
            </CardContent>
          </Card>
          <Card className="bg-white/10 backdrop-blur-sm border-white/20">
            <CardContent className="p-4">
              <Clock className="w-8 h-8 text-white mb-2" />
              <p className="text-2xl font-bold text-white">A-012</p>
              <p className="text-white/80 text-sm">Nomor Antrean Terakhir</p>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="p-6 space-y-6">
        {/* Quick Actions */}
        <div>
          <h2 className="text-lg font-semibold mb-4">Aksi Cepat</h2>
          <div className="grid grid-cols-2 gap-3">
            {quickActions.map((action) => (
              <Card 
                key={action.path}
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

        {/* Upcoming Reminders */}
        <Card className="shadow-card">
          <CardHeader className="flex flex-row items-center justify-between pb-3">
            <CardTitle className="text-lg">Pengingat</CardTitle>
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => navigate("/patient/reminders")}
            >
              Lihat Semua
            </Button>
          </CardHeader>
          <CardContent className="space-y-3">
            {upcomingReminders.map((reminder, index) => (
              <div 
                key={index}
                className="flex items-center justify-between p-3 bg-muted rounded-lg"
              >
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
                  <div>
                    <p className="font-medium text-sm">{reminder.title}</p>
                    <p className="text-xs text-muted-foreground">
                      {reminder.date && `${reminder.date}, `}{reminder.time}
                    </p>
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 text-muted-foreground" />
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Health Articles */}
        <Card className="shadow-card">
          <CardHeader className="flex flex-row items-center justify-between pb-3">
            <CardTitle className="text-lg">Artikel Kesehatan</CardTitle>
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => navigate("/patient/articles")}
            >
              Lihat Semua
            </Button>
          </CardHeader>
          <CardContent className="space-y-3">
            {healthArticles.map((article, index) => (
              <div 
                key={index}
                className="flex items-start gap-3 p-3 bg-muted rounded-lg cursor-pointer hover:bg-muted/80"
              >
                <div className="p-2 bg-info/10 rounded-lg">
                  <BookOpen className="w-5 h-5 text-info" />
                </div>
                <div className="flex-1">
                  <p className="font-medium text-sm mb-1">{article.title}</p>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <span>{article.category}</span>
                    <span>•</span>
                    <span>{article.readTime}</span>
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Chatbot Assistant */}
        <Button
          className="w-full bg-gradient-medical text-white shadow-medical"
          size="lg"
          onClick={() => navigate("/patient/chatbot")}
        >
          <MessageCircle className="w-5 h-5 mr-2" />
          Tanya Asisten Klinik
        </Button>
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-card border-t border-border p-4">
        <div className="flex justify-around max-w-md mx-auto">
          <Button variant="ghost" size="sm" className="flex-col h-auto py-2">
            <Calendar className="w-5 h-5 mb-1 text-primary" />
            <span className="text-xs text-primary">Beranda</span>
          </Button>
          <Button variant="ghost" size="sm" className="flex-col h-auto py-2" onClick={() => navigate("/patient/medical-records")}>
            <FileText className="w-5 h-5 mb-1" />
            <span className="text-xs">Rekam Medis</span>
          </Button>
          <Button variant="ghost" size="sm" className="flex-col h-auto py-2" onClick={() => navigate("/patient/profiles")}>
            <Users className="w-5 h-5 mb-1" />
            <span className="text-xs">Profil</span>
          </Button>
          <Button variant="ghost" size="sm" className="flex-col h-auto py-2" onClick={() => navigate("/patient/settings")}>
            <Bell className="w-5 h-5 mb-1" />
            <span className="text-xs">Notifikasi</span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PatientDashboard;
