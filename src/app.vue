<template>
	<div id="app">
		<div class="cover"></div>
		<Header></Header>
		<todo></todo>
		<Footer></Footer>
	</div>
</template>

<script>
import Header from './todo/header.vue'
import Footer from './todo/footer.jsx'
import todo from './todo/todo.vue'

export default{
		data(){
			return{
				text:'d54900099'
			}
		},
		components: {
			Header,
			Footer,
			todo,
		}
}
</script>

<style lang="stylus" scoped>
#app{

}
.cover{
	left 0
	right 0
	top 0
	bottom 0
	position absolute
	opacity .4
	background-color #999
	z-index -1
}
</style>