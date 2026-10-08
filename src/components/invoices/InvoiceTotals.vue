<template>
    <tfoot>
    <tr class="text-right">
        <td :colspan="colspan">{{ $t('subtotal') }}</td>
        <td>{{ $currency(invoice.subTotal) }}</td>
    </tr>
    <tr class="text-right" v-for="tax in invoice.taxes" :key="tax.label">
        <td :colspan="colspan">
            {{ tax.label }} ({{ tax.rate }}%)
        </td>
        <td>{{ $currency(tax.total) }}</td>
    </tr>
    <tr class="text-right">
        <th :colspan="colspan">
            {{ $t('total') }}
            <AppEditable :value="invoice.currency"
                         :errors="errors"
                         field="currency"
                         :placeholder="$t('add_currency')"
                         @change="updateProp({ currency: $event })"/>
        </th>
        <th class="text-nowrap">{{ $currency(invoice.total) }}</th>
    </tr>
    </tfoot>
</template>
<script>
import { mapGetters } from 'vuex';
import AppEditable from '../form/AppEditable';

export default {
  emits: ['update'],
  i18nOptions: { namespaces: 'invoice-totals' },
  props: ['invoice', 'errors'],
  components: {
    AppEditable,
  },
  computed: {
    ...mapGetters({
      taxes: 'invoiceRows/taxes',
    }),
    colspan() {
      return 4 + this.taxes.length;
    },
  },
  methods: {
    updateProp(props) {
      this.$emit('update', props);
    },
  },
};
</script>
