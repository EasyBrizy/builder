<template>
  <div>
    <BrizyBuilderComponent />
    hello
  </div>
</template>

<script lang="ts">
import { BuilderComponent as BrizyBuilderComponent } from "@brizy/vue";

export default {
  name: "MyComponent",
  components: {
    BrizyBuilderComponent,
  },
};
</script>
