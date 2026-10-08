<template>
    <b-dropdown v-if="selectedLang" variant="link" size="sm" right no-caret custom-class="text-secondary">
        <template #button-content>
            <span class="text-secondary">
                <span class="text-uppercase">{{ selectedLang.code }}</span>
                <i class="material-icons md-18">expand_more</i>
            </span>
        </template>
        <b-dropdown-item-button v-for="lang in languages" @click="langChanged(lang)" :key="lang.code">{{ lang.name }}</b-dropdown-item-button>
    </b-dropdown>
</template>
<script>
import { mapState } from 'vuex';

export default {
  name: 'language-switcher',
  i18nOptions: { namespaces: 'language-switcher' },
  components: {
  },
  computed: {
    ...mapState({
      selectedLang: state => state.language.lang,
      languages: state => state.language.all,
    }),
  },
  methods: {
    langChanged(lang) {
      this.$store.dispatch('language/changeLanguage', lang);
    },
  },
};
</script>
