<template>
  <Base :token="token" />
</template>

<script setup>
import Base from "./components/base.vue";
import { defineProps } from "vue";

const props = defineProps({
  searchParams: {
    type: Object,
    default: () => ({ token: "" }),
  },
});

const token = props.searchParams.token;
</script>
