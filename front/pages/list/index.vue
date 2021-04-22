<template>
  <Index />
</template>

<script>
import Index from '~/components/templates/list/Index.vue'

export default {
  components: {
    Index,
  },
  async asyncData(context) {
    const { dispatch } = context.store;
    await dispatch('toggleLoading', true);
    await dispatch('list/getCharacterList');
    await dispatch('toggleLoading', false);
  }
}
</script>

