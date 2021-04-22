<template>
  <Frame>
    <Title>
      {{ isAdd ? '新たにキャラクターを登録' : '登録済みのキャラクターを編集' }}
    </Title>
		<div :class="$style.backButton">
			<nuxt-link to="/list">一覧に戻る</nuxt-link>
		</div>
    <ol>
      <li v-for="item in errorMessage" :key="item.msg" :class="$style.errorMessage">
        {{ item.msg }}
      </li>
    </ol>
    <div v-if="!isAdd" :class="$style.deleteButton">
			<Button text="キャラクターを削除する" @onClick="deleteCharacter" />
		</div>
		<form>
			<InputAndLabel
				v-for="item in inputList"
				:key="item.name"
				v-bind="{
					name: item.name,
					value: item.value,
					label: item.label,
          isInputError: isOccuredError(item.name)
				}"
				:class="$style.inputList"
				@onChangeValue="changeValue"
			/>
			<div :class="$style.inputList">
				<label :class="$style.inputListLabel">現在</label>
				<div :class="$style.inputListRadio" @click="changeIs(1)">
					<input type="radio" id="isYes" name="is" :checked="is" :class="$style.inputListRadioInput"/>
					<label for="isYes" :class="$style.inputListRadioLabel">生存</label>
				</div>
				<div :class="$style.inputListRadio" @click="changeIs(0)">
					<input type="radio" id="isNot" name="is" :checked="!is" :class="$style.inputListRadioInput"/>
					<label for="isNot" :class="$style.inputListRadioLabel">死亡</label>
				</div>
			</div>
		</form>
    <div>
			<Button :text="isAdd ? '追加' : '変更する'" @onClick="apiAction" />
		</div>
  </Frame>
</template>
 
<script>
import Button from '~/components/atoms/Button.vue';
import Input from '~/components/atoms/Input.vue';
import Title from '~/components/atoms/Title.vue';
import Frame from '~/components/molecules/Frame.vue';
import InputAndLabel from '~/components/molecules/InputAndLabel.vue';

export default {
  components: {
    Button,
		Input,
    Title,
    Frame,
		InputAndLabel,
  },
  props: {
    isAdd: {
      type: Boolean,
      required: false,
      default: false,
    },
    editParameter: {
      type: Object,
      required: false,
      default: null,
    }
  },
  data() {
		return {
			is: 0,
			inputList: [
				{ name: 'name', value: '', label: '名前' },
				{ name: 'age', value: '', label: '年齢' },
				{ name: 'producation', value: '', label: '登場作品' },
				{ name: 'skill', value: '', label: '能力' },
				{ name: 'type', value: '', label: 'タイプ' },
      ],
      errorMessage: [],
		}
  },
  computed: {
    isOccuredError() {
      return name => this.errorMessage.some(el => el.param === name);
    }
  },
  mounted() {
    const { editParameter, inputList, $set } = this;

    if(editParameter) {
      $set(inputList[0], 'value', editParameter.name);
      $set(inputList[1], 'value', editParameter.age);
      $set(inputList[2], 'value', editParameter.producation);
      $set(inputList[3], 'value', editParameter.skill);
      $set(inputList[4], 'value', editParameter.type);
      $set(this, 'is', editParameter.is);
    }
  },
  methods: {
		// 値を変更する
		changeValue(value, name) {
			this.inputList.map((el, index) => {
				if(el.name !== name) return;

				return this.$set(this.inputList[index], 'value', value);
			})
		},

		// 生存かそうじゃないかを変える
		changeIs(value) {
			this.$set(this, 'is', value);
    },

    async apiAction() {
      const parameter = {
				is: this.is,
      };
      
      if(!this.isAdd) parameter.id = Number(this.$route.query.id)

			this.inputList.map(el => {
				parameter[`${el.name}`] = el.name === 'is' ? Number(el.value) : el.value;
				return el;
			});

			this.$store.dispatch('toggleLoading', true);

			await this.$axios.post(`/api/${this.isAdd ? 'add' : 'changeData'}`, parameter).then(response => {
        const { errors } = response.data;
        if(errors) {
          this.$set(this , 'errorMessage' , errors)
        } else {
          this.$router.push('/list');
        }

        this.$store.dispatch('toggleLoading', false);
      });
    },

    // キャラクターを削除する
    async deleteCharacter() {
      const { id, name } = this.editParameter
      const check = window.confirm(`本当に${name}を削除しますか？`);

      if(check) {
        this.$store.dispatch('toggleLoading', true);
        await this.$axios.post('/api/characterDelete', { id }).then(response => {
          if(response.data.message === 'success') {
            this.$router.push('/list');
            this.$store.dispatch('toggleLoading', false);
          }
        });
      }
    }
  }
}
</script>

<style lang="scss" module>
@import '~/components/organisms/InputArea.scss'
</style>
 