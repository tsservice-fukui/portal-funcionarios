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

const installModal = document.getElementById("install-modal");

if (installModal && !installModal.hidden) {
  renderInstallInstructions();
}

function capitalize(value) {
  return value.charAt(0).toUpperCase() + value.slice(1);
}

let deferredInstallPrompt = null;

function isRunningAsInstalledApp() {
  return (
    window.matchMedia("(display-mode: standalone)").matches ||
    window.navigator.standalone === true
  );
}

function getInstallEnvironment() {
  const userAgent = navigator.userAgent;

  return {
    isIOS: /iPhone|iPad|iPod/i.test(userAgent),
    isIOSChrome: /CriOS/i.test(userAgent),
    isInAppBrowser:
      /Line|WhatsApp|Instagram|FBAN|FBAV|Messenger/i.test(userAgent)
  };
}

function getActiveLanguage() {
  return document.documentElement.lang === "ja" ? "ja" : "pt";
}

function renderInstallInstructions() {
  const instructions = document.getElementById("install-instructions");
  const copyButton = document.getElementById("copy-portal-link");
  const environment = getInstallEnvironment();
  const language = getActiveLanguage();

  if (!instructions || !copyButton) {
    return;
  }

  copyButton.hidden = true;

  if (environment.isInAppBrowser) {
    copyButton.hidden = false;

    instructions.innerHTML =
      language === "ja"
        ? `
          <p>
            LINEやWhatsAppなどのアプリ内ブラウザでは、
            インストールできない場合があります。
          </p>
          <ol>
            <li>画面のメニューを開きます。</li>
            <li>
              <strong>Safariで開く</strong>または
              <strong>Chromeで開く</strong>を選択します。
            </li>
            <li>
              選択肢が表示されない場合は、下のボタンでURLをコピーし、
              SafariまたはChromeで開いてください。
            </li>
          </ol>
        `
        : `
          <p>
            Navegadores internos do LINE, WhatsApp ou outros aplicativos
            podem não permitir a instalação.
          </p>
          <ol>
            <li>Abra o menu do aplicativo.</li>
            <li>
              Escolha <strong>Abrir no Safari</strong> ou
              <strong>Abrir no Chrome</strong>.
            </li>
            <li>
              Se essa opção não aparecer, copie o endereço abaixo e abra-o
              manualmente no Safari ou Chrome.
            </li>
          </ol>
        `;

    return;
  }

  if (environment.isIOSChrome) {
    copyButton.hidden = false;

    instructions.innerHTML =
      language === "ja"
        ? `
          <ol>
            <li>Chromeのアドレスバー右側にある<strong>共有</strong>をタップします。</li>
            <li><strong>ホーム画面に追加</strong>を選択します。</li>
            <li>内容を確認し、<strong>追加</strong>をタップします。</li>
          </ol>
          <p>
            「ホーム画面に追加」が表示されない場合は、URLをコピーして
            Safariで開いてください。
          </p>
        `
        : `
          <ol>
            <li>
              No Chrome, toque em <strong>Compartilhar</strong>, à direita
              da barra de endereço.
            </li>
            <li>Escolha <strong>Adicionar à Tela de Início</strong>.</li>
            <li>Confira os dados e toque em <strong>Adicionar</strong>.</li>
          </ol>
          <p>
            Se a opção não aparecer, copie o endereço e abra o portal no Safari.
          </p>
        `;

    return;
  }

  if (environment.isIOS) {
  instructions.innerHTML =
    language === "ja"
      ? `
        <p>Safariのアドレスバーの横にある次のボタンを探してください。</p>

        <div class="safari-menu-guide">
          <span class="safari-menu-example" aria-hidden="true">•••</span>

          <span>
            通常、Safari画面下部のアドレスバーの横にあります。
          </span>
        </div>

        <ol>
          <li><strong>•••</strong>ボタンをタップします。</li>
          <li>表示されたメニューから<strong>共有</strong>を選択します。</li>
          <li>共有メニューの一覧を上にスワイプし、<strong>ホーム画面に追加</strong>が表示されたらタップします。</li>
          <li><strong>Webアプリとして開く</strong>をオンにします。</li>
          <li><strong>追加</strong>をタップします。</li>
        </ol>
      `
      : `
        <p>
          Procure o seguinte botão ao lado da barra de endereço do Safari:
        </p>

        <div class="safari-menu-guide">
          <span class="safari-menu-example" aria-hidden="true">•••</span>

          <span>
            Normalmente ele fica ao lado da barra de endereço, na parte
            inferior da tela do Safari.
          </span>
        </div>

        <ol>
          <li>Toque no botão <strong>•••</strong>.</li>
          <li>No menu exibido, toque em <strong>Compartilhar</strong>.</li>
          <li>  Na lista de opções, deslize a tela para cima até encontrar  <strong>Adicionar à Tela de Início</strong> e toque nessa opção.
</li>
          <li>Ative <strong>Abrir como App da Web</strong>.</li>
          <li>Toque em <strong>Adicionar</strong>.</li>
        </ol>
      `;

  return;
}

  instructions.innerHTML =
    language === "ja"
      ? `
        <p>
          ブラウザのメニューを開き、
          <strong>アプリをインストール</strong>または
          <strong>ホーム画面に追加</strong>を選択してください。
        </p>
      `
      : `
        <p>
          Abra o menu do navegador e escolha
          <strong>Instalar aplicativo</strong> ou
          <strong>Adicionar à tela inicial</strong>.
        </p>
      `;
}

