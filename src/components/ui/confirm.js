import { createApp, h, ref } from 'vue';
import BModal from './BModal.vue';

// Promise-based confirm box: resolves true on OK, false on cancel or dismiss.
export default function msgBoxConfirm(message, options = {}) {
  return new Promise((resolve) => {
    const host = document.createElement('div');
    document.body.appendChild(host);
    const open = ref(true);
    let app;
    const finish = (result) => {
      app.unmount();
      host.remove();
      resolve(result);
    };
    const button = (variant, title, result) => h('button', {
      type: 'button',
      class: variant === 'btn-link' ? 'btn btn-link' : `btn btn-${variant}`,
      onClick: () => finish(result),
    }, title);
    app = createApp({
      render: () => h(BModal, {
        modelValue: open.value,
        'onUpdate:modelValue': (v) => { open.value = v; if (!v) finish(false); },
        centered: true,
        hideHeader: true,
        size: 'sm',
        contentClass: options.contentClass,
      }, {
        default: () => message,
        footer: () => [
          button(options.cancelVariant || 'secondary', options.cancelTitle || 'Cancel', false),
          button(options.okVariant || 'primary', options.okTitle || 'OK', true),
        ],
      }),
    });
    app.mount(host);
  });
}
