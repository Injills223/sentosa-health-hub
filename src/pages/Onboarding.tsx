import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Calendar, Users, Pill, FileText, ChevronRight } from "lucide-react";

const onboardingSlides = [
  {
    icon: Calendar,
    title: "Daftar Online Mudah",
    description: "Tidak perlu antre lama! Daftarkan diri Anda secara online dan dapatkan nomor antrean langsung dari rumah."
  },
  {
    icon: Users,
    title: "Multi-Profil Keluarga",
    description: "Satu akun untuk seluruh keluarga. Kelola kesehatan semua anggota keluarga dengan mudah dalam satu aplikasi."
  },
  {
    icon: Pill,
    title: "Rekam Medis Digital",
    description: "Akses riwayat kesehatan, resep obat, dan hasil pemeriksaan Anda kapan saja, dimana saja dengan aman."
  },
  {
    icon: FileText,
    title: "Artikel Kesehatan",
    description: "Dapatkan informasi kesehatan terpercaya yang disesuaikan dengan kondisi dan kebutuhan Anda."
  }
];

const Onboarding = () => {
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);

  const handleNext = () => {
    if (currentSlide < onboardingSlides.length - 1) {
      setCurrentSlide(currentSlide + 1);
    } else {
      localStorage.setItem("hasSeenOnboarding", "true");
      navigate("/auth");
    }
  };

  const handleSkip = () => {
    localStorage.setItem("hasSeenOnboarding", "true");
    navigate("/auth");
  };

  const slide = onboardingSlides[currentSlide];
  const Icon = slide.icon;

  return (
    <div className="min-h-screen bg-gradient-medical flex flex-col p-6">
      <div className="flex justify-end mb-8">
        <Button 
          variant="ghost" 
          onClick={handleSkip}
          className="text-white hover:bg-white/20"
        >
          Lewati
        </Button>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center text-center">
        <div className="bg-white/20 backdrop-blur-sm p-8 rounded-3xl mb-8">
          <Icon className="w-24 h-24 text-white mx-auto" />
        </div>

        <h2 className="text-3xl font-bold text-white mb-4 px-4">
          {slide.title}
        </h2>
        <p className="text-white/90 text-lg mb-12 px-6 max-w-md">
          {slide.description}
        </p>

        <div className="flex gap-2 mb-12">
          {onboardingSlides.map((_, index) => (
            <div
              key={index}
              className={`h-2 rounded-full transition-all ${
                index === currentSlide 
                  ? "w-8 bg-white" 
                  : "w-2 bg-white/50"
              }`}
            />
          ))}
        </div>
      </div>

      <Button
        onClick={handleNext}
        size="lg"
        className="w-full bg-white text-primary hover:bg-white/90 shadow-lg"
      >
        {currentSlide < onboardingSlides.length - 1 ? (
          <>
            Lanjut
            <ChevronRight className="ml-2 w-5 h-5" />
          </>
        ) : (
          "Mulai"
        )}
      </Button>
    </div>
  );
};

export default Onboarding;
