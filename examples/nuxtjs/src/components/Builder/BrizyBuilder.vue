<template>
  <Brizy
    :token="'demo'"
    :pageData="data.pageData"
    :projectData="data.projectData"
    :pagePreview="pagePreview"
  />
</template>

<script>
import { Builder as Brizy } from "@brizy/vue";
import { defineComponent } from "vue";

export default defineComponent({
  props: {
    data: {
      type: Object,
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
