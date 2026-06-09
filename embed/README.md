# Simple-KI Chat Widget (Embed)

Einbettbares Chat-Widget für beliebige Webseiten. Nach dem Build liegt das Bundle unter `embed/dist/chat-widget.js` und kann auf dem Simple-KI CDN gehostet werden.

## Einbindung

### Variante A: Globales Config-Objekt

```html
<script>
  window.SimpleKIChatConfig = {
    webhookUrl: "https://simpleki.app.n8n.cloud/webhook/…/chat",
    title: "Mein Unternehmen",
    subline: "KI-Chatbot",
    logoUrl: "https://example.com/logo.svg",
    welcomeMessage: "Willkommen! Wie können wir Ihnen helfen?",
    primaryColor: "#1a56db",
    source: "kunde-xyz",
  };
</script>
<script src="https://cdn.simple-ki.com/chat-widget.js" async></script>
```

### Variante B: Data-Attribute am Script-Tag

```html
<script
  src="https://cdn.simple-ki.com/chat-widget.js"
  data-webhook-url="https://simpleki.app.n8n.cloud/webhook/…/chat"
  data-title="Mein Unternehmen"
  data-subline="KI-Chatbot"
  data-logo-url="https://example.com/logo.svg"
  data-welcome-message="Willkommen!"
  data-primary-color="#1a56db"
  data-source="kunde-xyz"
  async
></script>
```

## Konfiguration

| Option | Pflicht | Standard | Beschreibung |
|--------|---------|----------|--------------|
| `webhookUrl` | Ja | — | n8n/Simple-KI Webhook-URL |
| `title` | Nein | `"Chat"` | Titel im Chat-Header |
| `subline` | Nein | `"KI-Chatbot"` | Untertitel im Chat-Header |
| `logoUrl` | Nein | Chat-Icon | Logo im runden Button |
| `welcomeMessage` | Nein | `"Wie können wir Ihnen helfen?"` | Erste Bot-Nachricht |
| `source` | Nein | `"embed"` | Kennung im Webhook-Payload |
| `primaryColor` | Nein | `"#000000"` | Primärfarbe für Send-Button und Nutzer-Nachrichten (Hex) |

## JavaScript-API

```js
// Manuell initialisieren oder Config überschreiben
window.SimpleKIChat.init({
  webhookUrl: "https://…",
  title: "Support",
});

// Widget entfernen
window.SimpleKIChat.destroy();
```

## CORS am Webhook

Das Widget sendet Anfragen **direkt aus dem Browser** an den n8n-Webhook. Der Webhook muss die Origin der eingebettenden Webseite erlauben.

In n8n: Response-Header `Access-Control-Allow-Origin` auf die Kunden-Domain setzen (oder `*` für Tests). Ohne korrekte CORS-Konfiguration erscheint im Widget eine Verbindungsfehlermeldung.

## Entwicklung & Build

```bash
# Lokale Demo (http://localhost:5173)
npm run dev:embed

# Produktions-Bundle
npm run build:embed
```

Das Build-Artefakt `embed/dist/chat-widget.js` enthält Vue und alle Styles inline — es reicht ein einziges Script-Tag.
