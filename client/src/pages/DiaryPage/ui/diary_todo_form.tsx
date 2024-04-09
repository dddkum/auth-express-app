import { useMutation } from '@tanstack/react-query'
import { AxiosError, AxiosResponse } from 'axios'
import DatePicker, { ReactDatePickerProps } from 'react-datepicker'
import { Controller, FieldError, FieldErrors, useForm } from 'react-hook-form'

import $api from '../../../app/api/api.ts'
import { useTodosStore } from '../../../app/store/todos_store.ts'
import { customToast } from '../../../shared/hooks/UseCustomToast/UseCustomToast.ts'

interface IFormData {
    todo: string
    noteDate: ReactDatePickerProps
    deadLineDate: ReactDatePickerProps
}

const DiaryTodoForm = () => {
    const {
        register,
        handleSubmit,
        control,
        formState: { isValid },
    } = useForm<IFormData>({
        defaultValues: {
            noteDate: new Date(),
            deadLineDate: new Date(),
        },
    })
    const { setTodos, todos } = useTodosStore()

    const onSubmit = data => {
        postTodo.mutate(data)
        setTodos([...todos, data])
    }

    const handleValidationError = (errors: FieldErrors<FieldError>) => {
        for (const [_, error] of Object.entries(errors)) {
            customToast({
                message: (error.message ?? error) as string,
                type: 'error',
            })
        }
    }

    const postTodo = useMutation<AxiosResponse, AxiosError<void, void> | any>({
        mutationFn(formData) {
            return $api.post('/todo', formData)
        },
        onSuccess() {
            customToast({ message: 'Задание записано', type: 'success' })
        },
        onError(error) {
            customToast({
                message: error.response.data.message,
                type: 'error',
            })
        },
    })
    return (
        <div className="px-5 py-3 w-50 mx-auto">
            <form
                onSubmit={handleSubmit(onSubmit, handleValidationError)}
                className="d-flex flex-column align-items-center"
            >
                <div className="w-100">
                    <label>Введите дату получения задания</label>
                    <Controller
                        control={control}
                        name="noteDate"
                        render={({ field }) => (
                            <DatePicker
                                {...field}
                                wrapperClassName="w-100 mb-3"
                                className="w-100"
                                selected={field.value}
                                onChange={date => field.onChange(date)}
                            />
                        )}
                    />
                </div>

                <div className="w-100">
                    <label>Введите крайний срок сдачи задания</label>
                    <Controller
                        control={control}
                        name="deadLineDate"
                        render={({ field }) => (
                            <DatePicker
                                {...field}
                                wrapperClassName="w-100 mb-3"
                                className="w-100"
                                selected={field.value}
                                onChange={date => field.onChange(date)}
                            />
                        )}
                    />
                </div>

                <div className="w-100">
                    <label>Опишите задачу</label>
                    <textarea
                        {...register('todo', {
                            required: 'Это поле обязательно для заполнения',
                        })}
                        className="w-100 mb-3"
                    />
                </div>

                {isValid && (
                    <button
                        type="submit"
                        className="btn btn-outline-dark fw-bold w-50"
                    >
                        Записать задание
                    </button>
                )}
            </form>
        </div>
    )
}

export default DiaryTodoForm
