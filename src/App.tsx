
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
import { FamilyRoute } from './routes/FamilyRoute'
import { FamilySetupLayout } from './components/layouts/FamilySetupLayout'
import { NoFamilyRoute } from './routes/NoFamilyRoute'

const HomePage = lazy(() => import("./pages/HomePage"));
const LoginPage = lazy(() => import("./pages/auth/LoginPage"));
const RegisterPage = lazy(() => import("./pages/auth/RegisterPage"));

const FamilySetupPage = lazy(() => import("./pages/setup/FamilySetupPage"));
const FamilyCreatePage = lazy(() => import("./pages/setup/FamilyCreatePage"));
const FamilyJoinPage = lazy(() => import("./pages/setup/FamilyJoinPage"));

const DashboardPage = lazy(() => import("./pages/app/DashboardPage"));
const TasksPage = lazy(() => import("./pages/app/TasksPage"));

function App() {


  return (

    <AppProviders>
      <BrowserRouter>
        <Suspense fallback={<Loader />}>

          <Routes>

            <Route element={<PublicRoute />}>
              <Route element={<PublicLayout />}>
                <Route index element={<HomePage />} />
              </Route>

              <Route element={<AuthLayout />}>
                <Route path="login" element={<LoginPage />} />
                <Route path="register" element={<RegisterPage />} />
              </Route>
            </Route>


            <Route element={<ProtectedRoute />}>
              <Route element={<NoFamilyRoute />}>
                <Route element={<FamilySetupLayout />}>

                  <Route
                    path="/setup"
                    element={<FamilySetupPage />}
                  />

                  <Route
                    path="/create"
                    element={<FamilyCreatePage />}
                  />

                  <Route
                    path="/join"
                    element={<FamilyJoinPage />}
                  />

                </Route>
              </Route>


              <Route element={<FamilyRoute />}>

                <Route element={<AppLayout />}>
                  {/* dashboard, tasks... */}
                  <Route path='/dashboard' element={<DashboardPage />}/>
                  <Route path='/tasks' element={<TasksPage />}/>
                </Route>

              </Route>

            </Route>

          </Routes>
        </Suspense>
      </BrowserRouter>
    </AppProviders>
  )
}

export default App

