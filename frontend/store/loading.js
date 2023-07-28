export const state = () => ({
  loading: true,
});

export const mutations = {
  setLoading(state, loading) {
    state.loading = loading;
  },
};
