import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import { AuthProvider } from './context/AuthContext'

// Auth Pages
import Login from './pages/Auth/Login'
import Register from './pages/Auth/Register'

// Dashboard
import Dashboard from './pages/Dashboard/Dashboard'

// Items
import ItemList from './pages/Items/ItemList'
import ItemDetail from './pages/Items/ItemDetail'
import CreateItem from './pages/Items/CreateItem'
import EditItem from './pages/Items/EditItem'
import MyItems from './pages/Items/MyItems'

// Requests
import RequestList from './pages/Requests/RequestList'
import RequestDetail from './pages/Requests/RequestDetail'

// Layout & Protected Route
import Layout from './components/Layout/Layout'
import PrivateRoute from './components/Common/PrivateRoute'

function App() {
  return (
    <AuthProvider>
      <Router>
        <Toaster position="top-right" />

        <Routes>
          {/* Public */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Protected App Routes */}
          <Route path="/" element={<PrivateRoute><Layout /></PrivateRoute>}>

            {/* Dashboard */}
            <Route index element={<Dashboard />} />

            {/* Items */}
            <Route path="items" element={<ItemList />} />
            <Route path="items/:id" element={<ItemDetail />} />

            {/* Donor-only actions */}
            <Route
              path="items/create"
              element={
                <PrivateRoute allowedRoles={['donor']}>
                  <CreateItem />
                </PrivateRoute>
              }
            />

            <Route
              path="items/edit/:id"
              element={
                <PrivateRoute allowedRoles={['donor']}>
                  <EditItem />
                </PrivateRoute>
              }
            />

            <Route
              path="my-items"
              element={
                <PrivateRoute allowedRoles={['donor']}>
                  <MyItems />
                </PrivateRoute>
              }
            />

            {/* Requests - Both Donor & Receiver */}
            <Route path="requests" element={<RequestList />} />
            <Route path="requests/:id" element={<RequestDetail />} />

          </Route>

          {/* Catch-All Redirect */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </AuthProvider>
  )
}

export default App
