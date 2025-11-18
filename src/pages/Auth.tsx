import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Heart, ArrowLeft, User, UserCog, Stethoscope, Pill, Briefcase } from "lucide-react";
import { toast } from "sonner";

type UserRole = "patient" | "admin" | "doctor" | "pharmacist" | "owner" | null;

const roles = [
  { id: "patient", label: "Pasien", icon: User, description: "Booking & rekam medis", color: "bg-primary" },
  { id: "admin", label: "Admin", icon: UserCog, description: "Pendaftaran & antrean", color: "bg-secondary" },
  { id: "doctor", label: "Dokter", icon: Stethoscope, description: "Pemeriksaan pasien", color: "bg-info" },
  { id: "pharmacist", label: "Apoteker", icon: Pill, description: "Kelola obat & resep", color: "bg-success" },
  { id: "owner", label: "Pemilik", icon: Briefcase, description: "Laporan & analitik", color: "bg-warning" },
];

const Auth = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [selectedRole, setSelectedRole] = useState<UserRole>(null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedRole) {
      toast.error("Silakan pilih role terlebih dahulu");
      return;
    }
    
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      toast.success("Login berhasil!");
      localStorage.setItem("userRole", selectedRole);
      
      // Navigate to appropriate dashboard based on role
      const dashboardRoutes = {
        patient: "/patient/dashboard",
        admin: "/admin/dashboard",
        doctor: "/doctor/dashboard",
        pharmacist: "/pharmacist/dashboard",
        owner: "/owner/dashboard",
      };
      
      navigate(dashboardRoutes[selectedRole]);
    }, 1500);
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      toast.success("Registrasi berhasil! Silakan login.");
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gradient-medical-soft flex flex-col p-6">
      <Button
        variant="ghost"
        onClick={() => {
          if (selectedRole) {
            setSelectedRole(null);
          } else {
            navigate("/");
          }
        }}
        className="self-start mb-4"
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Kembali
      </Button>

      <div className="flex-1 flex items-center justify-center">
        <Card className="w-full max-w-md shadow-medical">
          <CardHeader className="text-center">
            <div className="flex justify-center mb-4">
              <div className="bg-gradient-medical p-3 rounded-full">
                <Heart className="w-8 h-8 text-white fill-white" />
              </div>
            </div>
            <CardTitle className="text-2xl">Klinik Sentosa</CardTitle>
            <CardDescription>
              {!selectedRole 
                ? "Pilih role untuk melanjutkan" 
                : "Masuk atau daftar untuk melanjutkan"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {!selectedRole ? (
              <div className="space-y-3">
                <p className="text-sm text-muted-foreground text-center mb-4">
                  Pilih role sesuai dengan akses Anda
                </p>
                {roles.map((role) => (
                  <Card
                    key={role.id}
                    className="cursor-pointer hover:shadow-md transition-all hover:border-primary"
                    onClick={() => setSelectedRole(role.id as UserRole)}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-center gap-4">
                        <div className={`${role.color} p-3 rounded-xl`}>
                          <role.icon className="w-6 h-6 text-white" />
                        </div>
                        <div className="flex-1">
                          <p className="font-semibold">{role.label}</p>
                          <p className="text-sm text-muted-foreground">{role.description}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <>
                <div className="mb-4 p-3 bg-muted rounded-lg flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    {(() => {
                      const role = roles.find(r => r.id === selectedRole);
                      const Icon = role?.icon || User;
                      return (
                        <>
                          <div className={`${role?.color} p-2 rounded-lg`}>
                            <Icon className="w-5 h-5 text-white" />
                          </div>
                          <div>
                            <p className="text-sm text-muted-foreground">Login sebagai</p>
                            <p className="font-semibold">{role?.label}</p>
                          </div>
                        </>
                      );
                    })()}
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setSelectedRole(null)}
                  >
                    Ubah
                  </Button>
                </div>
                
                <Tabs defaultValue="login" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="login">Masuk</TabsTrigger>
                <TabsTrigger value="register">Daftar</TabsTrigger>
              </TabsList>
              
              <TabsContent value="login">
                <form onSubmit={handleLogin} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="nama@email.com"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <Input
                      id="password"
                      type="password"
                      placeholder="••••••••"
                      required
                    />
                  </div>
                  <Button
                    type="submit"
                    className="w-full bg-primary"
                    disabled={isLoading}
                  >
                    {isLoading ? "Memproses..." : "Masuk"}
                  </Button>
                </form>
              </TabsContent>
              
              <TabsContent value="register">
                <form onSubmit={handleRegister} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Nama Lengkap</Label>
                    <Input
                      id="name"
                      type="text"
                      placeholder="John Doe"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email-register">Email</Label>
                    <Input
                      id="email-register"
                      type="email"
                      placeholder="nama@email.com"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">No. Telepon</Label>
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="08123456789"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="password-register">Password</Label>
                    <Input
                      id="password-register"
                      type="password"
                      placeholder="••••••••"
                      required
                    />
                  </div>
                  <Button
                    type="submit"
                    className="w-full bg-primary"
                    disabled={isLoading}
                  >
                    {isLoading ? "Memproses..." : "Daftar"}
                  </Button>
                </form>
              </TabsContent>
            </Tabs>
              </>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Auth;
