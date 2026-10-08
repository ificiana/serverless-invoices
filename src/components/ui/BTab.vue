<template>
    <div class="tab-pane" :class="{ active: isActive }" v-show="isActive"><slot/></div>
</template>

<script>
import { inject } from 'vue';

export default {
  name: 'BTab',
  props: { title: String },
  setup(props) {
    const tabs = inject('tabs');
    const index = tabs.tabs.length;
    tabs.tabs.push(props);
    return { tabs, index };
  },
  computed: {
    isActive() {
      return this.tabs.current === this.index;
    },
  },
};
</script>
