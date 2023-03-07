<template>
  <div class="toast-container">
    <todo-list-new />
    <section class="container">
      <div class="row justify-content-center m-2">
        <todo-list-main/>
      </div>
    </section>
  </div>
</template>

<script>

import { ref, readonly, provide, onMounted } from 'vue'
import { useStorage } from '../compositions/storage'
import TodoListNew from './TodoListNew.vue'
import TodoListMain from './TodoListMain.vue'

export default {
  components:{
    TodoListNew,
    TodoListMain,
  },
  name: 'TodoListContainer',
  setup(){
    const todos = ref([]);
    const { loadTodos,
      saveTodos,
      storage_id
    } = useStorage()

    /*loadTodos 에서 LocalStorage 에 들어있는 데이터를 꺼내 배열 형태로 todos 에 담음 */
    const initTodos = () =>{
      todos.value = loadTodos();
    }

    const addTodo = (job,date) => {
      todos.value.push({
        id:storage_id.value++,
        job:job,
        date:date,
        completed:false,
      })
      saveTodos(todos)
      initTodos()
    }

    /* 삭제 */
    const removeTodo = (id) =>{
      //splice =  id 부터 1개 삭제
      todos.value.splice(id,1)
      // todo.id 를 재정렬
      todos.value.forEach((todo,idx)=>{
        todo.id=idx
      })

      saveTodos(todos)
      initTodos()
    }

    /* 체크박스 체크 = 완료 */
    const completeTodo = (id)=>{
      //find = 배열에서 가장 빠른 같은 값을 찾아낸다.
      todos.value.find((todo)=> todo.id == id).completed =true
      saveTodos(todos)
      initTodos()
    }

    provide('todos', readonly(todos))
    provide('addTodo', addTodo);
    provide('removeTodo', removeTodo);
    provide('completeTodo', completeTodo);

    //mounted 시점에 초기화
    onMounted(()=>{
      initTodos();
    });
  }
}

</script>