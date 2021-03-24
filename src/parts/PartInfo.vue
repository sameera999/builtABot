<template>
    <div>
        <h1>{{part.title}}</h1>
        <div>
            {{part.description}}
        </div>
    </div>
</template>

<script>
import Parts from '../data/parts';

export default {
  name: 'PartInfo',
  computed: {
    part() {
      const { partType, id } = this.$route.params;
      return Parts[partType].find((part) => part.id === +id);
    },
  },
};
</script>
