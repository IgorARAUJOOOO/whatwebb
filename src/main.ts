// User-Agent de Desktop para enganar o WhatsApp Web (Windows Chrome)
const DESKTOP_USER_AGENT = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36";

// No Capacitor, para mudar o UserAgent globalmente no Android
// Isso geralmente é feito no código Nativo (Java), mas vamos preparar o JS
console.log("WhatsBrowser carregado com UserAgent: " + DESKTOP_USER_AGENT);

const menuBtn = document.getElementById('ext-menu-btn');
const extPanel = document.getElementById('ext-panel');
const btnFixLayout = document.getElementById('btn-fix-layout');
const btnInjectCustom = document.getElementById('btn-inject-custom');
const customJsArea = document.getElementById('custom-js') as HTMLTextAreaElement;

// Abrir/Fechar Menu de Extensões
menuBtn?.addEventListener('click', () => {
    extPanel?.classList.toggle('hidden');
});

// Extensão 1: Corrigir Layout
btnFixLayout?.addEventListener('click', () => {
    // Tenta forçar o zoom para caber melhor na tela do celular
    const style = document.createElement('style');
    style.innerHTML = `
        body { zoom: 0.65 !important; }
        #app > div > span { transform: scale(0.8) !important; }
    `;
    document.head.appendChild(style);
    alert("Layout ajustado!");
});

// Extensão 2: Injetar Customizado
btnInjectCustom?.addEventListener('click', () => {
    const code = customJsArea.value;
    if (code) {
        try {
            eval(code);
            alert("Script executado com sucesso!");
        } catch (e) {
            alert("Erro no script: " + e);
        }
    }
});
