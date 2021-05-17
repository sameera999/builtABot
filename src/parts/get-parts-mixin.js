export default {
  created() {
    this.$tore.dispatch('getParts');
  },
  computed: {
    parts() {
      return this.$store.state.robots.parts || {
        heads: [],
        arms: [],
        torsos: [],
        bases: [],
      };
    },
  },
};
