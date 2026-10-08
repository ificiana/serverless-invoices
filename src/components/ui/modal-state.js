import { reactive } from 'vue';

// Modals addressed by id (`v-b-modal.id`, `$bvModal.hide(id)`).
export const opened = reactive({});

export const modal = {
  show: (id) => { opened[id] = true; },
  hide: (id) => { opened[id] = false; },
};
