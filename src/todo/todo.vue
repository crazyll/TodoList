<template>
  <section class="real-app">
      <input 
        type="text" 
        class="add-input"
        autofocus
        v-bind:placeholder="placehold"
        v-model="newItem"
        v-on:keyup.enter = "addItem()"
      />
       <Item 
        :todo="todo"
        v-for="todo in filteredTodos"
        :key="todo.id"
        @del="deleteTodos"
        />
      <Tabs 
        :filter="filter" 
        v-bind:sum = "remainTodos.length"
        v-on:toggle="filterChanged"
        @delCompeleted="todos = remainTodos"
      />
  </section>
</template>

<script>
import Item from './item.vue'
import Tabs from './tabs.vue'

let id = 2;
export default {
  data(){
      return {
          placehold: "今天有什么特别的计划呢？",
          newItem: "",
          filter: "active",
          todos: [
              {id: 0, completed: false, content: "Keep codding."},
              {id: 1, completed: false, content: "Stay hungry."}
          ],
      }
  },
  components: {
    Item,
    Tabs,
  },
  computed: {
      filteredTodos: function(){
          if(this.filter === "all"){
              return this.todos
          }else{
              var flag = this.filter === "active" ? false : true
              var filtered = this.todos.filter(function(item, index){
                  if(item.completed === flag){
                        return true
                  }
                })
                return filtered
          }         
      },
      remainTodos: function(){
          return this.todos.filter(function(item, index){
                if(item.completed === false){
                    return true
                }
            })
      },


  },
  methods: {
      addItem: function(e){
        if(!(this.newItem.trim())){
        return
        }
        this.filteredTodos.unshift({
            id: id++,
            content: this.newItem.trim(),
            completed: false
        })           
        this.newItem = ""
      },
      deleteTodos: function(id){
          this.filteredTodos.forEach((item, index)=>{
              if(item.id === id){
                  this.filteredTodos.splice(index, 1)
              }
          })
      },
      filterChanged: function(state){
          this.filter = state
      }
  }
}
</script>

<style lang="stylus" scoped>
.real-app{
    width 600px
    margin :0px  auto
    box-shadow :0px 0px 5px #666
}
.add-input{
    positon:relative;
    margin 0px
    width 100%
    font-size 24px
    font-family  inherit 
    font-weight:inherit
    line-height 1.4rem
    border 0;
    outline none 
    color inherit
    padding 6px
    border 1px solid #999
    box-shadow: inset 0 -1px 5px 0px rgba(0,0,0,0)
    box-sizing border-box
    font-smoothing:antialiased;
    padding 16px 16px 16px 60px
    border none  
}
</style>
