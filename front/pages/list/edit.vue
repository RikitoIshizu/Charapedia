<template>
  <Edit :editData="editData"/>
</template>

<script>
import Edit from '~/components/templates/list/Edit.vue';

export default {
  components: {
    Edit,
  },
  async asyncData(context) {
		const { id } = context.query;
    const getData = await context.$axios.get(`/api/edit?id=${id}`);

    return {
      editData: getData.data,
    }
  }
}
</script>
