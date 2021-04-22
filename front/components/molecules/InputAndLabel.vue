<template>
  <div :class="$style.inputList">
		<label :for="name" :class="$style.inputListLabel">
      {{ label }}
    </label>
		<Input
      :id="name"
      :name="name"
      :value="value"
      @onChangeValue="onChangeValue"
      :class="isInputError ? $style.inputListBorder : null"
    />
	</div>
</template>

<script>
import Input from '~/components/atoms/Input.vue'

export default {
  props: {
    name: {
      type: String,
      required: true,
    },
    value: {
      type: [String, Number],
      required: true,
    },
    label: {
      type: String,
      required: true,
    },
    isInputError: {
      type: Boolean,
      required: false,
      default: false,
    }
  },
  components: {
    Input
  },
	methods: {
		onChangeValue(value, name) {
			this.$emit('onChangeValue', value, name);
		}
	}
}
</script>

<style lang="scss" module>
@import '~/components/molecules/InputAndLabel.scss'
</style>