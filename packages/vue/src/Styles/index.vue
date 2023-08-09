<template>
  <div>
    <template v-for="(s, i) in data.styles">
      <link v-if="s.type === 'link'" :key="i" v-bind="s.attr" />
      <component v-else :is="'style'" v-html="s.html" v-bind="s.attr" />
    </template>
  </div>
</template>

<script lang="ts">
export default {
  name: "Styles",
  props: {
    data: {
      type: Object,
      required: true,
    },
  },
};
</script>
