<script>
import BrizyBuilder from "../../components/Builder/BrizyBuilder.vue";
import { API } from "../../utils/api";
import { ref } from "vue";
import { useRoute } from "vue-router";

export default {
  components: {
    BrizyBuilder,
  },

  async setup() {
    const api = API.getInstance();
    const route = useRoute();
    const item = route.params.all ? route.params.all[0] : null;
    const responseData = ref(null);

    try {
      const data = await api.getItem({
        collection: "page",
        item: item,
      });

      if (!data) {
        throw new Error(`Failed to connect, ${data}`);
      }

      responseData.value = data;
    } catch (error) {
      console.error(error);
    }

    return {
      responseData,
    };
  },
};
</script>

<template>
  <div>
    <BrizyBuilder
      v-if="responseData"
      :data="responseData"
      :pagePreview="'/preview'"
    />
    <h1 v-else style="color: red">Something went wrong...</h1>
  </div>
</template>
