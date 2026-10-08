import { reactive } from 'vue';
import i18next from 'i18next';
import Backend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';

const state = reactive({ version: 0 });

i18next
  .use(LanguageDetector)
  .use(Backend);

const initialized = i18next.init({
  fallbackLng: 'en',
  supportedLngs: ['en', 'de', 'fr', 'et', 'fa', 'bn', 'es', 'pt_br', 'it', 'id', 'kr'],
  nonExplicitSupportedLngs: false,
  backend: {
    loadPath: `${import.meta.env.BASE_URL}locales/{{lng}}/{{ns}}.json`,
  },
  detection: {
    order: ['querystring', 'path', 'localStorage', 'navigator'],
    lookupQuerystring: 'lang',
    caches: ['localStorage'],
  },
});

i18next.on('loaded languageChanged', () => {
  state.version++;
});

// Gives every component `$t`, scoped to the namespaces in its `i18nOptions`.
const plugin = {
  install(app) {
    app.mixin({
      beforeCreate() {
        const ns = this.$options.i18nOptions && this.$options.i18nOptions.namespaces;
        if (ns) i18next.loadNamespaces(ns);
      },
    });
    app.config.globalProperties.$t = function t(key, options) {
      state.version;
      const opts = this.$options.i18nOptions;
      return i18next.t(key, { ns: opts && opts.namespaces, ...options });
    };
  },
};

export { i18next, initialized };
export default plugin;
