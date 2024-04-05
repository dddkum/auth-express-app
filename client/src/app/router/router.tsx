import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { MainPage } from '../../pages/MainPage'
import { useAuthStore } from '../store/auth_store.ts'
import { AuthPage } from '../../pages/AuthPage'
import { Navbar } from '../../widgets/Navbar'
import MainLayout from '../../main-layout.tsx'

const Router = () => {
    const { token } = useAuthStore()

    return (
        <BrowserRouter>
            {token && <Navbar />}
            <MainLayout>
                <Routes>
                    <Route
                        path="/auth"
                        element={
                            !token ? <AuthPage /> : <Navigate to="/" replace />
                        }
                    />
                    <Route
                        path="/"
                        element={
                            token ? (
                                <MainPage />
                            ) : (
                                <Navigate to="/auth" replace />
                            )
                        }
                    />
                    <Route
                        path="/gallery"
                        element={
                            token ? (
                                <MainPage />
                            ) : (
                                <Navigate to="/auth" replace />
                            )
                        }
                    />
                    <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
            </MainLayout>
        </BrowserRouter>
    )
}

export default Router
