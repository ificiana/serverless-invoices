<template>
    <div>
        <h3>
            {{ $t('invoice_title') }}
            <AppEditable :value="invoice.number"
                         :errors="errors"
                         field="number"
                         :placeholder="$t('invoice_number')"
                         @change="updateProp({ number: $event })"/>
        </h3>
        {{ $t('issued_at') }}
        <span class="editable__item" v-b-modal.modal_issued_at>{{ $date(invoice.issued_at, 'D. MMM YYYY', 'YYYY-MM-DD') }}</span>
        <BModal id="modal_issued_at"
                centered
                :title="$t('modal_issued_at_title')"
                hide-footer
                size="sm"
                content-class="bg-base dp--24">
            <AppDatePicker :value="invoice.issued_at"
                           @change="updateProp({ issued_at: $event })"
                           :errors="errors"
                           :inline="true"
                           field="issued_at"/>
        </BModal>
        <br>{{ $t('due_at') }}
        <span class="editable__item"
              v-b-modal.modal_due_at>{{ $date(invoice.due_at, 'D. MMM YYYY', 'YYYY-MM-DD') }}</span>
        <BModal id="modal_due_at"
                centered
                :title="$t('modal_due_at_title')"
                hide-footer
                size="sm"
                content-class="bg-base dp--24">
            <AppDatePicker :value="invoice.due_at"
                           @change="updateProp({ due_at: $event })"
                           :errors="errors"
                           :inline="true"
                           field="due_at"/>
        </BModal>
        <span :class="{'d-print-none': !invoice.late_fee}">
            <br>{{ $t('late_fee') }}
            <AppEditable :value="$currency(invoice.late_fee)"
                         :errors="errors"
                         suffix="%"
                         field="late_fee"
                         :placeholder="$t('add_late_fee')"
                         @change="updateProp({ late_fee: $event })"/>
        </span>
    </div>
</template>
<script>
import AppEditable from '@/components/form/AppEditable';
import AppDatePicker from '@/components/form/AppDatePicker';

export default {
  emits: ['update'],
  i18nOptions: { namespaces: 'invoice-header' },
  props: ['invoice', 'errors'],
  components: {
    AppEditable,
    AppDatePicker,
  },
  methods: {
    updateProp(props) {
      this.$emit('update', props);
    },
  },
};
</script>
