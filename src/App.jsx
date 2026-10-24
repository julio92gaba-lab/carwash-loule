import { Routes, Route } from 'react-router-dom'
import { AuthProvider } from './lib/auth'
import PublicLayout from './routes/PublicLayout'
import AdminLayout from './routes/AdminLayout'
import ProtectedRoute from './routes/ProtectedRoute'

import Home from './pages/public/Home'
import About from './pages/public/About'
import Privacy from './pages/public/Privacy'

import Login from './pages/admin/Login'
import AdminPreview from './pages/admin/AdminPreview'

export default function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route element={<PublicLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/sobre" element={<About />} />
          <Route path="/privacidade" element={<Privacy />} />
        </Route>

        <Route path="/admin/login" element={<Login />} />

        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<AdminPreview page="Visão geral" />} />
          <Route path="agenda" element={<AdminPreview page="Agenda" />} />
          <Route path="clientes" element={<AdminPreview page="Clientes" />} />
          <Route path="financeiro" element={<AdminPreview page="Financeiro" />} />
          <Route path="stock" element={<AdminPreview page="Stock" />} />
          <Route path="definicoes" element={<AdminPreview page="Definições" />} />
        </Route>
      </Routes>
    </AuthProvider>
  )
}
