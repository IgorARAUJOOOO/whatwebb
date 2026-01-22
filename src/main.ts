const iframe = document.getElementById('whatsapp-frame') as HTMLIFrameElement;
const overlay = document.getElementById('overlay-status');
const menuBtn = document.getElementById('ext-menu-btn');
const extPanel = document.getElementById('ext-panel');
const btnFixLayout = document.getElementById('btn-fix-layout');
const btnInjectCustom = document.getElementById('btn-inject-custom');
const customJsArea = document.getElementById('custom-js') as HTMLTextAreaElement;

// User-Agent de Desktop para enganar o WhatsApp Web
const DESKTOP_USER_AGENT = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36";

// No Capacitor, podemos interceptar as requisições, mas para o MVP web/simulado:
console.log("Iniciando Browser Customizado...");

// Simulação de carregamento
iframe.onload = () => {
    console.log("WhatsApp Iframe Carregado");
    if (overlay) overlay.style.opacity = '0';
    setTimeout(() => overlay?.remove(), 500);
};

// Abrir/Fechar Menu de Extensões
menuBtn?.addEventListener('click', () => {
    extPanel?.classList.toggle('hidden');
});

// Extensão 1: Corrigir Layout (Script que seria injetado)
btnFixLayout?.addEventListener('click', () => {
    alert("Injetando script de correção de layout...");
    // Em um navegador real ou Capacitor com InAppBrowser, injetaríamos JS:
    // const script = `document.body.style.zoom = '0.8';`;
});

// Extensão 2: Injetar Customizado
btnInjectCustom?.addEventListener('click', () => {
    const code = customJsArea.value;
    if (code) {
        console.log("Injetando:", code);
        // iframe.contentWindow?.eval(code); // Nota: Isso só funciona se estiver no mesmo domínio ou com Capacitor plugins específicos
        alert("Código enviado para o buffer de injeção!");
    }
});

// Lógica de "Extensões" Automáticas
const autoExtensions = [
    {
        name: "Dark Mode Fix",
        code: "document.body.classList.add('dark')"
    }
];

console.log("Extensões carregadas:", autoExtensions.length);
