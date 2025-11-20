import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, BookOpen, Clock } from "lucide-react";

const PatientArticles = () => {
  const navigate = useNavigate();

  const articles = [
    {
      title: "Tips Menjaga Kesehatan di Musim Hujan",
      category: "Kesehatan Umum",
      readTime: "5 menit",
      excerpt: "Musim hujan sering membawa berbagai penyakit. Pelajari cara menjaga kesehatan Anda..."
    },
    {
      title: "Pentingnya Vaksinasi untuk Keluarga",
      category: "Pencegahan",
      readTime: "7 menit",
      excerpt: "Vaksinasi adalah investasi kesehatan jangka panjang untuk seluruh keluarga..."
    },
    {
      title: "Pola Makan Sehat untuk Anak",
      category: "Nutrisi",
      readTime: "6 menit",
      excerpt: "Nutrisi yang tepat sangat penting untuk pertumbuhan dan perkembangan anak..."
    },
    {
      title: "Mengenal Gejala Awal Diabetes",
      category: "Penyakit Kronis",
      readTime: "8 menit",
      excerpt: "Deteksi dini diabetes dapat membantu penanganan yang lebih efektif..."
    }
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
        <h1 className="text-2xl font-bold text-white">Artikel Kesehatan</h1>
        <p className="text-white/90">Informasi kesehatan terpercaya</p>
      </div>

      <div className="p-6 space-y-4">
        {articles.map((article, index) => (
          <Card key={index} className="shadow-card cursor-pointer hover:shadow-md transition-shadow">
            <CardContent className="p-4">
              <div className="flex gap-3">
                <div className="bg-info/10 p-3 rounded-lg h-fit">
                  <BookOpen className="w-6 h-6 text-info" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold mb-1">{article.title}</h3>
                  <p className="text-sm text-muted-foreground mb-2">{article.excerpt}</p>
                  <div className="flex items-center gap-3 text-xs text-muted-foreground">
                    <span className="bg-muted px-2 py-1 rounded">{article.category}</span>
                    <div className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      <span>{article.readTime}</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default PatientArticles;
