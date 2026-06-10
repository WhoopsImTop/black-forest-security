<template>
  <div class="ski-chat-root" :style="themeStyle">
    <button
      v-if="!isOpen"
      type="button"
      class="ski-chat-trigger"
      :aria-expanded="isOpen"
      aria-controls="ski-chat-panel"
      aria-label="Chat öffnen"
      @click="open()"
    >
      <img :src="logoUrl" alt="" class="ski-chat-trigger__logo" width="32" height="32" />
    </button>

    <Transition name="ski-chat-backdrop">
      <div
        v-if="isOpen"
        class="ski-chat-backdrop"
        :style="backdropStyle"
        aria-hidden="true"
        @click="close()"
      />
    </Transition>

    <Transition :name="isLg ? 'ski-chat-drawer' : 'ski-chat-mobile'">
      <div
        v-show="isOpen"
        id="ski-chat-panel"
        class="ski-chat-panel"
        :class="{
          'ski-chat-panel--dragging': isDragging,
          'ski-chat-panel--snap-back': snapBack,
        }"
        :style="panelStyle"
        role="dialog"
        aria-modal="true"
        :aria-label="`Chat mit ${title}`"
      >
        <div
          class="ski-chat-panel__header-wrap"
          @touchstart.passive="onDragStart"
          @touchmove.passive="onDragMove"
          @touchend="onDragEnd"
          @touchcancel="onDragEnd"
        >
          <div class="ski-chat-panel__handle" aria-hidden="true">
            <span class="ski-chat-panel__handle-bar" />
          </div>
          <div class="ski-chat-panel__header">
            <div>
              <p class="ski-chat-panel__title">{{ title }}</p>
              <p class="ski-chat-panel__subline">{{ subline }}</p>
            </div>
            <button
              type="button"
              class="ski-chat-panel__close"
              aria-label="Schließen"
              @click="close()"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true">
                <path d="M18 6 6 18" />
                <path d="m6 6 12 12" />
              </svg>
            </button>
          </div>
        </div>

        <div ref="scrollEl" class="ski-chat-messages" :style="scrollAreaStyle">
          <div
            v-for="msg in messages"
            :key="msg.id"
            class="ski-chat-message-row"
            :class="msg.role === 'user' ? 'ski-chat-message-row--user' : 'ski-chat-message-row--bot'"
          >
            <div
              class="ski-chat-bubble"
              :class="msg.role === 'user' ? 'ski-chat-bubble--user' : 'ski-chat-bubble--bot'"
            >
              {{ msg.content }}
            </div>
          </div>

          <div v-if="status === 'sending'" class="ski-chat-message-row ski-chat-message-row--bot">
            <div class="ski-chat-typing">
              <span class="ski-chat-typing__dot" />
              <span class="ski-chat-typing__dot ski-chat-typing__dot--delay-1" />
              <span class="ski-chat-typing__dot ski-chat-typing__dot--delay-2" />
            </div>
          </div>

          <div v-if="status === 'error'" class="ski-chat-error">
            {{ errorMessage }}
          </div>
        </div>

        <form v-if="isLg" class="ski-chat-form ski-chat-form--desktop" @submit.prevent="send()">
          <div class="ski-chat-form__row">
            <label class="ski-chat-sr-only" for="ski-chat-input">Nachricht</label>
            <textarea
              id="ski-chat-input"
              ref="inputEl"
              v-model="draft"
              rows="1"
              class="ski-chat-input"
              placeholder="Schreiben Sie eine Nachricht…"
              :disabled="status === 'sending'"
              @keydown.enter.exact.prevent="send()"
            />
            <button
              type="submit"
              class="ski-chat-send"
              :disabled="status === 'sending' || !draft.trim()"
            >
              <svg v-if="status !== 'sending'" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                <path d="M22 2 11 13" />
                <path d="M22 2 15 22l-4-9-9-4 20-7Z" />
              </svg>
              <svg v-else class="ski-chat-send__spinner" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <circle cx="12" cy="12" r="9" stroke="currentColor" stroke-opacity="0.3" stroke-width="3" />
                <path d="M21 12a9 9 0 0 0-9-9" stroke="currentColor" stroke-width="3" stroke-linecap="round" />
              </svg>
            </button>
          </div>
          <p class="ski-chat-footer">
            Ihre Nachrichten werden von OpenAI verarbeitet. Powered by
            <a href="https://simple-ki.com" target="_blank" rel="noopener noreferrer">Simple-KI</a>
          </p>
        </form>
      </div>
    </Transition>

    <Teleport :to="teleportTarget">
      <form
        v-if="isOpen && !isLg"
        class="ski-chat-form ski-chat-form--mobile"
        :style="mobileFormStyle"
        @submit.prevent="send()"
      >
        <div class="ski-chat-form__row">
          <label class="ski-chat-sr-only" for="ski-chat-input-mobile">Nachricht</label>
          <textarea
            id="ski-chat-input-mobile"
            ref="inputEl"
            v-model="draft"
            rows="1"
            class="ski-chat-input ski-chat-input--mobile"
            placeholder="Schreiben Sie eine Nachricht…"
            :disabled="status === 'sending'"
            @focus="onInputFocus"
            @keydown.enter.exact.prevent="send()"
          />
          <button
            type="submit"
            class="ski-chat-send"
            :disabled="status === 'sending' || !draft.trim()"
          >
            <svg v-if="status !== 'sending'" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
              <path d="M22 2 11 13" />
              <path d="M22 2 15 22l-4-9-9-4 20-7Z" />
            </svg>
            <svg v-else class="ski-chat-send__spinner" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <circle cx="12" cy="12" r="9" stroke="currentColor" stroke-opacity="0.3" stroke-width="3" />
              <path d="M21 12a9 9 0 0 0-9-9" stroke="currentColor" stroke-width="3" stroke-linecap="round" />
            </svg>
          </button>
        </div>
        <p class="ski-chat-footer">
          Ihre Nachrichten werden von OpenAI verarbeitet. Powered by
          <a href="https://simple-ki.com" target="_blank" rel="noopener noreferrer">Simple-KI</a>
        </p>
      </form>
    </Teleport>
  </div>
