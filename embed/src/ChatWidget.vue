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

    <Teleport to="body">
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
import { DEFAULT_CONFIG, normalizePrimaryColor } from "./types";

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
    hideUsercentricsOnOpen?: boolean;
  }>(),
  {
    title: DEFAULT_CONFIG.title,
    subline: DEFAULT_CONFIG.subline,
    logoUrl: DEFAULT_CONFIG.logoUrl,
    welcomeMessage: DEFAULT_CONFIG.welcomeMessage,
    source: DEFAULT_CONFIG.source,
    primaryColor: DEFAULT_CONFIG.primaryColor,
    hideUsercentricsOnOpen: false,
  },
);

const themeStyle = computed(() => ({
  "--ski-chat-primary": normalizePrimaryColor(props.primaryColor),
}));

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

<style scoped>
.ski-chat-root {
  font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
  line-height: 1.5;
  -webkit-font-smoothing: antialiased;
}

.ski-chat-sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}

.ski-chat-trigger {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 3.5rem;
  height: 3.5rem;
  border-radius: 9999px;
  border: 1px solid #e5e5e5;
  background: #fff;
  box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.15);
  cursor: pointer;
  transition: transform 0.15s ease, border-color 0.15s ease;
}

.ski-chat-trigger:hover {
  transform: scale(1.03);
  border-color: #d4d4d4;
}

.ski-chat-trigger__logo {
  height: 2rem;
  width: auto;
  max-width: 2rem;
  object-fit: contain;
}

.ski-chat-backdrop {
  position: fixed;
  inset: 0;
  z-index: 200000;
  background: rgb(0 0 0 / 0.4);
}

.ski-chat-panel {
  position: fixed;
  inset-inline: 0;
  bottom: 0;
  z-index: 200001;
  display: flex;
  height: 80dvh;
  width: 100%;
  flex-direction: column;
  overflow: hidden;
  border-top: 1px solid #e5e5e5;
  border-radius: 1rem 1rem 0 0;
  background: #fff;
  box-shadow: 0 20px 25px -5px rgb(0 0 0 / 0.1);
}

.ski-chat-panel--snap-back {
  transition: transform 0.22s ease-out;
}

.ski-chat-panel--dragging {
  transition: none;
}

.ski-chat-panel__header-wrap {
  flex-shrink: 0;
  touch-action: none;
  user-select: none;
}

.ski-chat-panel__handle {
  display: flex;
  justify-content: center;
  padding: 0.625rem 0 0.25rem;
}

.ski-chat-panel__handle-bar {
  display: block;
  height: 0.25rem;
  width: 2.5rem;
  border-radius: 9999px;
  background: #d4d4d4;
}

.ski-chat-panel__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid #e5e5e5;
  padding: 0.75rem 1rem;
}

.ski-chat-panel__title {
  margin: 0;
  font-size: 0.875rem;
  font-weight: 600;
  color: #171717;
}

.ski-chat-panel__subline {
  margin: 0;
  font-size: 0.75rem;
  color: #737373;
}

.ski-chat-panel__close {
  display: inline-flex;
  flex-shrink: 0;
  align-items: center;
  justify-content: center;
  width: 2.25rem;
  height: 2.25rem;
  border: none;
  border-radius: 0.375rem;
  background: transparent;
  color: #525252;
  cursor: pointer;
  transition: background-color 0.15s ease, color 0.15s ease;
}

.ski-chat-panel__close:hover {
  background: #f5f5f5;
  color: #171717;
}

.ski-chat-panel__close svg {
  width: 1.25rem;
  height: 1.25rem;
}

.ski-chat-messages {
  min-height: 0;
  flex: 1;
  overflow-y: auto;
  padding: 1rem;
  touch-action: pan-y;
}

.ski-chat-message-row {
  display: flex;
  margin-bottom: 0.75rem;
}

.ski-chat-message-row--user {
  justify-content: flex-end;
}

.ski-chat-message-row--bot {
  justify-content: flex-start;
}

.ski-chat-bubble {
  max-width: 85%;
  white-space: pre-wrap;
  border-radius: 1rem;
  padding: 0.75rem 1rem;
  font-size: 0.875rem;
}

.ski-chat-bubble--user {
  background: var(--ski-chat-primary, #000);
  color: #fff;
}

.ski-chat-bubble--bot {
  background: #f5f5f5;
  color: #171717;
}

.ski-chat-typing {
  display: inline-flex;
  align-items: center;
  gap: 0.25rem;
  border-radius: 1rem;
  background: #f5f5f5;
  padding: 0.5rem 0.75rem;
}

.ski-chat-typing__dot {
  width: 0.5rem;
  height: 0.5rem;
  border-radius: 9999px;
  background: #a3a3a3;
  animation: ski-chat-pulse 1s ease-in-out infinite;
}

.ski-chat-typing__dot--delay-1 {
  animation-delay: 120ms;
}

.ski-chat-typing__dot--delay-2 {
  animation-delay: 240ms;
}

@keyframes ski-chat-pulse {
  0%, 100% { opacity: 0.4; }
  50% { opacity: 1; }
}

.ski-chat-error {
  border-radius: 0.75rem;
  border: 1px solid #fecaca;
  background: #fef2f2;
  padding: 0.75rem;
  font-size: 0.75rem;
  color: #b91c1c;
}

.ski-chat-form {
  flex-shrink: 0;
  border-top: 1px solid #e5e5e5;
  padding: 0.75rem;
  padding-bottom: max(0.75rem, env(safe-area-inset-bottom));
  background: #fff;
}

.ski-chat-form--mobile {
  position: fixed;
  inset-inline: 0.75rem;
  z-index: 200002;
  border: 1px solid #e5e5e5;
  border-radius: 1rem;
  box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1);
  transition: bottom 0.2s ease;
}

