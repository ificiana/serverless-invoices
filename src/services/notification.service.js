import { notify } from '@kyvg/vue3-notification';

class NotificationService {
  success(text) {
    return notify({
      type: 'success',
      text,
    });
  }

  error(text, duration = 5000) {
    return notify({
      type: 'error',
      text,
      duration,
    });
  }

  stickyError(text, title) {
    return this.error(text, title, -1);
  }
}

export default new NotificationService();
