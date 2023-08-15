<script>
import Preview from "../components/Builder/Preview.vue";
import { API } from "../utils/api";
import { ref } from "vue";
import { useRoute } from "vue-router";

export default {
  components: {
    Preview,
  },
  async setup() {
    const responseData = ref(null);
    const route = useRoute();
    const [item] = route.params.all || [];
    const api = API.getInstance();

    try {
      const data = await api.getPageHTML({
        collection: "page",
        item: item,
      });

      if (!data) {
        throw new Error(`Failed to get HTML, ${data}`);
      }
      responseData.value = data;
    } catch (e) {
      console.error(e);
    }

    return {
      responseData,
    };
  },
};
</script>

<template>
  <div>
    <Preview v-if="responseData" :data="responseData" />
    <h1 v-else style="color: red">Something went wrong...</h1>
  </div>
</template>
