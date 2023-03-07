import { reactive ,toRefs } from "vue";

export const useStorage = () =>{
    const KEY = 'my-todo-list';
    const storage_obj = reactive({ storage_id: 0});
    const loadTodos = () => {
        let  temp_todos=  JSON.parse(localStorage.getItem(KEY)||'[]');
        temp_todos.forEach((todo,idx)=>{
            todo.id=idx
        })
        //추가될 storage.id 값
        storage_obj.storage_id = temp_todos.length
        return temp_todos;
    }
    const saveTodos=(todos)=>{
        localStorage.setItem(KEY,JSON.stringify(todos.value))
    }
    return{
        ...toRefs(storage_obj),
        loadTodos,
        saveTodos
    }

}