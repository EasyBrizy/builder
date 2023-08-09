<template>
  <Base v-if="token" :token="token" />
  <h1 v-else style="color: red">Missing token...</h1>
</template>

<script setup>
import Base from "./components/base.vue";

const props = defineProps({
  searchParams: {
    type: Object,
    required: true,
  },
});

const token = props.searchParams.token;
</script>
