<template>
  <div>
    <h2>Something went wrong!</h2>
    <button @click="onClick">Try again</button>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from "vue";

const props = defineProps(["error", "onClick"]);

onMounted(() => {
  console.error(props.error);
});
</script>
