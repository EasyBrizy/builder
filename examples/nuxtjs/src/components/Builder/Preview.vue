<template>
  <BuilderComponent :data="data" />
</template>

<script setup>
import { BuilderComponent } from "@brizy/vue";
import { ref } from "vue";

const props = defineProps({
  data: Object,
});

const data = ref(props.data);
</script>
