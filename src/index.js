let dayjs = null;

// Importer la dépendance seulement si on est dans Node.js
if (typeof window === "undefined") {
  dayjs = require("dayjs");
}

function greet(name) {
  const now = (dayjs ? dayjs().format("YYYY-MM-DD HH:mm") : new Date().toLocaleString("fr-FR"));
  return `Bonjour ${name} ! Ce déploiement a été généré le ${now}.`;
}

// Si le script est exécuté dans le navigateur
if (typeof window !== "undefined") {
  const messageElement = document.getElementById("message");
  if (messageElement) {
    messageElement.textContent = greet("étudiant du labo 👩‍💻");
  }
} else {
  // Si exécuté via Node.js (tests ou pipeline)
  console.log(greet("GitHub Actions"));
}

module.exports = { greet };
