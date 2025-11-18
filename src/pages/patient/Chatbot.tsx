import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, Send, Bot, User } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";

interface Message {
  id: string;
  text: string;
  sender: "user" | "bot";
  timestamp: Date;
}

const PatientChatbot = () => {
  const navigate = useNavigate();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "Halo! Saya asisten virtual Klinik Sentosa. Ada yang bisa saya bantu?",
      sender: "bot",
      timestamp: new Date(),
    },
  ]);
  const [inputMessage, setInputMessage] = useState("");

  const quickQuestions = [
    "Bagaimana cara booking kunjungan?",
    "Jam operasional klinik",
    "Cara melihat rekam medis",
    "Info dokter yang tersedia",
  ];

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputMessage,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputMessage("");

    // Simulate bot response
    setTimeout(() => {
      let botResponse = "";
      
      if (inputMessage.toLowerCase().includes("booking") || inputMessage.toLowerCase().includes("kunjungan")) {
        botResponse = "Untuk booking kunjungan, Anda bisa klik menu 'Booking Kunjungan' di halaman utama. Pilih tanggal, dokter, dan waktu yang Anda inginkan. Sangat mudah!";
      } else if (inputMessage.toLowerCase().includes("jam") || inputMessage.toLowerCase().includes("operasional")) {
        botResponse = "Klinik Sentosa buka setiap hari Senin - Sabtu, pukul 08:00 - 17:00 WIB. Kami tutup pada hari Minggu dan libur nasional.";
      } else if (inputMessage.toLowerCase().includes("rekam medis")) {
        botResponse = "Anda bisa melihat rekam medis dengan mengklik menu 'Rekam Medis' di halaman utama atau di menu navigasi bawah. Di sana tersedia riwayat lengkap pemeriksaan Anda.";
      } else {
        botResponse = "Terima kasih atas pertanyaan Anda. Untuk informasi lebih lanjut, silakan hubungi customer service kami atau datang langsung ke klinik. Ada yang bisa saya bantu lagi?";
      }

      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: botResponse,
        sender: "bot",
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, botMessage]);
    }, 1000);
  };

  const handleQuickQuestion = (question: string) => {
    setInputMessage(question);
  };

  return (
    <div className="min-h-screen bg-gradient-medical-soft flex flex-col">
      <div className="bg-gradient-medical p-6 rounded-b-3xl shadow-medical">
        <Button
          variant="ghost"
          onClick={() => navigate("/patient/dashboard")}
          className="text-white hover:bg-white/20 mb-4"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Kembali
        </Button>
        <div className="flex items-center gap-3">
          <div className="bg-white/20 p-3 rounded-full">
            <Bot className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-white">Asisten Virtual</h1>
            <p className="text-white/90 text-sm">Online</p>
          </div>
        </div>
      </div>

      <ScrollArea className="flex-1 p-6 pb-32">
        <div className="space-y-4 max-w-2xl mx-auto">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex items-start gap-3 ${
                message.sender === "user" ? "flex-row-reverse" : ""
              }`}
            >
              <div
                className={`p-2 rounded-full ${
                  message.sender === "user"
                    ? "bg-primary"
                    : "bg-secondary"
                }`}
              >
                {message.sender === "user" ? (
                  <User className="w-4 h-4 text-white" />
                ) : (
                  <Bot className="w-4 h-4 text-white" />
                )}
              </div>
              <Card
                className={`max-w-[80%] ${
                  message.sender === "user"
                    ? "bg-primary text-primary-foreground"
                    : "bg-card"
                }`}
              >
                <CardContent className="p-3">
                  <p className="text-sm">{message.text}</p>
                  <p
                    className={`text-xs mt-1 ${
                      message.sender === "user"
                        ? "text-primary-foreground/70"
                        : "text-muted-foreground"
                    }`}
                  >
                    {message.timestamp.toLocaleTimeString("id-ID", {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </ScrollArea>

      <div className="fixed bottom-0 left-0 right-0 bg-card border-t p-4">
        <div className="max-w-2xl mx-auto space-y-3">
          <div className="flex flex-wrap gap-2">
            {quickQuestions.map((question, index) => (
              <Button
                key={index}
                variant="outline"
                size="sm"
                onClick={() => handleQuickQuestion(question)}
                className="text-xs"
              >
                {question}
              </Button>
            ))}
          </div>
          <div className="flex gap-2">
            <Input
              placeholder="Ketik pertanyaan Anda..."
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
            />
            <Button onClick={handleSendMessage} size="icon" className="bg-primary">
              <Send className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientChatbot;
