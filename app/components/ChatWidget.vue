<template>
  <ClientOnly>
    <EmbedChatWidget
      :webhook-url="webhookUrl"
      title="Black Forest Security"
      subline="KI-Chatbot"
      logo-url="/black-forest-security-icon.svg"
      welcome-message="Willkommen bei Black Forest Security! Wie können wir Ihnen helfen?"
      source="bfs-site"
      hide-usercentrics-on-open
    />
  </ClientOnly>
</template>

<script setup lang="ts">
import EmbedChatWidget from "../../embed/src/ChatWidget.vue";

const { public: publicConfig } = useRuntimeConfig();
const webhookUrl = publicConfig.chatWebhookUrl as string;
</script>
