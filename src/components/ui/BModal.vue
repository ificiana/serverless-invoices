<template>
    <Teleport to="body">
        <template v-if="visible">
            <div class="modal fade show d-block" tabindex="-1" role="dialog" @mousedown.self="close">
                <div class="modal-dialog"
                     :class="[size ? `modal-${size}` : '', { 'modal-dialog-centered': centered, 'modal-dialog-scrollable': scrollable }]"
                     role="document">
                    <div class="modal-content" :class="contentClass">
                        <div class="modal-header" v-if="!hideHeader">
                            <h5 class="modal-title">{{ title }}</h5>
                            <button type="button" class="close" aria-label="Close" @click="close">&times;</button>
                        </div>
                        <div class="modal-body"><slot/></div>
                        <div class="modal-footer" v-if="!hideFooter || $slots.footer">
                            <slot name="footer"/>
                        </div>
                    </div>
                </div>
            </div>
            <div class="modal-backdrop fade show"></div>
        </template>
    </Teleport>
</template>

<script>
import { opened } from './modal-state';

export default {
  name: 'BModal',
  props: {
    modelValue: { type: Boolean, default: undefined },
    id: String,
    title: String,
    size: String,
    centered: Boolean,
    scrollable: Boolean,
    hideHeader: Boolean,
    hideFooter: Boolean,
    contentClass: [String, Array, Object],
  },
  emits: ['update:modelValue'],
  computed: {
    visible() {
      return this.modelValue !== undefined ? this.modelValue : !!opened[this.id];
    },
  },
  watch: {
    visible: {
      immediate: true,
      handler(v) {
        document.body.classList.toggle('modal-open', v);
      },
    },
  },
  beforeUnmount() {
    document.body.classList.remove('modal-open');
  },
  methods: {
    close() {
      if (this.modelValue !== undefined) this.$emit('update:modelValue', false);
      else opened[this.id] = false;
    },
  },
};
</script>