</template>

<script setup lang="ts">
import {
  computed,
  nextTick,
  onMounted,
  onUnmounted,
  ref,
  watch,
} from "vue";
import {
  DEFAULT_CONFIG,
  normalizeBackgroundColor,
  normalizePrimaryColor,
} from "./types";

type ChatRole = "user" | "assistant";
type ChatMessage = {
  id: string;
  role: ChatRole;
  content: string;
  createdAt: number;
};

const props = withDefaults(
  defineProps<{
    webhookUrl: string;
    title?: string;
    subline?: string;
    logoUrl?: string;
    welcomeMessage?: string;
    source?: string;
    primaryColor?: string;
    backgroundColor?: string;
    hideUsercentricsOnOpen?: boolean;
    teleportTarget?: string | HTMLElement;
  }>(),
  {
    title: DEFAULT_CONFIG.title,
    subline: DEFAULT_CONFIG.subline,
    logoUrl: DEFAULT_CONFIG.logoUrl,
    welcomeMessage: DEFAULT_CONFIG.welcomeMessage,
    source: DEFAULT_CONFIG.source,
    primaryColor: DEFAULT_CONFIG.primaryColor,
    backgroundColor: DEFAULT_CONFIG.backgroundColor,
    hideUsercentricsOnOpen: false,
    teleportTarget: "body",
  },
);

const themeStyle = computed(() => {
  const primary = normalizePrimaryColor(props.primaryColor);
  return {
    "--ski-chat-primary": primary,
    "--ski-chat-primary-hover": `color-mix(in srgb, ${primary} 82%, black)`,
    "--ski-chat-bg": "#fff",
    "--ski-chat-trigger-bg": normalizeBackgroundColor(props.backgroundColor),
  };
});

const DRAG_CLOSE_THRESHOLD = 80;
const DRAG_VELOCITY_THRESHOLD = 0.5;
const MOBILE_FLOATING_BAR_RESERVE = 128;

const usercentricsSelectors = [
  "#usercentrics-root",
  "#usercentrics-cmp-ui",
  "[id*='usercentrics']",
  "[class*='usercentrics']",
  "iframe[src*='usercentrics']",
];

const isOpen = ref(false);
const draft = ref("");
const status = ref<"idle" | "sending" | "error">("idle");
const errorMessage = ref("");
const prefersReducedMotion = ref(false);

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

const sessionId = ref("");

const messages = ref<ChatMessage[]>([
  {
    id: crypto.randomUUID(),
    role: "assistant",
    content: props.welcomeMessage,
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

const mobileFormStyle = computed(() => ({
  ...themeStyle.value,
  ...(floatingBarStyle.value ?? {}),
}));

const scrollAreaStyle = computed(() => {
  if (isLg.value || !isOpen.value) return undefined;
  return {
    paddingBottom: `${MOBILE_FLOATING_BAR_RESERVE + floatingBarBottom.value}px`,
  };
});

function sessionStorageKey(): string {
  let hash = 0;
  for (let i = 0; i < props.webhookUrl.length; i++) {
    hash = (hash << 5) - hash + props.webhookUrl.charCodeAt(i);
    hash |= 0;
  }
  return `simple_ki_chat_session_${Math.abs(hash).toString(36)}`;
}

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
  if (!props.hideUsercentricsOnOpen || typeof document === "undefined") return;

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
    const res = await fetch(props.webhookUrl, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        chatInput: text,
        sessionId: sessionId.value,
        source: props.source,
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
  const key = sessionStorageKey();
  const existing = localStorage.getItem(key);
  sessionId.value = existing || crypto.randomUUID();
  localStorage.setItem(key, sessionId.value);

  prefersReducedMotion.value = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;

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
