import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, User, UserPlus, Stethoscope, Pill, Building } from "lucide-react";
import { toast } from "sonner";
import { useAuth } from "@/hooks/useAuth";

type UserRole = "patient" | "admin" | "doctor" | "pharmacist" | "owner";

interface Role {
  id: UserRole;
  label: string;
  icon: any;
  description: string;
  color: string;
}

const roles: Role[] = [
  { id: "patient", label: "Pasien", icon: User, description: "Daftar dan booking layanan kesehatan", color: "bg-primary" },
  { id: "admin", label: "Petugas Administrasi", icon: UserPlus, description: "Kelola pendaftaran dan data pasien", color: "bg-secondary" },
  { id: "doctor", label: "Dokter", icon: Stethoscope, description: "Akses rekam medis dan pemeriksaan", color: "bg-info" },
  { id: "pharmacist", label: "Apoteker", icon: Pill, description: "Kelola resep dan stok obat", color: "bg-success" },
  { id: "owner", label: "Pemilik Klinik", icon: Building, description: "Lihat laporan dan analitik", color: "bg-warning" },
];

const Auth = () => {
  const navigate = useNavigate();
  const { user, role, loading, signIn, signUp } = useAuth();
  const [selectedRole, setSelectedRole] = useState<UserRole | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Redirect if already logged in
  useEffect(() => {
    if (!loading && user && role) {
      const roleDashboard = {
        patient: "/patient/dashboard",
        admin: "/admin/dashboard",
        doctor: "/doctor/dashboard",
        pharmacist: "/pharmacist/dashboard",
        owner: "/owner/dashboard",
      };
      navigate(roleDashboard[role]);
    }
  }, [user, role, loading, navigate]);

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    try {
      const { error } = await signIn(email, password);

      if (error) {
        toast.error(error.message || "Login gagal. Periksa email dan password Anda.");
      } else {
        toast.success("Login berhasil!");
        // Navigation will be handled by useEffect
      }
    } catch (error: any) {
      toast.error(error.message || "Terjadi kesalahan saat login");
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!selectedRole) {
      toast.error("Silakan pilih role terlebih dahulu");
      return;
    }

    setIsLoading(true);

    const formData = new FormData(e.currentTarget);
    const fullName = formData.get("fullName") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    try {
      const { error } = await signUp(email, password, fullName, selectedRole);

      if (error) {
        toast.error(error.message || "Registrasi gagal");
      } else {
        toast.success("Registrasi berhasil! Silakan login.");
      }
    } catch (error: any) {
      toast.error(error.message || "Terjadi kesalahan saat registrasi");
    } finally {
      setIsLoading(false);
    }
  };

  const handleBack = () => {
    if (selectedRole) {
      setSelectedRole(null);
    } else {
      navigate("/onboarding");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-medical-soft">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-medical-soft p-6">
      <Button
        variant="ghost"
        onClick={handleBack}
        className="mb-6"
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Kembali
      </Button>

      {!selectedRole ? (
        <div className="max-w-2xl mx-auto space-y-4">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-2">Pilih Role Anda</h1>
            <p className="text-muted-foreground">Pilih peran yang sesuai untuk melanjutkan</p>
          </div>

          {roles.map((role) => (
            <Card
              key={role.id}
              className="cursor-pointer hover:shadow-lg transition-shadow"
              onClick={() => setSelectedRole(role.id)}
            >
              <CardContent className="flex items-center gap-4 p-6">
                <div className={`${role.color} p-4 rounded-2xl`}>
                  <role.icon className="w-8 h-8 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold">{role.label}</h3>
                  <p className="text-sm text-muted-foreground">{role.description}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <Card className="max-w-md mx-auto">
          <CardHeader>
            <div className="flex items-center gap-3 mb-2">
              <div className={`${roles.find(r => r.id === selectedRole)?.color} p-3 rounded-xl`}>
                {roles.find(r => r.id === selectedRole)?.icon && 
                  (() => {
                    const Icon = roles.find(r => r.id === selectedRole)!.icon;
                    return <Icon className="w-6 h-6 text-white" />;
                  })()
                }
              </div>
              <div>
                <CardTitle>{roles.find(r => r.id === selectedRole)?.label}</CardTitle>
                <CardDescription>Login atau daftar akun baru</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="login" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="login">Login</TabsTrigger>
                <TabsTrigger value="register">Daftar</TabsTrigger>
              </TabsList>

              <TabsContent value="login">
                <form onSubmit={handleLogin} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="nama@email.com"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <Input
                      id="password"
                      name="password"
                      type="password"
                      placeholder="••••••••"
                      required
                    />
                  </div>
                  <Button
                    type="submit"
                    className="w-full"
                    disabled={isLoading}
                  >
                    {isLoading ? "Loading..." : "Login"}
                  </Button>
                </form>
              </TabsContent>

              <TabsContent value="register">
                <form onSubmit={handleRegister} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="fullName">Nama Lengkap</Label>
                    <Input
                      id="fullName"
                      name="fullName"
                      type="text"
                      placeholder="John Doe"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="register-email">Email</Label>
                    <Input
                      id="register-email"
                      name="email"
                      type="email"
                      placeholder="nama@email.com"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="register-password">Password</Label>
                    <Input
                      id="register-password"
                      name="password"
                      type="password"
                      placeholder="••••••••"
                      required
                      minLength={6}
                    />
                  </div>
                  <Button
                    type="submit"
                    className="w-full"
                    disabled={isLoading}
                  >
                    {isLoading ? "Loading..." : "Daftar"}
                  </Button>
                </form>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default Auth;
