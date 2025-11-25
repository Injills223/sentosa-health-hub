import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, CheckCircle, User, Calendar, Pill } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface PrescriptionItem {
  medicine_name: string;
  dosage: string;
  quantity: number;
  instructions: string;
}

interface PrescriptionData {
  prescription_number: string;
  patient_name: string;
  doctor_name: string;
  diagnosis: string;
  status: string;
  created_at: string;
  items: PrescriptionItem[];
}

const PrescriptionDetail = () => {
  const navigate = useNavigate();
  const { prescriptionId } = useParams();
  const { toast } = useToast();

  const [prescription, setPrescription] = useState<PrescriptionData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    fetchPrescription();
  }, [prescriptionId]);

  const fetchPrescription = async () => {
    try {
      const { data: prescriptionData, error: prescriptionError } = await supabase
        .from("prescriptions")
        .select(`
          *,
          patients (name),
          diagnoses (diagnosis)
        `)
        .eq("prescription_number", prescriptionId)
        .single();

      if (prescriptionError) throw prescriptionError;

      const { data: itemsData, error: itemsError } = await supabase
        .from("prescription_items")
        .select("*")
        .eq("prescription_id", prescriptionData.id);

      if (itemsError) throw itemsError;

      setPrescription({
        prescription_number: prescriptionData.prescription_number,
        patient_name: prescriptionData.patients?.name || "Unknown",
        doctor_name: prescriptionData.doctor_name,
        diagnosis: prescriptionData.diagnoses?.diagnosis || "No diagnosis",
        status: prescriptionData.status,
        created_at: prescriptionData.created_at,
        items: itemsData || [],
      });
    } catch (error) {
      console.error("Error fetching prescription:", error);
      toast({
        title: "Error",
        description: "Gagal memuat data resep",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleProcess = async () => {
    setIsProcessing(true);
    try {
      const { error } = await supabase
        .from("prescriptions")
        .update({ status: "ready" })
        .eq("prescription_number", prescriptionId);

      if (error) throw error;

      toast({
        title: "Berhasil",
        description: "Resep sudah siap diambil",
      });

      navigate("/pharmacist/dashboard");
    } catch (error) {
      console.error("Error processing prescription:", error);
      toast({
        title: "Error",
        description: "Gagal memproses resep",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-medical-soft p-6 flex items-center justify-center">
        <p className="text-muted-foreground">Memuat data...</p>
      </div>
    );
  }

  if (!prescription) {
    return (
      <div className="min-h-screen bg-gradient-medical-soft p-6">
        <Button variant="ghost" onClick={() => navigate("/pharmacist/dashboard")}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          Kembali
        </Button>
        <div className="mt-8 text-center">
          <p className="text-muted-foreground">Resep tidak ditemukan</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-medical-soft p-6 pb-20">
      <Button
        variant="ghost"
        onClick={() => navigate("/pharmacist/dashboard")}
        className="mb-4"
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Kembali
      </Button>

      <div className="max-w-4xl mx-auto space-y-6">
        <Card className="shadow-card">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Detail Resep</CardTitle>
                <p className="text-sm text-muted-foreground mt-1">
                  {prescription.prescription_number}
                </p>
              </div>
              <Badge
                variant={
                  prescription.status === "ready"
                    ? "default"
                    : prescription.status === "preparing"
                    ? "secondary"
                    : "outline"
                }
              >
                {prescription.status === "ready"
                  ? "Siap Diambil"
                  : prescription.status === "preparing"
                  ? "Sedang Diproses"
                  : "Menunggu"}
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-2 text-sm">
              <User className="w-4 h-4 text-muted-foreground" />
              <span className="font-medium">Pasien:</span>
              <span>{prescription.patient_name}</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <User className="w-4 h-4 text-muted-foreground" />
              <span className="font-medium">Dokter:</span>
              <span>{prescription.doctor_name}</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Calendar className="w-4 h-4 text-muted-foreground" />
              <span className="font-medium">Tanggal:</span>
              <span>{new Date(prescription.created_at).toLocaleDateString("id-ID")}</span>
            </div>
            <div className="p-4 bg-muted rounded-lg">
              <p className="text-sm font-medium mb-1">Diagnosis:</p>
              <p className="text-sm text-muted-foreground">{prescription.diagnosis}</p>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-card">
          <CardHeader>
            <div className="flex items-center gap-2">
              <Pill className="w-5 h-5 text-primary" />
              <CardTitle>Daftar Obat</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            {prescription.items.length === 0 ? (
              <p className="text-center text-muted-foreground py-4">
                Tidak ada obat dalam resep
              </p>
            ) : (
              prescription.items.map((item, index) => (
                <div
                  key={index}
                  className="p-4 rounded-lg border bg-card hover:bg-muted transition-colors"
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      <p className="font-semibold">{item.medicine_name}</p>
                      <p className="text-sm text-muted-foreground">{item.dosage}</p>
                    </div>
                    <Badge variant="secondary">{item.quantity}x</Badge>
                  </div>
                  {item.instructions && (
                    <div className="mt-2 p-2 bg-primary/5 rounded">
                      <p className="text-xs font-medium text-primary">
                        Aturan Pakai: {item.instructions}
                      </p>
                    </div>
                  )}
                </div>
              ))
            )}
          </CardContent>
        </Card>

        {prescription.status === "pending" && (
          <Button
            onClick={handleProcess}
            className="w-full"
            size="lg"
            disabled={isProcessing}
          >
            <CheckCircle className="w-4 h-4 mr-2" />
            {isProcessing ? "Memproses..." : "Tandai Siap Diambil"}
          </Button>
        )}
      </div>
    </div>
  );
};

export default PrescriptionDetail;
