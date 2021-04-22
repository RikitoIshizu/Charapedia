<template>
  <input class="inputDesign" type="text" @input="onChangeValue"/>
</template>

<script>
export default {
	methods: {
		onChangeValue(e) {
			this.$emit('onChangeValue', e.target.value, this.$attrs.name);
		}
	}
}
</script>

<style lang="scss">
@import '~/components/atoms/Input.scss'
</style>
