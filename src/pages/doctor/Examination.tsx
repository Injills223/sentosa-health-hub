import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Plus, X, Send } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface MedicineItem {
  medicine_name: string;
  dosage: string;
  quantity: number;
  instructions: string;
}

const Examination = () => {
  const navigate = useNavigate();
  const { patientId } = useParams();
  const { toast } = useToast();

  const [diagnosis, setDiagnosis] = useState("");
  const [symptoms, setSymptoms] = useState("");
  const [notes, setNotes] = useState("");
  const [medicines, setMedicines] = useState<MedicineItem[]>([]);
  const [currentMedicine, setCurrentMedicine] = useState<MedicineItem>({
    medicine_name: "",
    dosage: "",
    quantity: 1,
    instructions: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Mock patient data (in real app, fetch from database)
  const patientData = {
    queue_number: patientId || "A-025",
    name: "Jane Smith",
    age: 28,
    complaint: "Pemeriksaan rutin",
  };

  const addMedicine = () => {
    if (!currentMedicine.medicine_name || !currentMedicine.dosage) {
      toast({
        title: "Error",
        description: "Nama obat dan dosis harus diisi",
        variant: "destructive",
      });
      return;
    }

    setMedicines([...medicines, currentMedicine]);
    setCurrentMedicine({
      medicine_name: "",
      dosage: "",
      quantity: 1,
      instructions: "",
    });
  };

  const removeMedicine = (index: number) => {
    setMedicines(medicines.filter((_, i) => i !== index));
  };

  const handleSubmit = async () => {
    if (!diagnosis) {
      toast({
        title: "Error",
        description: "Diagnosis harus diisi",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      // Create patient record
      const { data: patientRecord, error: patientError } = await supabase
        .from("patients")
        .insert({
          queue_number: patientData.queue_number,
          name: patientData.name,
          age: patientData.age,
          complaint: patientData.complaint,
          status: "examined",
        })
        .select()
        .single();

      if (patientError) throw patientError;

      // Create diagnosis
      const { data: diagnosisRecord, error: diagnosisError } = await supabase
        .from("diagnoses")
        .insert({
          patient_id: patientRecord.id,
          doctor_id: "doctor-id", // In real app, get from auth
          doctor_name: "Dr. Amanda Wijaya",
          diagnosis,
          symptoms,
          notes,
        })
        .select()
        .single();

      if (diagnosisError) throw diagnosisError;

      // Create prescription if medicines exist
      if (medicines.length > 0) {
        const prescriptionNumber = `R-${Date.now().toString().slice(-6)}`;

        const { data: prescriptionRecord, error: prescriptionError } = await supabase
          .from("prescriptions")
          .insert({
            prescription_number: prescriptionNumber,
            diagnosis_id: diagnosisRecord.id,
            patient_id: patientRecord.id,
            doctor_id: "doctor-id",
            doctor_name: "Dr. Amanda Wijaya",
            status: "pending",
          })
          .select()
          .single();

        if (prescriptionError) throw prescriptionError;

        // Insert prescription items
        const prescriptionItems = medicines.map((med) => ({
          prescription_id: prescriptionRecord.id,
          ...med,
        }));

        const { error: itemsError } = await supabase
          .from("prescription_items")
          .insert(prescriptionItems);

        if (itemsError) throw itemsError;
      }

      toast({
        title: "Berhasil",
        description: "Diagnosis dan resep telah dikirim ke apotek",
      });

      navigate("/doctor/dashboard");
    } catch (error) {
      console.error("Error submitting examination:", error);
      toast({
        title: "Error",
        description: "Gagal menyimpan data pemeriksaan",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-medical-soft p-6 pb-20">
      <Button
        variant="ghost"
        onClick={() => navigate("/doctor/dashboard")}
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
                <CardTitle>Pemeriksaan Pasien</CardTitle>
                <p className="text-sm text-muted-foreground mt-1">
                  {patientData.queue_number} - {patientData.name}
                </p>
              </div>
              <Badge variant="outline">Usia: {patientData.age} tahun</Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="p-4 bg-muted rounded-lg">
              <p className="text-sm font-medium">Keluhan:</p>
              <p className="text-muted-foreground">{patientData.complaint}</p>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-card">
          <CardHeader>
            <CardTitle>Diagnosis</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="symptoms">Gejala</Label>
              <Textarea
                id="symptoms"
                placeholder="Tuliskan gejala yang ditemukan..."
                value={symptoms}
                onChange={(e) => setSymptoms(e.target.value)}
                rows={3}
              />
            </div>
            <div>
              <Label htmlFor="diagnosis">Diagnosis *</Label>
              <Textarea
                id="diagnosis"
                placeholder="Tuliskan diagnosis..."
                value={diagnosis}
                onChange={(e) => setDiagnosis(e.target.value)}
                rows={3}
                required
              />
            </div>
            <div>
              <Label htmlFor="notes">Catatan</Label>
              <Textarea
                id="notes"
                placeholder="Catatan tambahan..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                rows={2}
              />
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-card">
          <CardHeader>
            <CardTitle>Resep Obat</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {medicines.length > 0 && (
              <div className="space-y-2 mb-4">
                {medicines.map((med, index) => (
                  <div
                    key={index}
                    className="p-3 bg-muted rounded-lg flex items-start justify-between"
                  >
                    <div className="flex-1">
                      <p className="font-medium">{med.medicine_name}</p>
                      <p className="text-sm text-muted-foreground">
                        {med.dosage} - {med.quantity} item
                      </p>
                      {med.instructions && (
                        <p className="text-xs text-muted-foreground mt-1">
                          {med.instructions}
                        </p>
                      )}
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeMedicine(index)}
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
              </div>
            )}

            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label htmlFor="medicine_name">Nama Obat</Label>
                <Input
                  id="medicine_name"
                  placeholder="Nama obat"
                  value={currentMedicine.medicine_name}
                  onChange={(e) =>
                    setCurrentMedicine({
                      ...currentMedicine,
                      medicine_name: e.target.value,
                    })
                  }
                />
              </div>
              <div>
                <Label htmlFor="dosage">Dosis</Label>
                <Input
                  id="dosage"
                  placeholder="Contoh: 500mg"
                  value={currentMedicine.dosage}
                  onChange={(e) =>
                    setCurrentMedicine({
                      ...currentMedicine,
                      dosage: e.target.value,
                    })
                  }
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label htmlFor="quantity">Jumlah</Label>
                <Input
                  id="quantity"
                  type="number"
                  min="1"
                  value={currentMedicine.quantity}
                  onChange={(e) =>
                    setCurrentMedicine({
                      ...currentMedicine,
                      quantity: parseInt(e.target.value) || 1,
                    })
                  }
                />
              </div>
              <div>
                <Label htmlFor="instructions">Aturan Pakai</Label>
                <Input
                  id="instructions"
                  placeholder="Contoh: 3x sehari"
                  value={currentMedicine.instructions}
                  onChange={(e) =>
                    setCurrentMedicine({
                      ...currentMedicine,
                      instructions: e.target.value,
                    })
                  }
                />
              </div>
            </div>
            <Button onClick={addMedicine} variant="outline" className="w-full">
              <Plus className="w-4 h-4 mr-2" />
              Tambah Obat
            </Button>
          </CardContent>
        </Card>

        <Button
          onClick={handleSubmit}
          className="w-full"
          size="lg"
          disabled={isSubmitting}
        >
          <Send className="w-4 h-4 mr-2" />
          {isSubmitting ? "Mengirim..." : "Kirim ke Apotek"}
        </Button>
      </div>
    </div>
  );
};

export default Examination;
