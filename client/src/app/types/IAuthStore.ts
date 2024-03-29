export type AuthStore = {
    token: string | null
    setToken: (arg: string | null) => void
    isAuthenticated: boolean
    setIsAuthenticated: (isAuthorized: boolean) => void
    reset: () => void
}
