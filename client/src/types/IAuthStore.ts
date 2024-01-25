export type AuthStore = {
    token: string;
    isAuthenticated: boolean;
    setToken: (token: string) => void;
    setIsAuthenticated: (isAuthorized: boolean) => void;
    reset: () => void;
};