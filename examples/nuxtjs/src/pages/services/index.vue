<template>
  <div>
    <Header />
    <BuilderComponent v-if="data" :data="data" />
    <ControlError v-else :error="error" />
    <Footer />
  </div>
</template>

<script setup>
import ControlError from "../../components/ControlError/index.vue";
import Footer from "../../components/Footer/index.vue";
import Header from "../../components/Header/index.vue";
import { API } from "../../utils/api";
import { BuilderComponent } from "@brizy/vue";
import { onMounted, ref } from "vue";

let data;
const error = ref();

onMounted(async () => {
  try {
    const api = API.getInstance();
    data = await api.getPageHTML({
      collection: "page",
      item: "about",
    });
  } catch (e) {
    error.value = e;
  }
});
</script>
