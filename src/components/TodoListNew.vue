<template>
  <section class="mb-5">
    <div class="container">
      <div class="row justify-content-center m-2">
        <div class="col border border-dark rounded">
          <input type="text" id="todo_input" class="form-control my-2" v-model="job" placeholder="Add your To-do-list.">
          <div class="row my-2">
            <div class="col-6">
              <input type="date" v-model="date" :min="today"/>
            </div>
            <div class="col-6">
              <button type="button" class="btn btn-warning btn-sm float-end" @click="onAddTodo">
                + Add
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import {reactive ,inject,toRefs} from 'vue'
export default {
  name:'TodoListNew',
  emits:['newTask'],
  setup(props,context){
    const today= inject('today')
    const addTodo =inject('addTodo');
    const val_obj = reactive({
      job:'',
      date: today,
      today: today,
    })
    const onAddTodo = () =>{

      if(val_obj.job.length > 0){
        //텍스트 내용이 있을 경우 storage 추가
        addTodo(val_obj.job, val_obj.date)
        //input 값 초기화
        val_obj.job = ''
        val_obj.date = today
      }
    }

    return {
      ...toRefs(val_obj),
      onAddTodo
    }
  }
}
</script>