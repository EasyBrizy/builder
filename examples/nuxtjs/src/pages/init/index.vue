<template>
  <Base :token="token" />
</template>

<script setup>
import Base from "./components/base.vue";

definePageMeta({
  middleware: ["index"],
});

const props = defineProps({
  searchParams: {
    type: Object,
    default: () => ({ token: "" }),
  },
});

const token = props.searchParams.token;
</script>
