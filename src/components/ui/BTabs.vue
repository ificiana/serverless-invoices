<template>
    <div class="tabs">
        <ul class="nav nav-tabs" :class="navClass" role="tablist">
            <li class="nav-item" v-for="(tab, i) in tabs" :key="i">
                <a href="#" class="nav-link" :class="{ active: i === current }" @click.prevent="current = i">{{ tab.title }}</a>
            </li>
        </ul>
        <div class="tab-content">
            <slot/>
        </div>
    </div>
</template>

<script>
import { reactive, provide } from 'vue';

export default {
  name: 'BTabs',
  props: { navClass: [String, Array, Object] },
  setup() {
    const state = reactive({ tabs: [], current: 0 });
    provide('tabs', state);
    return state;
  },
};
</script>
