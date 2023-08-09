<template>
  <div>
    <Preview v-if="responseData" :data="responseData" />
    <h1 v-else style="color: red">Something went wrong...</h1>
  </div>
</template>

<script setup>
import Preview from "../../components/Builder/Preview.vue";
import { API } from "../../utils/api";
import { ref } from "vue";
import { useRoute } from "vue-router";

const { params } = useRoute();
const [item] = params.all ?? [];
const responseData = ref(null);
const api = API.getInstance();

try {
  const fetchedData = await api.getPageHTML({
    collection: "page",
    item: item,
  });

  if (!fetchedData) {
    throw Error(`Fail to get HTML, ${fetchedData}`);
  }

  responseData.value = fetchedData;
} catch (e) {
  console.error(e);
}
</script>
