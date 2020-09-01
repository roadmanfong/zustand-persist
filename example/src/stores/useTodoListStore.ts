import createStore from 'zustand'
import persist from '../utils/persist'

interface Todo {
  id: string
  date: string
  text: string
  completed: boolean
}

type TodoRequest = Pick<Todo, 'date' | 'text' | 'completed'>

interface TodoListStore {
  isLoading: boolean
  data: Todo[]
  errorMessage: string
  create: (todoRequest: TodoRequest) => void
  remove: (todoId: string) => void
  update: (todoId: string, todoRequest: TodoRequest) => void
}

const useTodoListStore = createStore<TodoListStore>(
  persist(
    {
      key: 'todoList',
      denylist: ['isLoading', 'errorMessage'],
    },
    (set) => ({
      isLoading: false,
      errorMessage: '',
      data: [
        {
          id: '1',
          text: 'first note',
          date: new Date().toISOString(),
          completed: false,
        },
      ],
      create: (todoRequest) => {
        set((state) => ({
          data: [
            {
              id: new Date().getTime().toString(),
              ...todoRequest,
            },
            ...state.data,
          ],
        }))
      },
      remove: (todoId) => {
        set((state) => ({
          data: state.data.filter((item) => item.id !== todoId),
        }))
      },
      update: (todoId, todoRequest) => {
        set((state) => ({
          data: state.data.map((item) =>
            item.id === todoId
              ? {
                  ...item,
                  ...todoRequest,
                }
              : item
          ),
        }))
      },
    })
  )
)

export default useTodoListStore
