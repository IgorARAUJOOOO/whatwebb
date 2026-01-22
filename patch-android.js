import fs from 'fs';
import path from 'path';

const userAgent = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36";

// O caminho onde o Capacitor cria o arquivo principal do Android
const filePath = 'android/app/src/main/java/com/meuprojeto/whatsbrowser/MainActivity.java';

if (fs.existsSync(filePath)) {
    let content = fs.readFileSync(filePath, 'utf8');

    // Adicionando o código Java para forçar o UserAgent de Desktop
    const injection = `
    import android.webkit.WebSettings;
    import android.webkit.WebView;

    @Override
    public void onStart() {
        super.onStart();
        WebView webView = this.getBridge().getWebView();
        WebSettings settings = webView.getSettings();
        settings.setUserAgentString("${userAgent}");
        settings.setUseWideViewPort(true);
        settings.setLoadWithOverviewMode(true);
        settings.setSupportZoom(true);
        settings.setBuiltInZoomControls(true);
        settings.setDisplayZoomControls(false);
    }
    `;

    // Insere o código antes do fechamento da classe
    if (!content.includes('onStart()')) {
        content = content.replace(/public class MainActivity extends BridgeActivity \{/, `public class MainActivity extends BridgeActivity {${injection}`);
        fs.writeFileSync(filePath, content);
        console.log('✅ UserAgent de Desktop injetado com sucesso no código nativo!');
    }
} else {
    console.log('❌ Arquivo MainActivity.java não encontrado. Verifique se o npx cap add android rodou.');
}
