const STORAGE_KEY = "ts-service-language";
const SUPPORTED_LANGUAGES = ["pt", "ja"];

function getSavedLanguage() {
  try {
    return localStorage.getItem(STORAGE_KEY);
  } catch {
    return null;
  }
}

function detectLanguage() {
  const savedLanguage = getSavedLanguage();

  if (SUPPORTED_LANGUAGES.includes(savedLanguage)) {
    return savedLanguage;
  }

  const browserLanguage = navigator.language.toLowerCase();

  return browserLanguage.startsWith("ja") ? "ja" : "pt";
}

function saveLanguage(language) {
  try {
    localStorage.setItem(STORAGE_KEY, language);
  } catch {
    // O portal continua funcionando mesmo sem armazenamento local.
  }
}

function applyLanguage(language) {
  const selectedLanguage = SUPPORTED_LANGUAGES.includes(language)
    ? language
    : "pt";

  document.documentElement.lang =
    selectedLanguage === "ja" ? "ja" : "pt-BR";

  document.querySelectorAll("[data-pt][data-ja]").forEach((element) => {
    element.textContent = element.dataset[selectedLanguage];
  });

  document.querySelectorAll("[data-lang-section]").forEach((section) => {
  section.hidden = section.dataset.langSection !== selectedLanguage;
});

  document.querySelectorAll("[data-language]").forEach((button) => {
    const isActive = button.dataset.language === selectedLanguage;

    button.classList.toggle("is-active", isActive);
    button.setAttribute("aria-pressed", String(isActive));
  });

  const pageTitle = document.body.dataset[`title${capitalize(selectedLanguage)}`];

  if (pageTitle) {
    document.title = pageTitle;
  }

  saveLanguage(selectedLanguage);
}

function capitalize(value) {
  return value.charAt(0).toUpperCase() + value.slice(1);
}

function setupConnectionStatus() {
  const banner = document.createElement("div");

  banner.className = "connection-banner";
  banner.setAttribute("role", "status");
  banner.setAttribute("aria-live", "polite");
  banner.dataset.pt =
    "Você está sem conexão. Conecte-se à internet para acessar os formulários.";
  banner.dataset.ja =
    "現在オフラインです。フォームを開くにはインターネットに接続してください。";
  banner.hidden = navigator.onLine;

  document.body.appendChild(banner);

  function updateConnectionStatus() {
    banner.hidden = navigator.onLine;
  }

  window.addEventListener("online", updateConnectionStatus);
  window.addEventListener("offline", updateConnectionStatus);
}

document.addEventListener("DOMContentLoaded", () => {
    setupConnectionStatus();
    
  const initialLanguage = detectLanguage();

  applyLanguage(initialLanguage);

  document.querySelectorAll("[data-language]").forEach((button) => {
    button.addEventListener("click", () => {
      applyLanguage(button.dataset.language);
    });
  });
});