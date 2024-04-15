import { useEffect } from 'react'
import { useQuery } from '@tanstack/react-query'
import $api from '@/app/api/api.ts'
import { useTodosStore } from '@/app/store/todos_store.ts'
import background from '@/shared/images/diary_background.webp'
import { PageLoader } from '@/shared/loaders'
import DiaryTodoForm from './diary_todo_form.tsx'
import DiaryTodosList from './diary_todos_list.tsx'

export const DiaryPage = () => {
    const { setTodos } = useTodosStore()
    const { isLoading, data } = useQuery({
        queryKey: ['todos'],
        queryFn: async () => {
            return $api.get('/todos')
        },
        staleTime: 600000,
    })

    useEffect(() => {
        if (data !== null) {
            setTodos(data?.data)
        }
    }, [data])

    return (
        <>
            <PageLoader loading={isLoading} />
            {!isLoading && (
                <>
                    <DiaryTodoForm />
                    <DiaryTodosList />
                    <img
                        src={background}
                        className="w-100 h-100 position-fixed top-0 start-0 img-fluid"
                        style={{ zIndex: '-1' }}
                        alt="background-image"
                    />
                </>
            )}
        </>
    )
}
