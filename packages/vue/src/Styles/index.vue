<template>
  <div>
    <template v-for="(s, i) in data.styles">
      <link v-if="s.type === 'link'" :key="i" {{...s.attr}} />
      <component v-else :is="'style'" v-html="s.html" {{...s.attr}} />
    </template>
  </div>
</template>

<script lang="ts">
export default {
  props: {
    data: {
      type: Object,
      required: true,
    },
  },
};
</script>
