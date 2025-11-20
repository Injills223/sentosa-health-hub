import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, User, Plus } from "lucide-react";

const PatientProfiles = () => {
  const navigate = useNavigate();

  const profiles = [
    { id: "1", name: "John Doe", relation: "Saya", age: "35 tahun" },
    { id: "2", name: "Jane Doe", relation: "Istri", age: "32 tahun" },
    { id: "3", name: "Jimmy Doe", relation: "Anak", age: "8 tahun" }
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
        <h1 className="text-2xl font-bold text-white">Multi Profil</h1>
        <p className="text-white/90">Kelola profil anggota keluarga</p>
      </div>

      <div className="p-6 space-y-4">
        {profiles.map((profile) => (
          <Card key={profile.id} className="shadow-card">
            <CardContent className="p-4">
              <div className="flex items-center gap-4">
                <div className="bg-primary/10 p-3 rounded-full">
                  <User className="w-6 h-6 text-primary" />
                </div>
                <div className="flex-1">
                  <p className="font-semibold">{profile.name}</p>
                  <p className="text-sm text-muted-foreground">{profile.relation} • {profile.age}</p>
                </div>
                <Button variant="ghost" size="sm">Detail</Button>
              </div>
            </CardContent>
          </Card>
        ))}

        <Button className="w-full bg-gradient-medical text-white shadow-medical" size="lg">
          <Plus className="w-5 h-5 mr-2" />
          Tambah Profil Baru
        </Button>
      </div>
    </div>
  );
};

export default PatientProfiles;
