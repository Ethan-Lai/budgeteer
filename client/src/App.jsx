import { Routes, Route } from 'react-router-dom'
import Dashboard from './pages/Dashboard'
import Login from './pages/Login'
import Register from './pages/Register'
import Settings from './pages/Settings'
import Trips from './pages/Trips'
import { ThemeProvider } from "@/components/ThemeProvider"
import { AppLayout } from './components/layouts/AppLayout'

function App() {
    return (
        <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
            <div className='w-full h-full'>
                <Routes>
                    <Route path='/' element={<Login />} />
                    <Route path='/register' element={<Register />} />

                    {/* App is for protected routes */}
                    <Route path='/app' element={<AppLayout />}>
                        <Route path='dashboard' element={<Dashboard />} />
                        <Route path='settings' element={<Settings />} />
                        <Route path='trips' element={<Trips />} />
                    </Route>
                </Routes>
            </div>
        </ThemeProvider>
    )
}

export default App
