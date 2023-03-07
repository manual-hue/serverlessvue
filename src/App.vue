<template>
  <header>
    <hgroup class="my-5">
      <h1>To-do-list</h1>
      <em>Today({{ today }}) is the day.</em>
    </hgroup>
  </header>
   <todo-list-container/>
</template>

<script>
import { inject } from 'vue'
import TodoListContainer from './components/TodoListContainer.vue'

export default {
  name:'App',
  setup(){
    const today = inject('today')
    return{ today }
  },
  components: { TodoListContainer },
}
</script>

<style scoped>
.toast-container {
  margin: 0 auto;
  position: revert !important;
  pointer-events: revert !important;
}

hgroup {
  text-align: center;
  font-family: 'Arial Bold';
}

hgroup h1 {
  font-weight: bolder;
}
</style>
