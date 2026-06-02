<template>
  <ClientOnly>
    <div class="fixed bottom-4 right-4 z-[200000]">
      <button
        v-if="!isOpen"
        type="button"
        class="inline-flex h-14 w-14 items-center justify-center rounded-full border border-neutral-200 bg-white shadow-lg shadow-black/15 transition-transform hover:scale-[1.03] hover:border-neutral-300"
        :aria-expanded="isOpen"
        aria-controls="bfs-chat-panel"
        aria-label="Chat öffnen"
        @click="open()"
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

    <Transition name="chat-backdrop">
      <div
        v-if="isOpen"
        class="chat-backdrop fixed inset-0 z-[200000] bg-black/40 lg:hidden"
        :style="backdropStyle"
        aria-hidden="true"
        @click="close()"
      />
    </Transition>

    <Transition :name="isLg ? 'chat-drawer' : 'chat-mobile'">
      <div
        v-show="isOpen"
        id="bfs-chat-panel"
        class="chat-panel fixed inset-x-0 bottom-0 z-[200001] flex h-[80dvh] w-full flex-col overflow-hidden rounded-t-2xl border-t border-neutral-200 bg-white shadow-xl shadow-black/10 lg:inset-x-auto lg:bottom-4 lg:right-4 lg:left-auto lg:h-[min(32rem,calc(100dvh-2rem))] lg:max-h-[min(32rem,calc(100dvh-2rem))] lg:w-[min(92vw,24rem)] lg:rounded-2xl lg:border lg:border-neutral-200 lg:border-t-0 lg:shadow-xl lg:shadow-black/10"
        :class="{ 'chat-panel--dragging': isDragging, 'chat-panel--snap-back': snapBack }"
        :style="panelStyle"
        role="dialog"
        aria-modal="true"
        aria-label="Chat mit Black Forest Security"
      >
        <div
          class="shrink-0 touch-none select-none lg:touch-auto"
          @touchstart.passive="onDragStart"
          @touchmove.passive="onDragMove"
          @touchend="onDragEnd"
          @touchcancel="onDragEnd"
        >
          <div class="flex justify-center pt-2.5 pb-1 lg:hidden" aria-hidden="true">
            <span class="block h-1 w-10 rounded-full bg-neutral-300" />
          </div>
          <div
            class="flex items-center justify-between border-b border-neutral-200 px-4 py-3 lg:rounded-t-2xl"
          >
            <div>
              <p class="text-sm font-semibold text-neutral-900">Black Forest Security</p>
              <p class="text-xs text-neutral-500">KI-Chatbot</p>
            </div>
            <button
              type="button"
              class="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-md text-neutral-600 transition-colors hover:bg-neutral-100 hover:text-neutral-900"
              aria-label="Schließen"
              @click="close()"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                class="h-5 w-5"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                aria-hidden="true"
              >
                <path d="M18 6 6 18" />
                <path d="m6 6 12 12" />
              </svg>
            </button>
          </div>
        </div>

        <div
          ref="scrollEl"
          class="min-h-0 flex-1 space-y-3 overflow-y-auto px-4 py-4 touch-pan-y lg:pb-4"
          :style="scrollAreaStyle"
        >
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

        <form
          v-if="isLg"
          class="shrink-0 border-t border-neutral-200 p-3 pb-[max(0.75rem,env(safe-area-inset-bottom))]"
          @submit.prevent="send()"
        >
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
              class="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-black text-white transition-colors hover:bg-neutral-800 disabled:cursor-not-allowed disabled:bg-neutral-400"
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
    </Transition>

    <Teleport to="body">
      <form
        v-if="isOpen && !isLg"
        class="chat-input-bar fixed inset-x-3 z-[200002] rounded-2xl border border-neutral-200 bg-white p-3 shadow-lg shadow-black/10"
        :style="floatingBarStyle"
        @submit.prevent="send()"
      >
        <div class="flex items-end gap-2">
          <label class="sr-only" for="bfs-chat-input-mobile">Nachricht</label>
          <textarea
            id="bfs-chat-input-mobile"
            ref="inputEl"
            v-model="draft"
            rows="1"
            class="min-h-11 flex-1 resize-none rounded-xl border border-neutral-200 px-3 py-2 text-base text-neutral-900 outline-none focus:border-neutral-400"
            placeholder="Schreiben Sie eine Nachricht…"
            :disabled="status === 'sending'"
            @focus="onInputFocus"
            @keydown.enter.exact.prevent="send()"
          />
          <button
            type="submit"
            class="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-black text-white transition-colors hover:bg-neutral-800 disabled:cursor-not-allowed disabled:bg-neutral-400"
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
    </Teleport>
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

