<template>
  <suspense>
    <template #default>
      <AsyncComponent />
    </template>

    <template #fallback>
      <p>Loading...</p>
    </template>
  </suspense>
</template>

<script>
import AsyncComponent from "./AsyncComponent.vue";
import { defineComponent } from "vue";

definePageMeta({
  middleware: ["index"],
});
export default defineComponent({
  components: {
    AsyncComponent,
  },
});
</script>
