import adapter from '@/services/adapters/local.adapter';

export default {
  get: uri => adapter.get(uri),
  post: (uri, data) => adapter.post(uri, data),
  patch: (uri, data) => adapter.patch(uri, data),
  put: (uri, data) => adapter.put(uri, data),
  delete: uri => adapter.delete(uri),
};
