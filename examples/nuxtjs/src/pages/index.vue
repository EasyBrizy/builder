<template>
  <BuilderComponent :data="responseData" />
</template>

<script setup>
import { API } from "../utils/api";
import { BuilderComponent } from "@brizy/vue";
import { ref } from "vue";
import { useRoute } from "vue-router";

const { params } = useRoute();
const [item] = params.all ?? [];
const responseData = ref(null);
const api = API.getInstance();
const response = await api.getHTMLByItem({
  collection: "page",
  item: item,
});
if (!response) {
  throw Error(`Fail to get html, ${response}`);
}
responseData.value = response;
console.log("data response", responseData);
</script>
