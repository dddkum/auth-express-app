import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import ReactDOM from 'react-dom/client'
import { ToastContainer } from 'react-toastify'
import Router from '@/app/router/router.tsx'
import '@/app/styles/main.scss'
import 'react-toastify/dist/ReactToastify.css'
import 'react-datepicker/dist/react-datepicker.css'

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')!).render(
    <QueryClientProvider client={queryClient}>
        <Router />
        <ToastContainer />
    </QueryClientProvider>
)
