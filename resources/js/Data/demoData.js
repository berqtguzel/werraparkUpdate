// resources/js/Data/demoData.js
const demoTeam = [
  {
    name: "Sezai Koc",
    title: "Leitender Direktor - Werrapark Resorts Hotel",
    email: "sezai.koc@werrapark.de",
    avatar: "/images/Teams/sezaikoc.png",
    handle: "sezai.koc",                 // e-postadan farklı görünmesini isterseniz
    status: "online",                    // ProfileCard'da alt bilgi
    contactText: "E-Mail",               // buton metni
    accent: "#10b981",                   // kişisel accent (yeşil)
    // İsterseniz kart özel gradyanları:
    behindGradient:
      "linear-gradient(135deg,#10b981 0%, #34d399 35%, #6ee7b7 70%, #ecfeff 100%)",
    innerGradient:
      "radial-gradient(120% 120% at 15% 10%, #10b98122 0%,transparent 46%),\
       radial-gradient(120% 120% at 85% 15%, #34d39922 0%,transparent 52%),\
       radial-gradient(110% 120% at 50% 120%, #6ee7b722 0%,transparent 56%)",
  },
  {
    name: "Christian Steinitz",
    title: "Hotelleiter",
    email: "info@werrapark.de",
    avatar: "/images/Teams/christian.png",
    handle: "werrapark",                 // info@ yerine marka handle
    status: "online",
    contactText: "E-Mail",
    accent: "#22c55e",
  },
  {
    name: "Christian Koch",
    title:
      "Verantwortlich für Buchungen\nWerrapark Resorts Sommerberg Hotel",
    email: "info@werrapark-sommerberg.de",
    avatar: "/images/Teams/christiankoch.png",
    handle: "werrapark-sommerberg",
    status: "online",
    contactText: "E-Mail",
    accent: "#16a34a",
  },
  {
    name: "Claudia Rosendahl",
    title:
      "Verantwortlich für Buchungen\nWerrapark Resorts Heubacher Höhe Hotel",
    email: "empfang-heubach@werrapark.de",
    avatar: "/images/Teams/claudia.png",
    handle: "empfang-heubach",
    status: "online",
    contactText: "E-Mail",
    accent: "#14b8a6",                  // biraz turkuaz
  },
];

export default demoTeam;