.ski-chat-form__row {
  display: flex;
  align-items: flex-end;
  gap: 0.5rem;
}

.ski-chat-input {
  min-height: 2.75rem;
  flex: 1;
  resize: none;
  border-radius: 0.75rem;
  border: 1px solid #e5e5e5;
  padding: 0.5rem 0.75rem;
  font-size: 0.875rem;
  color: #171717;
  outline: none;
  font-family: inherit;
}

.ski-chat-input--mobile {
  font-size: 1rem;
}

.ski-chat-input:focus {
  border-color: #a3a3a3;
}

.ski-chat-input:disabled {
  opacity: 0.6;
}

.ski-chat-root,
.ski-chat-form--mobile {
  --ski-chat-primary: #000;
  --ski-chat-primary-hover: color-mix(in srgb, var(--ski-chat-primary) 82%, black);
}

.ski-chat-send {
  display: inline-flex;
  flex-shrink: 0;
  align-items: center;
  justify-content: center;
  width: 2.75rem;
  height: 2.75rem;
  border: none;
  border-radius: 0.75rem;
  background: var(--ski-chat-primary, #000);
  color: #fff;
  cursor: pointer;
  transition: background-color 0.15s ease;
}

.ski-chat-send:hover:not(:disabled) {
  background: var(--ski-chat-primary-hover, #262626);
}

.ski-chat-send:disabled {
  cursor: not-allowed;
  background: #a3a3a3;
}

.ski-chat-send svg {
  width: 1.25rem;
  height: 1.25rem;
}

.ski-chat-send__spinner {
  animation: ski-chat-spin 1s linear infinite;
}

@keyframes ski-chat-spin {
  to { transform: rotate(360deg); }
}

.ski-chat-footer {
  margin: 0.5rem 0 0;
  text-align: center;
  font-size: 10px;
  color: #737373;
}

.ski-chat-footer a {
  color: #171717;
  text-decoration: underline;
}

.ski-chat-backdrop-enter-active,
.ski-chat-backdrop-leave-active {
  transition: opacity 0.25s ease;
}

.ski-chat-backdrop-enter-from,
.ski-chat-backdrop-leave-to {
  opacity: 0;
}

.ski-chat-mobile-enter-active,
.ski-chat-mobile-leave-active {
  transition: transform 0.3s cubic-bezier(0.32, 0.72, 0, 1);
}

.ski-chat-mobile-enter-from,
.ski-chat-mobile-leave-to {
  transform: translateY(100%);
}

.ski-chat-drawer-enter-active,
.ski-chat-drawer-leave-active {
  transition: opacity 0.2s ease, transform 0.2s ease;
}

.ski-chat-drawer-enter-from,
.ski-chat-drawer-leave-to {
  transform: translateY(12px) scale(0.98);
  opacity: 0;
}

@media (min-width: 1024px) {
  .ski-chat-backdrop {
    display: none;
  }

  .ski-chat-panel {
    inset-inline: auto 1rem;
    bottom: 1rem;
    left: auto;
    right: 1rem;
    height: min(32rem, calc(100dvh - 2rem));
    max-height: min(32rem, calc(100dvh - 2rem));
    width: min(92vw, 24rem);
    border: 1px solid #e5e5e5;
    border-top: 1px solid #e5e5e5;
    border-radius: 1rem;
  }

  .ski-chat-panel__header-wrap {
    touch-action: auto;
    user-select: auto;
  }

  .ski-chat-panel__handle {
    display: none;
  }

  .ski-chat-panel__header {
    border-radius: 1rem 1rem 0 0;
  }

  .ski-chat-messages {
    padding-bottom: 1rem;
  }
}

@media (prefers-reduced-motion: reduce) {
  .ski-chat-backdrop-enter-active,
  .ski-chat-backdrop-leave-active,
  .ski-chat-mobile-enter-active,
  .ski-chat-mobile-leave-active,
  .ski-chat-drawer-enter-active,
  .ski-chat-drawer-leave-active,
  .ski-chat-panel--snap-back,
  .ski-chat-form--mobile {
    transition-duration: 0.01ms !important;
  }

  .ski-chat-mobile-enter-from,
  .ski-chat-mobile-leave-to,
  .ski-chat-drawer-enter-from,
  .ski-chat-drawer-leave-to {
    transform: none;
    opacity: 0;
  }
}
</style>
