<template>
  <template v-if="token">
    <Install :token="token" />
  </template>
  <template v-else-if="redirectUrl">
    <Welcome :href="builderWelcomeUrlWithRedirect" />
  </template>
  <template v-else>
    <NotFound />
  </template>
</template>

<script setup>
import { builderWelcomeUrl } from "../../../config/index.vue";
import { getUrl } from "../../../utils/common";
import { Install, NotFound, Welcome } from "@brizy/docs-vue";
import { ref, onMounted, computed } from "vue";
import { useRouter } from "vue-router";

const props = defineProps({
  token: {
    type: String,
    required: false,
  },
});

const router = useRouter();
const mounted = ref(false);

const redirectUrl = computed(() => {
  return getUrl("/init");
});

const builderWelcomeUrlWithRedirect = computed(() => {
  return `${builderWelcomeUrl}?redirectUrl=${encodeURIComponent(
    redirectUrl.value
  )}`;
});

onMounted(() => {
  if (mounted.value) {
    return;
  }

  mounted.value = true;

  if (props.token) {
    const refresh = () => {
      setTimeout(() => {
        router.replace(router.currentRoute.value.fullPath);
        refresh();
      }, 7000);
    };

    refresh();
  }
});
</script>
