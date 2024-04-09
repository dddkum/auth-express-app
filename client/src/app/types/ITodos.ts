export interface ITodos {
    todos: ITodo[]
}

interface ITodo {
    todo: string
    noteDate: Date
    deadLineDate: Date
}
