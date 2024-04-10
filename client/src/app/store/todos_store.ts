import { create } from 'zustand'

import { ITodos } from '../types/ITodos.ts'

export const useTodosStore = create<ITodos>(set => ({
    todos: [],
    setTodos: todos => set({ todos }),
}))
