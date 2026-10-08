<template>
    <div>
        <label :for="field" :class="labelClasses" v-if="label">{{ label }}</label>
        <div :class="containerClasses">
            <!-- <div class="input-group-prepend">
               <span class="input-group-text">
                 <i class="material-icons md-18 text-muted" v-if="value">today</i>
                 <i class="material-icons md-18 text-muted" v-else>calendar_today</i>
               </span>
             </div>-->
            <VueDatePicker :disabled="disabled"
                        :inline="inline"
                        :uid="field"
                        :input-class-name="[
                            errors && errors.has(field) ? 'is-invalid' : '',
                            ...(inputClasses || []),
                            ].join(' ')"
                        :placeholder="placeholder"
                        auto-apply
                        :enable-time-picker="false"
                        :week-start="1"
                        :range="mode === 'range'"
                        :format="formatDate"
                        :model-value="inputValue"
                        @update:model-value="outputValue"/>
            <slot></slot>
            <AppError v-if="errors" :errors="errors" :field="field"/>
        </div>
    </div>
</template>

<script>
import dayjs from 'dayjs';
import { VueDatePicker } from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css';
import AppError from '@/components/form/AppError';

export default {
  emits: ['change', 'input'],
  components: {
    AppError,
    VueDatePicker,
  },
  props: {
    errors: {},
    label: {},
    mode: {},
    value: {},
    field: {},
    disabled: {},
    inline: {
      default: false,
    },
    format: {
      default: 'YYYY-MM-DD',
    },
    modelFormat: {
      default: 'YYYY-MM-DD',
    },
    placeholder: {},
    labelClasses: {},
    inputClasses: {},
    containerClasses: {},
  },
  computed: {
    inputValue() {
      if (!this.value) return null;
      return Array.isArray(this.value)
        ? this.value.map(val => dayjs(val, this.modelFormat).toDate())
        : dayjs(this.value, this.modelFormat).toDate();
    },
  },
  methods: {
    formatDate(date) {
      return Array.isArray(date)
        ? date.map(d => dayjs(d).format(this.format)).join(' - ')
        : dayjs(date).format(this.format);
    },
    outputValue(event) {
      const value = Array.isArray(event)
        ? event.map(val => this.toModelFormat(val))
        : this.toModelFormat(event);
      // The picker re-emits whenever its prop gets a new Date instance; ignore unchanged values.
      if (JSON.stringify(value) === JSON.stringify(this.value)) return;
      this.$emit('input', value);
      this.$emit('change', value);
    },
    toModelFormat(val) {
      return val ? dayjs(val).format(this.modelFormat) : null;
    },
  },
};
</script>
<style lang="scss">
</style>
