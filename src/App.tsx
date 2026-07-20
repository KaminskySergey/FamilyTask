
import { Routes } from 'react-router'
import './App.css'
import { AppProviders } from './providers/AppProvider'
import { Route } from 'react-router'
import { PublicLayout } from './components/layouts/PublicLayout'
import { PublicRoute } from './routes/PublicRoute'
import { ProtectedRoute } from './routes/ProtectedRoute'
import { AppLayout } from './components/layouts/AppLayout'
import HomePage from './pages/HomePage'
import { BrowserRouter } from 'react-router'

function App() {


  return (

    <AppProviders>
      <BrowserRouter>
        <Routes>
          <Route element={<PublicLayout />}>
            <Route index element={<HomePage />} />

            <Route element={<PublicRoute />}>
              {/* <Route path="login" element={<LoginPage />} />
            <Route path="register" element={<RegisterPage />} /> */}
            </Route>
          </Route>

          {/* Private */}
          <Route element={<ProtectedRoute />}>
            <Route element={<AppLayout />}>
              {/* <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/dashboard/profile" element={<ProfilePage />} /> */}
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </AppProviders>
  )
}

export default App

