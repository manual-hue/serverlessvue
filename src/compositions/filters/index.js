import { inject } from 'vue'

export const index = () => {
    const today = inject('today')
    const fnSort = (a, b)=>{
        const a_date = Date.parse(a.date)
        const b_date = Date.parse(b.date)
        if (a_date > b_date) return 1
        else if (a_date < b_date) return 0
        else return a.id - b.id ;
    }

    const getPendingTodos = (todos) => {  // 처리기한 넘은 리스트
        return todos.value.filter((todo)=> todo.date < today && !todo.completed)
            .slice()
            .sort(fnSort)
    }
    const getActiveTodayTodos = (todos) => { // 오늘 완성되지않은 리스트
        return todos.value.filter((todo) => todo.date == today && !todo.completed)
            .slice()
            .sort(fnSort)
    }
    const getCompletedTodayTodos = (todos) =>{  //오늘 완성된 리스트
        return todos.value.filter((todo) => todo.date == today && todo.completed)
            .slice()
            .sort(fnSort)
    }
    const getAllTodayTodos = (todos) => {  // 오늘 모든 리스트
        return getActiveTodayTodos(todos).concat(getCompletedTodayTodos(todos))
            .slice()
            .sort(fnSort)
    }
    const getAllTodos = (todos) => {  // 전체 기간 모든 리스트
        return todos.value.slice().sort(fnSort)
    }
    return {
        getPendingTodos,
        getActiveTodayTodos,
        getCompletedTodayTodos,
        getAllTodayTodos,
        getAllTodos,
    }
}
