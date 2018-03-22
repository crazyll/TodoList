<template>
  <div class="helper">
      <span class="left">{{sum}} items left</span>
      <span class="tabs">
          <span 
            v-for="state in states" 
            :key="state"
            :class="[state, filter === state ? 'actived':'']"
            @click="toggleFilter(state)"
            >
              {{state}}
          </span>
      </span>
      <span class="clear" @click="clearAllCompelete()">
         Clear completed
      </span>

  </div>
</template>

<script>
export default {
    props:{
        filter:{
            required: true,
            type: String,
        } ,
        sum:{
            required: true,
            type: Number
        }
    },
    data(){
        return{
            states: ["all", "active", "completed"]
        }
    },
    methods: {
        toggleFilter: function(state){
            // this.filter = state//不允许在子组件上修改父组件的数据
            this.$emit("toggle", state)
        },
        clearAllCompelete: function(){
            this.$emit("delCompeleted")
        }
    }
}
</script>

<style lang="stylus" scoped>
.helper{
    font-weight 100
    display flex
    justify-content space-between
    padding 5px 0
    line-height 30px
    background-color #ffffff
    font-size 14px
    font-smoothing:antialiased;
}
.left,.clear,.tabs{
    padding 0px 10px
    box-sizing border-box
}
.left,.clear{
    width 150px
}
.left{
    text-align left 
}
.clear {
    text-align:right
    cursor pointer
}
.tabs{
    width 200px
    display flex
    justify-content space-around
    *{
        display inline-block
        padding 0px 10px
        cursor pointer
        border 1px solid rgba(175,47,47,0)
        &.actived{
            border-color rgba(175,47,47,0.4) 
            border-radius 5px
        }
    }
}
</style>
