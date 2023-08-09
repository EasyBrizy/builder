<template>
  <div>
    <div v-if="builderState.status === 'error'" class="error-message">
      {{ builderState.error }}
    </div>
    <div v-else style="height: 100vh" class="container__editor" ref="containerRef"></div>
    <script src="https://cdn.brizylocal.com/pages/2.1.35/index.js"></script>
  </div>
</template>

<script>
import { useEditor } from "src/hooks/useEditor/index.vue";
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

    const config = {
      pageData: props.pageData,
      projectData: props.projectData,
      pagePreview: props.pagePreview,
      container: containerRef.value,
      htmlOutputType: "monolith",
      onSave: (data) => {
        console.log(data);
      },
    };

    const [builderState] = useEditor(props.token, config);

    onMounted(() => {
      const script = document.createElement("script");
      script.src = "https://cdn.brizylocal.com/pages/2.1.35/index.js";
      document.body.appendChild(script);
    });

    return {
      containerRef,
      builderState,
    };
  },
};
</script>
