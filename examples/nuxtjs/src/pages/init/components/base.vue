<template>
  <template v-if="token">
    <Install :token="token" />
  </template>
  <template v-else-if="redirectUrl">
    <Welcome :href="`${builderWelcomeUrl}?redirectUrl=${redirectUrl}`" />
  </template>
  <template v-else>
    <NotFound />
  </template>
</template>

<script setup>
import Config from "../../../config/index";
import { getUrl } from "../../../utils/common";
import { Install, NotFound, Welcome } from "@brizy/docs-vue";
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";

const props = defineProps({
  token: String,
});

const { builderWelcomeUrl } = Config;
const router = useRouter();
const mounted = ref(false);

const redirectUrl = ref(getUrl("/init"));

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
