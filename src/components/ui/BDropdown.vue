<template>
    <div class="dropdown b-dropdown" :class="{ show: open }" ref="root">
        <button type="button"
                class="btn dropdown-toggle"
                :class="[`btn-${variant}`, size ? `btn-${size}` : '', { 'dropdown-toggle-no-caret': noCaret }, customClass]"
                aria-haspopup="true"
                :aria-expanded="open"
                @click="open = !open">
            <slot name="button-content">{{ text }}</slot>
        </button>
        <div class="dropdown-menu" :class="{ show: open, 'dropdown-menu-right': right }" @click="open = false">
            <slot/>
        </div>
    </div>
</template>

<script>
export default {
  name: 'BDropdown',
  props: {
    variant: { type: String, default: 'secondary' },
    size: String,
    noCaret: Boolean,
    right: Boolean,
    text: String,
    customClass: String,
  },
  data: () => ({ open: false }),
  mounted() {
    document.addEventListener('click', this.onOutside);
  },
  beforeUnmount() {
    document.removeEventListener('click', this.onOutside);
  },
  methods: {
    onOutside(e) {
      if (!this.$refs.root.contains(e.target)) this.open = false;
    },
  },
};
</script>

<style>
.dropdown-toggle-no-caret::after { display: none; }
</style>
