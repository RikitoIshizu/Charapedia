<template>
    <button @click="onClick">
			{{ text }}
		</button>
</template>

<script>
export default {
	props: {
		text: {
			type: String,
			required: true,
		},
	},
	methods: {
		onClick() {
			this.$emit('onClick');
		}
	}
}
</script>

<style lang="scss" module>
@import '~/components/atoms/Button.scss'
</style>