<template>
    <div class="search-popover__container">
        <div class="editable__item"
             :class="btnClasses"
             ref="button"
             :tabindex="tabindex"
             @click="toggleOpen">
            <span v-if="!value" class="d-print-none">{{ $t('client') }}</span>
            <span v-else>{{ value }}</span>
        </div>
        <div class="search-popover__overlay" v-if="isOpen" @click="toggleOpen"></div>
        <div class="search-popover__select" v-show="isOpen" ref="suggest"
             @keydown.esc="toggleOpen"
             @keydown.tab="toggleOpen"
             @keydown.ctrl.enter="createNewClient">
            <input class="form-control"
                   ref="input"
                   autocomplete="off"
                   :placeholder="$t('suggest_placeholder')"
                   :value="query"
                   @input="onInput($event.target.value)"
                   @change="onChange"
                   @keydown.down.prevent="onKeyDown"
                   @keydown.up.prevent="highlighted = Math.max(highlighted - 1, 0)"
                   @keydown.enter.exact.prevent="onEnter">
            <ul class="list-unstyled mb-0 mt-2">
                <li v-for="(client, i) in suggestions"
                    :key="client.id"
                    class="dropdown-item"
                    :class="{ active: i === highlighted }"
                    @click="onSelected(client)">
                    <span>{{ client.company_name }}</span>
                </li>
            </ul>
            <button class="btn btn-link mt-2"
                    ref="createNewButton"
                    @click="createNewClient"
                    @keydown.up="returnToSuggestions">
                <i class="material-icons material-icons-round md-18">add</i>
                {{ $t('create') }} {{ query ? `"${query}"` : $t('new') }}
                <code class="ml-2 badge badge-secondary">ctrl + enter</code>
            </button>
        </div>
    </div>
</template>

<script>
export default {
  emits: ['change', 'input', 'selected'],
  i18nOptions: { namespaces: 'client-selector' },
  props: {
    value: {},
    btnClass: {},
  },
  data() {
    return {
      isOpen: false,
      query: '',
      tabindex: 0,
      highlighted: 0,
    };
  },
  computed: {
    suggestions() {
      return (this.$store.getters['clients/all'] || [])
        .filter(client => !this.query || client.company_name.toLowerCase()
          .indexOf(String(this.query)
            .toLowerCase()) !== -1);
    },
    input() {
      return this.$refs.input;
    },
    button() {
      return this.$refs.button;
    },
    btnClasses() {
      return !this.value ? `text-muted ${this.btnClass}` : this.btnClass;
    },
  },
  methods: {
    toggleOpen() {
      if (this.isOpen) {
        this.close();
      } else {
        this.open();
      }
    },
    open() {
      this.isOpen = true;
      setTimeout(() => {
        this.tabindex = -1;
        this.input.click();
        this.input.focus();
      });
    },
    close() {
      this.isOpen = false;
      setTimeout(() => {
        this.tabindex = 0;
        // this.button.focus();
      });
      this.query = '';
    },
    onInput(query) {
      this.query = query;
      this.highlighted = 0;
      this.$emit('input', query);
    },
    onChange(event) {
      this.$emit('change', event.target.value);
    },
    onSelected(client) {
      if (client) {
        this.$emit('selected', client);
        this.close();
      }
    },
    onEnter() {
      this.onSelected(this.suggestions[this.highlighted]);
    },
    async createNewClient() {
      if (this.query.length) {
        const client = await this.$store.dispatch('clients/createNewClient', { company_name: this.query });
        this.$emit('selected', client);
      } else {
        this.$store.dispatch('clients/openNewClientModal');
      }
      this.close();
    },
    onKeyDown() {
      if (this.highlighted < this.suggestions.length - 1) {
        this.highlighted++;
      } else if (this.suggestions.length === 0) {
        this.$refs.createNewButton.focus();
      }
    },
    returnToSuggestions() {
      this.input.focus();
    },
  },
};
</script>
