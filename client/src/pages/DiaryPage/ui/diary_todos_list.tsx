import { format } from 'date-fns'

import { useTodosStore } from '../../../app/store/todos_store.ts'

const DiaryTodosList = () => {
    const { todos } = useTodosStore()
    return (
        <div className="mx-auto w-50">
            {todos?.length > 0 ? (
                todos.map((todo, index) => (
                    <div
                        key={index}
                        className="card mb-3 p-3 position-relative"
                    >
                        <span
                            className="badge bg-danger position-absolute rounded-circle"
                            style={{ top: '-5px', left: '-5px' }}
                        >
                            {index}
                        </span>
                        <div className="d-flex flex-column flex-md-row justify-content-between gap-1">
                            <p className="fw-bold m-0">
                                Дата записи: {format(todo.noteDate, 'P')}
                            </p>
                            <p className="fw-bold m-0">
                                Срок выполнения до:{' '}
                                {format(todo.deadLineDate, 'P')}
                            </p>
                        </div>
                        <p className="fw-bold m-0">
                            Задание:{' '}
                            <span className="fw-normal">{todo.todo}</span>
                        </p>
                    </div>
                ))
            ) : (
                <div>Заданий еще нет</div>
            )}
        </div>
    )
}

export default DiaryTodosList
