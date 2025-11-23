import { NavLink } from 'react-router-dom'
import {
  LayoutDashboard,
  Package,
  FileText,
  PlusCircle,
  Inbox
} from 'lucide-react'

const Sidebar = () => {
  const links = [
    { to: '/', icon: LayoutDashboard, label: 'Dashboard' },
    { to: '/items', icon: Package, label: 'Browse Items' },
    { to: '/my-items', icon: Inbox, label: 'My Items' },
    { to: '/items/create', icon: PlusCircle, label: 'Create Item' },
    { to: '/requests', icon: FileText, label: 'Requests' }
  ]

  return (
    <aside className="fixed left-0 top-16 h-[calc(100vh-4rem)] w-64 bg-white border-r border-gray-200 overflow-y-auto">
      <nav className="p-4 space-y-2">
        {links.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            end={link.to === '/'}
            className={({ isActive }) =>
              `flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                isActive
                  ? 'bg-primary-50 text-primary-600'
                  : 'text-gray-700 hover:bg-gray-50'
              }`
            }
          >
            <link.icon className="w-5 h-5" />
            <span className="font-medium">{link.label}</span>
          </NavLink>
        ))}
      </nav>
    </aside>
  )
}

export default Sidebar