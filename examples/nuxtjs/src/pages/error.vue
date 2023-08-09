<template>
  <ControlError :error="error" @click="reset" />
</template>

<script>
import ControlError from "../components/ControlError/index.vue";
import { defineComponent } from "vue";

export default defineComponent({
  props: {
    error: {
      type: Error,
      required: true,
    },
    reset: {
      type: Function,
      required: true,
    },
  },
  components: {
    ControlError,
  },
});
</script>