function openInstallDialog() {
  const modal = document.getElementById("install-modal");

  if (!modal) {
    return;
  }

  renderInstallInstructions();
  modal.hidden = false;
  document.body.classList.add("modal-open");

  modal.querySelector(".install-close")?.focus();
}

function closeInstallDialog() {
  const modal = document.getElementById("install-modal");

  if (!modal) {
    return;
  }

  modal.hidden = true;
  document.body.classList.remove("modal-open");
  document.getElementById("install-button")?.focus();
}

const INSTALL_TOAST_KEY = "portal-tss-install-toast-last-shown";
const INSTALL_TOAST_INTERVAL = 2 * 24 * 60 * 60 * 1000;
const INSTALL_TOAST_DELAY = 3000;
const INSTALL_TOAST_DURATION = 8000;

let installToastDelayTimer = null;
let installToastHideTimer = null;

function getLastInstallToastDate() {
  try {
    return Number(localStorage.getItem(INSTALL_TOAST_KEY)) || 0;
  } catch {
    return 0;
  }
}

function saveInstallToastDate() {
  try {
    localStorage.setItem(INSTALL_TOAST_KEY, String(Date.now()));
  } catch {
    // O aviso continua funcionando mesmo sem armazenamento local.
  }
}

function hideInstallToast() {
  const toast = document.getElementById("install-toast");

  if (toast) {
    toast.hidden = true;
    delete toast.dataset.scheduled;
  }

  clearTimeout(installToastDelayTimer);
  clearTimeout(installToastHideTimer);

  installToastDelayTimer = null;
  installToastHideTimer = null;
}

function shouldShowInstallToast() {
  const timeSinceLastDisplay =
    Date.now() - getLastInstallToastDate();

  return (
    !isRunningAsInstalledApp() &&
    navigator.onLine &&
    timeSinceLastDisplay >= INSTALL_TOAST_INTERVAL
  );
}

function scheduleInstallToast() {
  const toast = document.getElementById("install-toast");
  const installButton = document.getElementById("install-button");

  if (
    !toast ||
    !installButton ||
    installButton.hidden ||
    toast.dataset.scheduled === "true" ||
    !shouldShowInstallToast()
  ) {
    return;
  }

  toast.dataset.scheduled = "true";

  installToastDelayTimer = setTimeout(() => {
    delete toast.dataset.scheduled;

    if (
      !shouldShowInstallToast() ||
      installButton.hidden ||
      !navigator.onLine
    ) {
      return;
    }

    toast.hidden = false;
    saveInstallToastDate();

    installToastHideTimer = setTimeout(() => {
      hideInstallToast();
    }, INSTALL_TOAST_DURATION);
  }, INSTALL_TOAST_DELAY);
}

function showInstallButton() {
  const button = document.getElementById("install-button");

  if (button && !isRunningAsInstalledApp()) {
    button.hidden = false;
    scheduleInstallToast();
  }
}

window.addEventListener("beforeinstallprompt", (event) => {
  event.preventDefault();
  deferredInstallPrompt = event;
  showInstallButton();
});

window.addEventListener("appinstalled", () => {
  deferredInstallPrompt = null;

  const button = document.getElementById("install-button");

  if (button) {
    button.hidden = true;
  }

  hideInstallToast();
});

function setupInstallExperience() {
  const installButton = document.getElementById("install-button");
  const environment = getInstallEnvironment();

  if (!installButton || isRunningAsInstalledApp()) {
    return;
  }

  if (environment.isIOS || environment.isInAppBrowser) {
    showInstallButton();
  }

  installButton.addEventListener("click", async () => {
    if (deferredInstallPrompt) {
      deferredInstallPrompt.prompt();
      await deferredInstallPrompt.userChoice;

      deferredInstallPrompt = null;
      installButton.hidden = true;
      hideInstallToast();

      return;
    }

    openInstallDialog();
  });

  document
    .getElementById("install-toast-action")
    ?.addEventListener("click", () => {
      hideInstallToast();
      installButton.click();
    });

  document
    .getElementById("install-toast-close")
    ?.addEventListener("click", () => {
      hideInstallToast();
    });

  window.addEventListener("online", scheduleInstallToast);
  window.addEventListener("offline", hideInstallToast);

  document.querySelectorAll("[data-close-install]").forEach((element) => {
    element.addEventListener("click", closeInstallDialog);
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeInstallDialog();
    }
  });

  document
    .getElementById("copy-portal-link")
    ?.addEventListener("click", async () => {
      const portalUrl =
        "https://tsservice-fukui.github.io/portal-funcionarios/";

      try {
        await navigator.clipboard.writeText(portalUrl);

        const instructions =
          document.getElementById("install-instructions");

        if (instructions) {
          const message =
            getActiveLanguage() === "ja"
              ? "ポータルのURLをコピーしました。"
              : "Endereço do portal copiado.";

          instructions.insertAdjacentHTML(
            "beforeend",
            `<p class="copy-success">${message}</p>`
          );
        }
      } catch {
        window.prompt(
          getActiveLanguage() === "ja"
            ? "このURLをコピーしてください："
            : "Copie este endereço:",
          portalUrl
        );
      }
    });
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
    setupInstallExperience();

  const initialLanguage = detectLanguage();

  applyLanguage(initialLanguage);

  document.querySelectorAll("[data-language]").forEach((button) => {
    button.addEventListener("click", () => {
      applyLanguage(button.dataset.language);
    });
  });
});