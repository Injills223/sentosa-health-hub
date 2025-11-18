import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Heart, Activity } from "lucide-react";

const Splash = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      const hasSeenOnboarding = localStorage.getItem("hasSeenOnboarding");
      if (hasSeenOnboarding) {
        navigate("/auth");
      } else {
        navigate("/onboarding");
      }
    }, 2500);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gradient-medical flex flex-col items-center justify-center p-6">
      <div className="animate-pulse">
        <div className="relative">
          <Heart className="w-24 h-24 text-white fill-white" />
          <Activity className="w-12 h-12 text-white absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
        </div>
      </div>
      <h1 className="text-4xl font-bold text-white mt-8 mb-2">Klinik Sentosa</h1>
      <p className="text-white/90 text-lg">Kesehatan Anda, Prioritas Kami</p>
    </div>
  );
};

export default Splash;
