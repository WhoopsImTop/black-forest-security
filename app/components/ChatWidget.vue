<template>
  <ClientOnly>
    <div class="fixed bottom-4 right-4 z-[10050] flex flex-col items-end">
      <div
        v-if="isOpen"
        id="bfs-chat-panel"
        class="flex h-[min(32rem,calc(100dvh-2rem))] w-[min(92vw,24rem)] flex-col overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-xl shadow-black/10"
        role="dialog"
        aria-label="Chat mit Black Forest Security"
      >
        <div class="flex shrink-0 items-center justify-between border-b border-neutral-200 px-4 py-3">
          <div>
            <p class="text-sm font-semibold text-neutral-900">Black Forest Security</p>
            <p class="text-xs text-neutral-500">KI-Chatbot</p>
          </div>
          <button
            type="button"
            class="rounded-md border border-neutral-200 px-2 py-1 text-xs text-neutral-700 hover:border-neutral-300 hover:text-neutral-900"
            @click="isOpen = false"
          >
            Schließen
          </button>
        </div>

        <div ref="scrollEl" class="min-h-0 flex-1 space-y-3 overflow-y-auto px-4 py-4">
          <div
            v-for="msg in messages"
            :key="msg.id"
            class="flex"
            :class="msg.role === 'user' ? 'justify-end' : 'justify-start'"
          >
            <div
              class="max-w-[85%] whitespace-pre-wrap rounded-2xl px-4 py-3 text-sm"
              :class="
                msg.role === 'user'
                  ? 'bg-black text-white'
                  : 'bg-neutral-100 text-neutral-900'
              "
            >
              {{ msg.content }}
            </div>
          </div>

          <div v-if="status === 'sending'" class="flex justify-start">
            <div class="inline-flex items-center gap-1 rounded-2xl bg-neutral-100 px-3 py-2 text-sm text-neutral-600">
              <span class="h-2 w-2 animate-pulse rounded-full bg-neutral-400" />
              <span class="h-2 w-2 animate-pulse rounded-full bg-neutral-400 [animation-delay:120ms]" />
              <span class="h-2 w-2 animate-pulse rounded-full bg-neutral-400 [animation-delay:240ms]" />
            </div>
          </div>

          <div v-if="status === 'error'" class="rounded-xl border border-red-200 bg-red-50 p-3 text-xs text-red-700">
            {{ errorMessage }}
          </div>
        </div>

        <form class="shrink-0 border-t border-neutral-200 p-3" @submit.prevent="send()">
          <div class="flex items-end gap-2">
            <label class="sr-only" for="bfs-chat-input">Nachricht</label>
            <textarea
              id="bfs-chat-input"
              ref="inputEl"
              v-model="draft"
              rows="1"
              class="min-h-11 flex-1 resize-none rounded-xl border border-neutral-200 px-3 py-2 text-sm text-neutral-900 outline-none focus:border-neutral-400"
              placeholder="Schreiben Sie eine Nachricht…"
              :disabled="status === 'sending'"
              @keydown.enter.exact.prevent="send()"
            />
            <button
              type="submit"
              class="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-black text-white transition-colors hover:bg-neutral-800 disabled:cursor-not-allowed disabled:bg-neutral-400"
              :disabled="status === 'sending' || !draft.trim()"
            >
              <svg
                v-if="status !== 'sending'"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                class="h-5 w-5"
                fill="none"
                stroke="currentColor"
                stroke-width="1.8"
                stroke-linecap="round"
                stroke-linejoin="round"
                aria-hidden="true"
              >
                <path d="M22 2 11 13" />
                <path d="M22 2 15 22l-4-9-9-4 20-7Z" />
              </svg>
              <svg
                v-else
                class="h-5 w-5 animate-spin"
                viewBox="0 0 24 24"
                fill="none"
                aria-hidden="true"
              >
                <circle cx="12" cy="12" r="9" stroke="currentColor" stroke-opacity="0.3" stroke-width="3" />
                <path d="M21 12a9 9 0 0 0-9-9" stroke="currentColor" stroke-width="3" stroke-linecap="round" />
              </svg>
            </button>
          </div>
          <p class="mt-2 text-[10px] text-neutral-500">
            Hinweis: Dieser Chat sendet Ihre Nachricht an unseren Automations&shy;dienst (n8n).
          </p>
        </form>
      </div>

      <button
        v-if="!isOpen"
        type="button"
        class="inline-flex h-14 w-14 items-center justify-center rounded-full border border-neutral-200 bg-white shadow-lg shadow-black/15 transition-transform hover:scale-[1.03] hover:border-neutral-300"
        :aria-expanded="isOpen"
        aria-controls="bfs-chat-panel"
        aria-label="Chat öffnen"
        @click="toggle()"
      >
        <img
          src="/black-forest-security-icon.svg"
          alt=""
          class="h-8 w-auto"
          width="120"
          height="26"
        />
      </button>
    </div>
  </ClientOnly>
