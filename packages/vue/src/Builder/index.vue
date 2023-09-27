<script>
import loadExternalScript from "@/Builder/loadExternalScript";
import { ref, onMounted } from "vue";

export default {
  props: {
    token: String,
    pageData: Object,
    projectData: Object,
    pagePreview: String,
  },
  setup(props) {
    const containerRef = ref(null);
    const builderState = ref(null);
    const config = {
      pageData: props.pageData,
      projectData: props.projectData,
      pagePreview: props.pagePreview,
      container: containerRef,
      htmlOutputType: "monolith",
      onSave: (data) => {
        console.log(data);
      },
    };
    onMounted(() => {
      builderState.value = loadExternalScript(props.token, config);
    });
    return {
      containerRef,
      builderState,
    };
  },
};
</script>

<template>
  <div>
    <div
      v-if="builderState && builderState.status === 'error'"
      class="error-message"
    >
      {{ builderState.error }} error builder state
    </div>
    <div
      style="height: 100vh"
      class="container__editor"
      ref="containerRef"
    ></div>
  </div>
</template>
