<template>
  <Brizy
    :token="'demo'"
    :pageData="data.pageData"
    :projectData="data.projectData"
    :pagePreview="pagePreview"
  />
</template>

<script lang="ts">
import { Builder as Brizy } from "@brizy/vue";

export interface Props {
  data: {
    pageData: Record<string, unknown>;
    projectData: Record<string, unknown>;
    token: string;
  };
  pagePreview: string;
}

export default defineComponent({
  props: {
    data: {
      type: Object as () => Props["data"],
      required: true,
    },
    pagePreview: {
      type: String,
      required: true,
    },
  },
  components: {
    Brizy,
  },
});
</script>
