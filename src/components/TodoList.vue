<template>
  <main>
    <div v-for="(todo, idx) in data" :key="todo.id">
      <div class="input-group my-2 input-group-sm">
        <div class="input-group-text">
          <input type="checkbox" class="form-check-input mt-0" :checked="todo.completed" :disabled="todo.completed" @click="completeTodo(todo.id)" />
        </div>
        <div class="input-group-text">
          <input type="date" class="form-input mt-0" :min="today" disabled :value="todo.date" />
        </div>
        <input type="text" class="form-control" :value="todo.job" />
        <button class="btn btn-outline-primary dropdown-toggle" type="button" data-bs-toggle="dropdown">📂</button>
        <ul class="dropdown-menu dropdown-menu-end">
          <li v-for="item in menu" :key="item.str">
            <a @click="item.func(todo.id)" class="dropdown-item">
              {{item.str}}
            </a>
          </li>
        </ul>
      </div>
      <div v-show="idx + 1 < data.length" class="col border border-second" />
    </div>
  </main>
</template>

<script>
import { inject } from 'vue'
export default {
  name: 'TodoList',
  props:{
    data:{
      type: Array,
      default: [],
    },
  },
  setup(){
    const removeTodo = inject('removeTodo');
    const completeTodo = inject('completeTodo');
    const today = inject('today');
    const menu = [
      {
        str:'삭제',
        func:removeTodo,
      },
      {
        str:'완료',
        func:completeTodo,
      },
    ]

    return {
      menu,
      today,
      completeTodo,
    }
  },
}
</script>