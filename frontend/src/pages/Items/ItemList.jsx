import { useEffect, useState } from 'react'
import { itemService } from '../../services/itemService'
import { requestService } from '../../services/requestService'
import { CATEGORIES, CONDITIONS } from '../../utils/constants'
import { getImageUrl } from '../../utils/helpers'  // ✅ ADD THIS IMPORT
import toast from 'react-hot-toast'
import { useAuth } from '../../context/AuthContext'

const ItemList = () => {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [requestedItems, setRequestedItems] = useState([])

  const [filters, setFilters] = useState({
    search: '',
    category: '',
    condition: '',
    page: 1,
    limit: 9
  })

  const { user } = useAuth()

  const fetchItems = async () => {
    setLoading(true)
    try {
      const res = await itemService.getItems(filters)
      setItems(res.data || [])
    } catch (error) {
      console.error('Error fetching items:', error)
    } finally {
      setLoading(false)
    }
  }

  const fetchRequestedItems = async () => {
    try {
      const res = await requestService.getRequests()
      const ids = res.data.map(r => r.item._id)
      setRequestedItems(ids)
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    fetchItems()
    fetchRequestedItems()
  }, [])

  useEffect(() => {
    const delay = setTimeout(fetchItems, 300)
    return () => clearTimeout(delay)
  }, [filters.search, filters.category, filters.condition])

  const handleChange = (field, value) => {
    setFilters(prev => ({ ...prev, [field]: value, page: 1 }))
  }

  const handleRequest = async (item) => {
    if (!user) return toast.error('Please login to request items.')

    if (item?.donor?._id === user.id || item.donor === user.id) {
      return toast.error("You cannot request your own item.")
    }

    if (requestedItems.includes(item._id)) {
      return toast.error("Already requested this item.")
    }

    try {
      await requestService.createRequest({ itemId: item._id })
      toast.success("Request sent!")
      setRequestedItems(prev => [...prev, item._id])
    } catch (err) {
      toast.error(err.message || "Request failed")
    }
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Browse Items</h1>

      <div className="card mb-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <input
            type="text"
            className="input-field md:col-span-2"
            placeholder="Search items..."
            value={filters.search}
            onChange={(e) => handleChange('search', e.target.value)}
          />

          <select
            className="input-field"
            value={filters.category}
            onChange={(e) => handleChange('category', e.target.value)}
          >
            <option value="">Category</option>
            {CATEGORIES.map(c => (
              <option key={c.value} value={c.value}>{c.label}</option>
            ))}
          </select>

          <select
            className="input-field"
            value={filters.condition}
            onChange={(e) => handleChange('condition', e.target.value)}
          >
            <option value="">Condition</option>
            {CONDITIONS.map(c => (
              <option key={c.value} value={c.value}>{c.label}</option>
            ))}
          </select>
        </div>
      </div>

      {loading ? (
        <p className="p-4">Loading...</p>
      ) : items.length === 0 ? (
        <div className="card"><p>No matching items.</p></div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {items.map(item => {
            const isOwner = item?.donor?._id === user?.id
            const alreadyRequested = requestedItems.includes(item._id)

            return (
              <div key={item._id} className="card">
                {/* ✅ FIX: Use getImageUrl helper */}
                {item.images?.length > 0 && (
                  <img
                    src={getImageUrl(item.images[0])}
                    alt={item.title}
                    className="w-full h-48 object-cover rounded-lg mb-3"
                    onError={(e) => {
                      e.target.src = '/placeholder-image.png'
                    }}
                  />
                )}

                <h2 className="font-semibold text-lg">{item.title}</h2>
                <p className="text-sm text-gray-600 mb-2">{item.description}</p>

                {/* Button With Conditions */}
                {isOwner ? (
                  <button className="btn-secondary w-full" disabled>Your Item</button>
                ) : alreadyRequested ? (
                  <button className="btn-secondary w-full" disabled>Requested</button>
                ) : (
                  <button className="btn-primary w-full" onClick={() => handleRequest(item)}>
                    Request Item
                  </button>
                )}
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}

export default ItemList