const DRAG_CLOSE_THRESHOLD = 80;
const DRAG_VELOCITY_THRESHOLD = 0.5;
const MOBILE_FLOATING_BAR_RESERVE = 128;

const { public: publicConfig } = useRuntimeConfig();
const webhookUrl = publicConfig.chatWebhookUrl as string;

const prefersReducedMotion = usePrefersReducedMotion();

const isOpen = ref(false);
const draft = ref("");
const status = ref<"idle" | "sending" | "error">("idle");
const errorMessage = ref("");

const scrollEl = ref<HTMLElement | null>(null);
const inputEl = ref<HTMLTextAreaElement | null>(null);

const isLg = ref(true);
const dragOffsetY = ref(0);
const isDragging = ref(false);
const snapBack = ref(false);
const floatingBarBottom = ref(16);

let dragStartY = 0;
let dragStartTime = 0;
let savedBodyOverflow = "";
let savedBodyPosition = "";
let savedBodyTop = "";
let savedBodyWidth = "";
let lockedScrollY = 0;
let viewportListenersAttached = false;
const usercentricsSelectors = [
  "#usercentrics-root",
  "#usercentrics-cmp-ui",
  "[id*='usercentrics']",
  "[class*='usercentrics']",
  "iframe[src*='usercentrics']",
];

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

const panelStyle = computed(() => {
  if (dragOffsetY.value <= 0) return undefined;
  return { transform: `translateY(${dragOffsetY.value}px)` };
});

const backdropStyle = computed(() => {
  if (!isDragging.value && dragOffsetY.value <= 0) return undefined;
  const opacity = Math.max(0, 0.4 * (1 - dragOffsetY.value / 280));
  return { opacity: String(opacity) };
});

const floatingBarStyle = computed(() => {
  if (isLg.value || !isOpen.value) return undefined;
  return { bottom: `${floatingBarBottom.value}px` };
});

const scrollAreaStyle = computed(() => {
  if (isLg.value || !isOpen.value) return undefined;
  return { paddingBottom: `${MOBILE_FLOATING_BAR_RESERVE + floatingBarBottom.value}px` };
});

function canUseDrawerDrag() {
  return isOpen.value && !isLg.value && !prefersReducedMotion.value;
}

function setBodyScrollLock(locked: boolean) {
  if (typeof document === "undefined") return;
  if (locked) {
    lockedScrollY = window.scrollY;
    savedBodyOverflow = document.body.style.overflow;
    savedBodyPosition = document.body.style.position;
    savedBodyTop = document.body.style.top;
    savedBodyWidth = document.body.style.width;
    document.body.style.overflow = "hidden";
    document.body.style.position = "fixed";
    document.body.style.top = `-${lockedScrollY}px`;
    document.body.style.left = "0";
    document.body.style.right = "0";
    document.body.style.width = "100%";
  } else {
    document.body.style.overflow = savedBodyOverflow;
    document.body.style.position = savedBodyPosition;
    document.body.style.top = savedBodyTop;
    document.body.style.width = savedBodyWidth;
    document.body.style.left = "";
    document.body.style.right = "";
    window.scrollTo(0, lockedScrollY);
  }
}

