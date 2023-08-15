<template>
  <div>
    <BrizyBuilder v-if="data" :data="data" :pagePreview="'/preview'" />
    <h1 v-else style="color: red">Something went wrong...</h1>
  </div>
</template>

<script>
import BrizyBuilder from "../../components/Builder/BrizyBuilder.vue";
import { API } from "../../utils/api";
import { ref } from "vue";
import { useRoute } from "vue-router";

export default {
  components: {
    BrizyBuilder,
  },
  setup() {
    const api = API.getInstance();
    const { params } = useRoute();
    const item = params.all ? params.all[0] : null;
    const data = ref();

    async function fetchData() {
      try {
        data.value = await api.getItem({
          collection: "page",
          item: item,
        });
      } catch (error) {
        console.error(error);
      }
    }

    fetchData();

    return {
      data,
    };
  },
};
</script>
