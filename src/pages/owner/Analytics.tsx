import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, BarChart3 } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Analytics = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-medical-soft p-6">
      <Button
        variant="ghost"
        onClick={() => navigate("/owner/dashboard")}
        className="mb-4"
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Kembali
      </Button>

      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-3 mb-6">
          <div className="bg-gradient-medical p-3 rounded-full">
            <BarChart3 className="w-6 h-6 text-white" />
          </div>
          <h1 className="text-2xl font-bold">Analitik</h1>
        </div>

        <Card>
          <CardContent className="p-8 text-center">
            <p className="text-muted-foreground">Fitur analitik akan segera hadir</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Analytics;
