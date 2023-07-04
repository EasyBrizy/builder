<template>
  <div>
    <Styles :data="assets"></Styles>
    <div class="brz brz-root__preview" v-html="getHtml"></div>
    <Scripts :data="assets"></Scripts>
  </div>
</template>

<script lang="ts">
import Scripts from "./Scripts/index.vue";
import Styles from "./Styles/index.vue";
import type { CompilerData, Assets } from "./types";
import { getAssets, getHtml } from "@brizy/assetmanager";

export default {
  props: {
    data: {
      type: Object as () => CompilerData,
      required: true,
    },
  },
  computed: {
    assets(): Assets {
      return getAssets(this.data);
    },
    getHtml(): string {
      return getHtml(this.data);
    },
  },
  components: {
    Scripts,
    Styles,
  },
};
</script>
