import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft } from "lucide-react";
import { toast } from "sonner";

const AdminRegisterPatient = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    setTimeout(() => {
      setIsLoading(false);
      toast.success("Pasien berhasil didaftarkan! Nomor RM: RM-2025-001");
      navigate("/admin/dashboard");
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gradient-medical-soft pb-20">
      <div className="bg-gradient-medical p-6 rounded-b-3xl shadow-medical mb-6">
        <Button
          variant="ghost"
          onClick={() => navigate("/admin/dashboard")}
          className="text-white hover:bg-white/20 mb-4"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Kembali
        </Button>
        <h1 className="text-2xl font-bold text-white">Pendaftaran Pasien Baru</h1>
        <p className="text-white/90">Isi data pasien dengan lengkap</p>
      </div>

      <div className="p-6">
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle>Data Pasien</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Nama Lengkap *</Label>
                <Input id="name" placeholder="Masukkan nama lengkap" required />
              </div>

              <div className="space-y-2">
                <Label htmlFor="nik">NIK *</Label>
                <Input id="nik" placeholder="16 digit NIK" required />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="dob">Tanggal Lahir *</Label>
                  <Input id="dob" type="date" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="gender">Jenis Kelamin *</Label>
                  <select id="gender" className="w-full px-3 py-2 rounded-md border" required>
                    <option value="">Pilih</option>
                    <option value="L">Laki-laki</option>
                    <option value="P">Perempuan</option>
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">No. Telepon *</Label>
                <Input id="phone" type="tel" placeholder="08xxx" required />
              </div>

              <div className="space-y-2">
                <Label htmlFor="address">Alamat *</Label>
                <Textarea id="address" placeholder="Alamat lengkap" required />
              </div>

              <div className="space-y-2">
                <Label htmlFor="allergies">Riwayat Alergi</Label>
                <Textarea id="allergies" placeholder="Contoh: Alergi obat penisilin" />
              </div>

              <Button 
                type="submit" 
                className="w-full bg-gradient-medical text-white shadow-medical"
                disabled={isLoading}
              >
                {isLoading ? "Memproses..." : "Daftar Pasien"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminRegisterPatient;