</template>

<script setup lang="ts">
type ChatRole = "user" | "assistant";
type ChatMessage = {
  id: string;
  role: ChatRole;
  content: string;
  createdAt: number;
};

const { public: publicConfig } = useRuntimeConfig();
const webhookUrl = publicConfig.chatWebhookUrl as string;

const isOpen = ref(false);
const draft = ref("");
const status = ref<"idle" | "sending" | "error">("idle");
const errorMessage = ref("");

const scrollEl = ref<HTMLElement | null>(null);
const inputEl = ref<HTMLTextAreaElement | null>(null);

const sessionId = ref<string>("");

const messages = ref<ChatMessage[]>([
  {
    id: crypto.randomUUID(),
    role: "assistant",
    content:
      "Hallo! Wie können wir Ihnen helfen? (z. B. Veranstaltungsschutz, Objektschutz, Baustellenüberwachung)",
    createdAt: Date.now(),
  },
]);

function toggle() {
  isOpen.value = !isOpen.value;
  if (isOpen.value) {
    nextTick(() => inputEl.value?.focus());
  }
}

function scrollToBottom() {
  const el = scrollEl.value;
  if (!el) return;
  el.scrollTop = el.scrollHeight;
}

function normalizeBotText(payload: unknown): string {
  if (typeof payload === "string") return payload;
  if (!payload || typeof payload !== "object") return "OK";

  const anyPayload = payload as any;
  return (
    anyPayload.output ??
    anyPayload.text ??
    anyPayload.message ??
    anyPayload.reply ??
    anyPayload.data?.text ??
    anyPayload.data?.message ??
    JSON.stringify(payload, null, 2)
  );
}

async function send() {
  const text = draft.value.trim();
  if (!text || status.value === "sending") return;

  status.value = "sending";
  errorMessage.value = "";

  messages.value.push({
    id: crypto.randomUUID(),
    role: "user",
    content: text,
    createdAt: Date.now(),
  });
  draft.value = "";
  await nextTick();
  scrollToBottom();

  try {
    const res = await fetch(webhookUrl, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        chatInput: text,
        sessionId: sessionId.value,
        source: "bfs-site",
      }),
    });

    const contentType = res.headers.get("content-type") || "";
    const raw = await res.text();
    let data: unknown = raw;
    if (contentType.includes("application/json")) {
      try {
        data = JSON.parse(raw);
      } catch {
        // keep raw
      }
    } else {
      // some n8n nodes return json as text
      try {
        data = JSON.parse(raw);
      } catch {
        // keep raw
      }
    }

    if (!res.ok) {
      throw new Error(
        typeof data === "string" ? data : `HTTP ${res.status}: ${raw.slice(0, 200)}`,
      );
    }

    const botText = normalizeBotText(data);
    messages.value.push({
      id: crypto.randomUUID(),
      role: "assistant",
      content: botText,
      createdAt: Date.now(),
    });

    status.value = "idle";
    await nextTick();
    scrollToBottom();
  } catch (e: any) {
    status.value = "error";
    errorMessage.value =
      "Der Chat konnte keine Verbindung herstellen. Falls das wiederholt auftritt, liegt es häufig an CORS im n8n-Webhook (Origin nicht erlaubt).";
    // keep dev detail in console
    console.error(e);
  }
}

onMounted(() => {
  const key = "bfs_chat_session_id";
  const existing = localStorage.getItem(key);
  sessionId.value = existing || crypto.randomUUID();
  localStorage.setItem(key, sessionId.value);
});
</script>