function setUsercentricsVisibility(hidden: boolean) {
  if (typeof document === "undefined") return;

  const elements = new Set<HTMLElement>();
  for (const selector of usercentricsSelectors) {
    document.querySelectorAll(selector).forEach((el) => {
      if (el instanceof HTMLElement) {
        elements.add(el);
      }
    });
  }

  elements.forEach((el) => {
    if (hidden) {
      if (el.dataset.ucPrevDisplay === undefined) {
        el.dataset.ucPrevDisplay = el.style.display || "";
      }
      el.style.display = "none";
      el.style.visibility = "hidden";
      el.style.pointerEvents = "none";
    } else {
      el.style.display = el.dataset.ucPrevDisplay ?? "";
      el.style.visibility = "";
      el.style.pointerEvents = "";
      delete el.dataset.ucPrevDisplay;
    }
  });
}

function syncFloatingBarPosition() {
  if (typeof window === "undefined" || isLg.value || !isOpen.value) {
    floatingBarBottom.value = 16;
    return;
  }

  const vv = window.visualViewport;
  if (!vv) {
    floatingBarBottom.value = 16;
    return;
  }

  const keyboardInset = Math.max(0, window.innerHeight - vv.height - vv.offsetTop);
  floatingBarBottom.value = keyboardInset + 16;
}

function attachViewportListeners() {
  if (viewportListenersAttached || typeof window === "undefined") return;
  const vv = window.visualViewport;
  if (vv) {
    vv.addEventListener("resize", onViewportChange);
    vv.addEventListener("scroll", onViewportChange);
  }
  window.addEventListener("resize", onViewportChange);
  viewportListenersAttached = true;
}

function detachViewportListeners() {
  if (!viewportListenersAttached || typeof window === "undefined") return;
  const vv = window.visualViewport;
  if (vv) {
    vv.removeEventListener("resize", onViewportChange);
    vv.removeEventListener("scroll", onViewportChange);
  }
  window.removeEventListener("resize", onViewportChange);
  viewportListenersAttached = false;
}

function onViewportChange() {
  syncFloatingBarPosition();
  if (!isDragging.value) {
    nextTick(() => scrollToBottom());
  }
}

function onInputFocus() {
  if (isLg.value) return;
  syncFloatingBarPosition();
  nextTick(() => scrollToBottom());
  window.setTimeout(() => {
    syncFloatingBarPosition();
    scrollToBottom();
  }, 120);
  window.setTimeout(() => {
    syncFloatingBarPosition();
    scrollToBottom();
  }, 350);
}

function resetDrag() {
  dragOffsetY.value = 0;
  isDragging.value = false;
  snapBack.value = false;
}

function open() {
  isOpen.value = true;
  nextTick(() => {
    syncFloatingBarPosition();
    scrollToBottom();
  });
}

function close() {
  isOpen.value = false;
  resetDrag();
  floatingBarBottom.value = 16;
  inputEl.value?.blur();
}

function onDragStart(e: TouchEvent) {
  if (!canUseDrawerDrag()) return;
  const touch = e.touches[0];
  if (!touch) return;
  isDragging.value = true;
  snapBack.value = false;
  dragStartY = touch.clientY;
  dragStartTime = Date.now();
}

function onDragMove(e: TouchEvent) {
  if (!isDragging.value) return;
  const touch = e.touches[0];
  if (!touch) return;
  const delta = Math.max(0, touch.clientY - dragStartY);
  dragOffsetY.value = delta;
}

function onDragEnd(e: TouchEvent) {
  if (!isDragging.value) return;
  const touch = e.changedTouches[0];
  const delta = touch ? Math.max(0, touch.clientY - dragStartY) : dragOffsetY.value;
  const elapsed = Math.max(1, Date.now() - dragStartTime);
  const velocity = delta / elapsed;

  isDragging.value = false;

  if (delta > DRAG_CLOSE_THRESHOLD || velocity > DRAG_VELOCITY_THRESHOLD) {
    close();
    return;
  }

  snapBack.value = true;
  dragOffsetY.value = 0;
  window.setTimeout(() => {
    snapBack.value = false;
  }, 220);
}

