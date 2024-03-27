import {
    BrowserRouter as Router,
    Routes,
    Route,
    Navigate,
} from 'react-router-dom'
import MainLayout from './main-layout'
import { useAuthStore } from './app/store/auth_store'
import { AuthPage } from './pages/AuthPage'
import { MainPage } from './pages/MainPage'

function App() {
    const { isAuthenticated } = useAuthStore()

    return (
        <MainLayout>
            <Router>
                <Routes>
                    <Route
                        path="/"
                        element={
                            isAuthenticated ? (
                                <Navigate to="/main" />
                            ) : (
                                <Navigate to="/auth" />
                            )
                        }
                    />
                    <Route path="/auth" element={<AuthPage />} />
                    <Route path="/main" element={<MainPage />} />
                </Routes>
            </Router>
        </MainLayout>
    )
}

export default App
