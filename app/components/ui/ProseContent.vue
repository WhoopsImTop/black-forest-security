<template>
  <div class="prose-legal">
    <template v-for="(block, index) in blocks" :key="index">
      <h2 v-if="block.type === 'h2'">{{ block.text }}</h2>
      <h3 v-else-if="block.type === 'h3'">{{ block.text }}</h3>
      <h4 v-else-if="block.type === 'h4'">{{ block.text }}</h4>
      <p v-else-if="block.type === 'p'" class="whitespace-pre-line">{{ block.text }}</p>
      <ul v-else-if="block.type === 'ul' && block.items?.length">
        <li v-for="(item, itemIndex) in block.items" :key="itemIndex">{{ item }}</li>
      </ul>
    </template>
  </div>
</template>

<script setup>
defineProps({
  blocks: { type: Array, required: true },
});
</script>
