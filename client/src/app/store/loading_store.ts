import { create } from 'zustand'
import { LoadingStore } from '../types/ILoading.ts'

export const useLoadingStore = create<LoadingStore>(set => ({
    isLoading: false,
    setIsLoading: isLoading => set({ isLoading }),
}))