function onKeydown(e: KeyboardEvent) {
  if (e.key === "Escape" && isOpen.value) {
    close();
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

  const anyPayload = payload as Record<string, unknown>;
  const data = anyPayload.data as Record<string, unknown> | undefined;
  return (
    (anyPayload.output as string | undefined) ??
    (anyPayload.text as string | undefined) ??
    (anyPayload.message as string | undefined) ??
    (anyPayload.reply as string | undefined) ??
    (data?.text as string | undefined) ??
    (data?.message as string | undefined) ??
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
  } catch (e: unknown) {
    status.value = "error";
    errorMessage.value =
      "Der Chat konnte keine Verbindung herstellen. Falls das wiederholt auftritt, liegt es häufig an CORS im n8n-Webhook (Origin nicht erlaubt).";
    console.error(e);
  }
}

watch(isOpen, (open) => {
  if (open && !isLg.value) {
    setBodyScrollLock(true);
    setUsercentricsVisibility(true);
    attachViewportListeners();
    syncFloatingBarPosition();
    nextTick(() => scrollToBottom());
  } else {
    detachViewportListeners();
    setUsercentricsVisibility(false);
    setBodyScrollLock(false);
  }
});

watch(isLg, (lg) => {
  if (lg) {
    detachViewportListeners();
    floatingBarBottom.value = 16;
    setBodyScrollLock(false);
  } else if (isOpen.value) {
    setBodyScrollLock(true);
    attachViewportListeners();
    syncFloatingBarPosition();
  }
});

onMounted(() => {
  const key = "bfs_chat_session_id";
  const existing = localStorage.getItem(key);
  sessionId.value = existing || crypto.randomUUID();
  localStorage.setItem(key, sessionId.value);

  const mq = window.matchMedia("(min-width: 1024px)");
  const updateMq = () => {
    isLg.value = mq.matches;
  };
  updateMq();
  mq.addEventListener("change", updateMq);

  window.addEventListener("keydown", onKeydown);

  onUnmounted(() => {
    mq.removeEventListener("change", updateMq);
  });
});

onUnmounted(() => {
  detachViewportListeners();
  if (typeof window !== "undefined") {
    window.removeEventListener("keydown", onKeydown);
  }
  setUsercentricsVisibility(false);
  setBodyScrollLock(false);
});
</script>

<style scoped>
.chat-panel--snap-back {
  transition: transform 0.22s ease-out;
}

.chat-panel--dragging {
  transition: none;
}

.chat-input-bar {
  transition: bottom 0.2s ease;
}

.chat-backdrop-enter-active,
.chat-backdrop-leave-active {
  transition: opacity 0.25s ease;
}

.chat-backdrop-enter-from,
.chat-backdrop-leave-to {
  opacity: 0;
}

.chat-mobile-enter-active,
.chat-mobile-leave-active {
  transition: transform 0.3s cubic-bezier(0.32, 0.72, 0, 1);
}

.chat-mobile-enter-from,
.chat-mobile-leave-to {
  transform: translateY(100%);
}

.chat-drawer-enter-active,
.chat-drawer-leave-active {
  transition:
    opacity 0.2s ease,
    transform 0.2s ease;
}

.chat-drawer-enter-from,
.chat-drawer-leave-to {
  transform: translateY(12px) scale(0.98);
  opacity: 0;
}

@media (prefers-reduced-motion: reduce) {
  .chat-backdrop-enter-active,
  .chat-backdrop-leave-active,
  .chat-mobile-enter-active,
  .chat-mobile-leave-active,
  .chat-drawer-enter-active,
  .chat-drawer-leave-active,
  .chat-panel--snap-back,
  .chat-input-bar {
    transition-duration: 0.01ms !important;
  }

  .chat-mobile-enter-from,
  .chat-mobile-leave-to,
  .chat-drawer-enter-from,
  .chat-drawer-leave-to {
    transform: none;
    opacity: 0;
  }
}
</style>
