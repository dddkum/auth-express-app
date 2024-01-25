import {BrowserRouter as Router, Routes, Route, Navigate} from "react-router-dom";
import LoginPage from "./pages/login_page";
import MainPage from "./pages/main_page";
import MainLayout from "./main-layout";
import {useAuthStore} from "./store/auth_store";

function App() {
    const {isAuthenticated} = useAuthStore();

    return (
        <MainLayout>
            <Router>
                <Routes>
                    <Route path="/" element={isAuthenticated ? <Navigate to="/main"/> : <Navigate to="/login"/>}/>
                    <Route path="/login" element={<LoginPage/>}/>
                    <Route path="/main" element={<MainPage/>}/>
                </Routes>
            </Router>
        </MainLayout>
    );
}

export default App;
