<template>
  <InputArea :editParameter="editData" />
</template>

<script>
import InputArea from '~/components/organisms/InputArea.vue';

export default {
  components: {
		InputArea,
  },
  props: {
    editData: {
      type: Object,
      required: true,
    }
  },
}
</script>

<style lang="scss" module>
@import '~/components/templates/add/Index.scss'
</style>