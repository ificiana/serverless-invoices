import BModal from './BModal.vue';
import BDropdown from './BDropdown.vue';
import BDropdownItem from './BDropdownItem.vue';
import BDropdownGroup from './BDropdownGroup.vue';
import BDropdownDivider from './BDropdownDivider.vue';
import BTabs from './BTabs.vue';
import BTab from './BTab.vue';
import msgBoxConfirm from './confirm';
import { modal } from './modal-state';

export default {
  install(app) {
    Object.entries({
      BModal,
      BDropdown,
      BDropdownItem,
      BDropdownItemButton: BDropdownItem,
      BDropdownGroup,
      BDropdownDivider,
      BTabs,
      BTab,
    }).forEach(([name, component]) => app.component(name, component));

    app.config.globalProperties.$bvModal = { ...modal, msgBoxConfirm };

    app.directive('b-modal', {
      mounted(el, binding) {
        const id = Object.keys(binding.modifiers)[0];
        el.addEventListener('click', () => modal.show(id));
      },
    });
    app.directive('b-tooltip', {
      mounted(el, binding) {
        if (binding.value) el.title = binding.value;
      },
    });
  },
};
