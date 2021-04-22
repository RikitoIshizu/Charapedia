<template>
	<InputArea :isAdd="true" />
</template>

<script>
import InputArea from '~/components/organisms/InputArea.vue';

export default {
	components: {
		InputArea,
	},
}
</script>

<style lang="scss" module>
@import '~/components/templates/add/Index.scss'
</style>


