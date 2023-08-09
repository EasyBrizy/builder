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
