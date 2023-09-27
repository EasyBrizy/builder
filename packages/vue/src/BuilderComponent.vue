<template>
  <div>
    <Styles :data="GetAssets"></Styles>
    <div class="brz brz-root__preview" v-html="GetHtml"></div>
    <Scripts :data="GetAssets"></Scripts>
  </div>
</template>

<script lang="ts">
import Scripts from "@/Scripts/index.vue";
import Styles from "@/Styles/index.vue";
import { getAssets, getHtml } from "@brizy/assetmanager";
import { ref, onMounted } from "vue";

interface CompilerData {
  blocks: {
    freeStyles: Array<unknown>;
    freeScripts: Array<unknown>;
    proStyles?: Array<unknown>;
    proScripts?: Array<unknown>;
    body: string;
  };
}
export default {
  props: {
    data: {
      type: Object as () => CompilerData,
      required: true,
    },
  },
  components: {
    Styles,
    Scripts,
  },
  setup(props) {
    const nodeRef = ref<HTMLElement | null>(null);
    onMounted(() => {
      const node = nodeRef.value as HTMLElement | null;
      if (node) {
        const b = node.ownerDocument.body;
        b.classList.add("brz");
      }
      return () => {
        if (node) {
          const b = node.ownerDocument.body;
          b.classList.remove("brz");
        }
      };
    });
    const GetAssets = getAssets(props.data);
    const GetHtml = getHtml(props.data);
    return {
      GetAssets,
      GetHtml,
    };
  },
};
</script>
