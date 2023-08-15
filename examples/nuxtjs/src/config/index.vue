<script>
import { ref } from "vue";

export default {
  setup() {
    const builderHost = "https://brizy.cloud";
    const apiKey = ref(useRuntimeConfig().public);
    const builderWelcomeUrl = `${builderHost}/share/zWuCORqKPEnqI8J`;
    return {
      apiKey,
      builderWelcomeUrl,
    };
  },
};
</script>
