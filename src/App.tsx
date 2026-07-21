
import { Routes } from 'react-router'
import './App.css'
import { AppProviders } from './providers/AppProvider'
import { Route } from 'react-router'
import { PublicLayout } from './components/layouts/PublicLayout'
import { PublicRoute } from './routes/PublicRoute'
import { ProtectedRoute } from './routes/ProtectedRoute'
import { AppLayout } from './components/layouts/AppLayout'

import { BrowserRouter } from 'react-router'
import { AuthLayout } from './components/layouts/AuthLayout'

import { lazy, Suspense } from "react";
import { Loader } from './components/ui/Loader'

const HomePage = lazy(() => import("./pages/HomePage"));
const LoginPage = lazy(() => import("./pages/LoginPage"));
const RegisterPage = lazy(() => import("./pages/RegisterPage"));
function App() {


  return (

    <AppProviders>
      <BrowserRouter>
        <Suspense fallback={<Loader />}>

          <Routes>

            {/* Public + Auth (только для неавторизованных) */}
            <Route element={<PublicRoute />}>
              <Route element={<PublicLayout />}>
                <Route index element={<HomePage />} />
              </Route>

              <Route element={<AuthLayout />}>
                <Route path="login" element={<LoginPage />} />
                <Route path="register" element={<RegisterPage />} />
              </Route>
            </Route>


            {/* App (только для авторизованных) */}
            <Route element={<ProtectedRoute />}>
              <Route element={<AppLayout />}>
                {/* routes */}
              </Route>
            </Route>

          </Routes>
        </Suspense>
      </BrowserRouter>
    </AppProviders>
  )
}

export default App

