<script lang="ts">
import useLoadScript from "@/hooks/useLoadScript.vue";
import { Assets } from "@brizy/assetmanager/dist/types";
import { defineComponent } from "vue";
export default defineComponent({
  props: {
    data: {
      type: Object as () => Assets,
      required: true,
    },
  },
  setup(props) {
    const isServer = typeof window === "undefined";
    useLoadScript(props.data.scripts);
    return { props, isServer };
  },
});
</script>

<template>
  <div>
    <template v-for="(s, i) in data.scripts">
      <component
          v-if="s.html"
          :is="'script'"
          :key="i"
          v-html="s.html"
          {{...s.attr}}
      ></component>
      <component v-else :is="'script'" {{...s.attr}}></component>
    </template>
    <template v-if="isServer">
      <component>window.isServer = true;</component>
    </template>
  </div>
</template>