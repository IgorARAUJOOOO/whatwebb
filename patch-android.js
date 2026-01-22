import fs from 'fs';

const userAgent = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36";
const filePath = 'android/app/src/main/java/com/meuprojeto/whatsbrowser/MainActivity.java';

if (fs.existsSync(filePath)) {
    let content = fs.readFileSync(filePath, 'utf8');

    // Remove qualquer tentativa anterior para evitar duplicatas ou erros
    content = content.replace(/import android\.webkit\.WebSettings;[\s\S]*?setDisplayZoomControls\(false\);[\s\S]*?\}/g, '');

    const injection = `
    import android.webkit.WebSettings;
    import android.webkit.WebView;

    @Override
    public void onStart() {
        super.onStart();
        WebView webView = this.getBridge().getWebView();
        WebSettings settings = webView.getSettings();
        settings.setUserAgentString("${userAgent}");
    }
} // Fim da classe`;

    // Substitui o último fechamento de chave pelo novo código injetado
    content = content.trim().replace(/\}$/, injection);

    fs.writeFileSync(filePath, content);
    console.log('✅ MainActivity.java atualizado com sucesso!');
} else {
    console.log('❌ Arquivo não encontrado!');
}
