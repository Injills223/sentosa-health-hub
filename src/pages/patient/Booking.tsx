import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { ArrowLeft, Clock, User } from "lucide-react";
import { toast } from "sonner";

const timeSlots = [
  "08:00", "08:30", "09:00", "09:30", "10:00", "10:30",
  "11:00", "11:30", "13:00", "13:30", "14:00", "14:30",
  "15:00", "15:30", "16:00", "16:30"
];

const doctors = [
  { id: "1", name: "Dr. Amanda Wijaya", specialty: "Dokter Umum", available: true },
  { id: "2", name: "Dr. Budi Santoso", specialty: "Dokter Umum", available: true },
];

const PatientBooking = () => {
  const navigate = useNavigate();
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [selectedTime, setSelectedTime] = useState("");
  const [selectedDoctor, setSelectedDoctor] = useState("");
  const [selectedProfile, setSelectedProfile] = useState("self");

  const profiles = [
    { id: "self", name: "John Doe (Saya)" },
    { id: "wife", name: "Jane Doe (Istri)" },
    { id: "son", name: "Jimmy Doe (Anak)" },
  ];

  const handleBooking = () => {
    if (!date || !selectedTime || !selectedDoctor) {
      toast.error("Mohon lengkapi semua data");
      return;
    }

    toast.success("Booking berhasil! Nomor antrean Anda: A-045");
    setTimeout(() => {
      navigate("/patient/queue-status");
    }, 1500);
  };

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
        <h1 className="text-2xl font-bold text-white">Booking Kunjungan</h1>
        <p className="text-white/90">Pilih jadwal kunjungan Anda</p>
      </div>

      <div className="p-6 space-y-6">
        {/* Select Profile */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="text-lg">Booking untuk</CardTitle>
          </CardHeader>
          <CardContent>
            <RadioGroup value={selectedProfile} onValueChange={setSelectedProfile}>
              {profiles.map((profile) => (
                <div key={profile.id} className="flex items-center space-x-2 p-3 rounded-lg hover:bg-muted">
                  <RadioGroupItem value={profile.id} id={profile.id} />
                  <Label htmlFor={profile.id} className="flex-1 cursor-pointer">
                    <div className="flex items-center gap-2">
                      <User className="w-4 h-4 text-muted-foreground" />
                      {profile.name}
                    </div>
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </CardContent>
        </Card>

        {/* Select Date */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="text-lg">Pilih Tanggal</CardTitle>
          </CardHeader>
          <CardContent className="flex justify-center">
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              disabled={(date) => date < new Date()}
              className="rounded-md border"
            />
          </CardContent>
        </Card>

        {/* Select Doctor */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="text-lg">Pilih Dokter</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <RadioGroup value={selectedDoctor} onValueChange={setSelectedDoctor}>
              {doctors.map((doctor) => (
                <div key={doctor.id} className="flex items-center space-x-2 p-4 rounded-lg border hover:bg-muted">
                  <RadioGroupItem value={doctor.id} id={doctor.id} />
                  <Label htmlFor={doctor.id} className="flex-1 cursor-pointer">
                    <p className="font-medium">{doctor.name}</p>
                    <p className="text-sm text-muted-foreground">{doctor.specialty}</p>
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </CardContent>
        </Card>

        {/* Select Time */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="text-lg">Pilih Waktu</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-3 gap-2">
              {timeSlots.map((time) => (
                <Button
                  key={time}
                  variant={selectedTime === time ? "default" : "outline"}
                  onClick={() => setSelectedTime(time)}
                  className="h-12"
                >
                  <Clock className="w-4 h-4 mr-1" />
                  {time}
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>

        <Button
          className="w-full bg-gradient-medical text-white shadow-medical"
          size="lg"
          onClick={handleBooking}
        >
          Konfirmasi Booking
        </Button>
      </div>
    </div>
  );
};

export default PatientBooking;
