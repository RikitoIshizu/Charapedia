<template>
	<Frame :class="$style.list">
		<Title>登録されているキャラクター一覧</Title>
		<nuxt-link to="add">キャラクターを追加する</nuxt-link>
		<div :class="$style.searchArea">
			<h2>キャラクターを検索する</h2>
			<Input 
				name="searchText"
				label="キャラクターを検索する"
				:value="searchText"
				@onChangeValue="changeSearchText"
			/>
			<select :class="$style.searchAreaSelect">

			</select>
		</div>
		<table :class="$style.listTable">
			<thead>
				<tr :class="$style.listTableTrThead">
					<th v-for="(item, index) in tableHeader" :key="index" :class="$style.listTableTh">
						{{ item }}
					</th>
				</tr>
			</thead>
			<tbody>
				<tr v-for="item in displayData" :key="item.id" :class="$style.listTableTr">
					<th :class="$style.listTableTdEx">
						<nuxt-link :to="`/list/edit?id=${item.id}`">
							{{ item.id }}
						</nuxt-link>
					</th>
					<th :class="$style.listTableTd">{{ item.name }}</th>
					<th :class="$style.listTableTd">{{ item.age }}</th>
					<th :class="$style.listTableTd">{{ item.producation }}</th>
					<th :class="$style.listTableTd">{{ item.skill }}</th>
					<th :class="$style.listTableTd">{{ item.type }}</th>
					<th :class="$style.listTableTdEx">{{ item.is ? '生存' : '死亡' }}</th>
				</tr>
			</tbody>
		</table>
	</Frame>
</template>

<script>
// import { mapGetters } from 'vuex';
import Input from '~/components/atoms/Input.vue';
import Title from '~/components/atoms/Title.vue';
import Frame from '~/components/molecules/Frame.vue';
import InputAndLabel from '~/components/molecules/InputAndLabel.vue';

export default {
	components: {
		Input,
		Title,
		Frame,
		InputAndLabel,
	},
	data() {
		return {
			displayData: [],
			searchText: '',
			tableHeader: ['ID', '名前', '年齢', '出演作品', '能力', 'タイプ', '現在'],
			selectOptions: [
				{ id: 0, value: '検索項目' },
				{ id: 1, value: '名前' },
				{ id: 2, value: '年齢' },
				{ id: 3, value: '出演作品' },
				{ id: 4, value: '能力' },
				{ id: 5, value: 'タイプ' },
				{ id: 6, value: '死亡' },
			]
		}
	},
	mounted() {
		this.$set(this, 'displayData', this.$store.state.list.list);
	},
	methods: {
		// 検索用の文字を変更する
		changeSearchText(value) {
			this.$set(this, 'searchText', value);
		}
	}
}
</script>

<style lang="scss" module>
@import '~/components/templates/list/Index.scss'
</style>

