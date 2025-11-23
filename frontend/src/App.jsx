import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import { AuthProvider } from './context/AuthContext'
import { useAuth } from './context/AuthContext'

import Login from './pages/Auth/Login'
import Register from './pages/Auth/Register'
import DonorDashboard from './pages/Dashboard/DonorDashboard'
import ReceiverDashboard from './pages/Dashboard/ReceiverDashboard'
import ItemList from './pages/Items/ItemList'
import ItemDetail from './pages/Items/ItemDetail'
import CreateItem from './pages/Items/CreateItem'
import EditItem from './pages/Items/EditItem'
import MyItems from './pages/Items/MyItems'
import RequestList from './pages/Requests/RequestList'
import RequestDetail from './pages/Requests/RequestDetail'

import Layout from './components/Layout/Layout'
import PrivateRoute from './components/Common/PrivateRoute'

function App() {
  return (
    <AuthProvider>
      <Router>
        <Toaster position="top-right" />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          
          <Route path="/" element={<PrivateRoute><Layout /></PrivateRoute>}>
            <Route index element={<Dashboard />} />  {/* Single dashboard for all */}
            <Route path="items" element={<ItemList />} />
            <Route path="items/:id" element={<ItemDetail />} />
            <Route path="items/create" element={<CreateItem />} />  {/* ✅ No role check */}
            <Route path="items/edit/:id" element={<EditItem />} />  {/* ✅ No role check */}
            <Route path="my-items" element={<MyItems />} />  {/* ✅ No role check */}
            <Route path="requests" element={<RequestList />} />
            <Route path="requests/:id" element={<RequestDetail />} />
          </Route>
          
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </AuthProvider>
  )
}

import Dashboard from './pages/Dashboard/Dashboard'

export default App
