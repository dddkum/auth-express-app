import {
    BrowserRouter,
    Navigate,
    Route,
    Routes,
    useLocation,
} from 'react-router-dom'
import MainLayout from '@/main-layout.tsx'
import { AuthPage } from '@/pages/AuthPage'
import { DiaryPage } from '@/pages/DiaryPage'
import { MainPage } from '@/pages/MainPage'
import { Navbar } from '@/widgets/Navbar'
import { useAuthStore } from '../store/auth_store.ts'

const AppRoutes = () => {
    const { token } = useAuthStore()
    const location = useLocation()

    return (
        <Routes location={location}>
            <Route
                path="/auth"
                element={!token ? <AuthPage /> : <Navigate to="/" replace />}
            />
            <Route
                path="/"
                element={token ? <MainPage /> : <Navigate to="/auth" replace />}
            />
            <Route
                path="/diary"
                element={
                    token ? <DiaryPage /> : <Navigate to="/auth" replace />
                }
            />
            <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
    )
}

export default function Router() {
    const { token } = useAuthStore()

    return (
        <BrowserRouter>
            {token && <Navbar />}
            <MainLayout>
                <AppRoutes />
            </MainLayout>
        </BrowserRouter>
    )
}
