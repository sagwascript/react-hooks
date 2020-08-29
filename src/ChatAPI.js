// dummy API
export default {
  subscribe: (id, handler) => {
    handler(id);
  },
  unsubscribe: (id, handler) => {
    handler(id);
  }
};
