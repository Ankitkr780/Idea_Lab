import { useEffect, useState } from 'react'
import { itemService } from '../../services/itemService'
import { requestService } from '../../services/requestService'
import { CATEGORIES, CONDITIONS } from '../../utils/constants'
import { getImageUrl } from '../../utils/helpers'
import toast from 'react-hot-toast'
import { useAuth } from '../../context/AuthContext'
import { Search, Filter, X } from 'lucide-react'

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

  const clearFilters = () => {
    setFilters({
      search: '',
      category: '',
      condition: '',
      page: 1,
      limit: 9
    })
  }

  const hasActiveFilters = filters.search || filters.category || filters.condition

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
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Browse Items</h1>
        <p className="text-gray-600">Discover stationary items shared by your community</p>
      </div>

      {/* Enhanced Search & Filter Section */}
      <div className="bg-white rounded-2xl shadow-lg p-6 mb-8 border border-gray-100">
        <div className="flex items-center gap-3 mb-4">
          <Filter className="w-5 h-5 text-primary-600" />
          <h2 className="text-lg font-semibold text-gray-900">Search & Filters</h2>
          {hasActiveFilters && (
            <button
              onClick={clearFilters}
              className="ml-auto text-sm text-red-600 hover:text-red-700 flex items-center gap-1 font-medium transition-colors"
            >
              <X className="w-4 h-4" />
              Clear All
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
          {/* Search Bar */}
          <div className="md:col-span-6 relative group">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400 group-focus-within:text-primary-600 transition-colors" />
            </div>
            <input
              type="text"
              className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent focus:bg-white outline-none transition-all duration-200 placeholder-gray-400"
              placeholder="Search by title, description, or tags..."
              value={filters.search}
              onChange={(e) => handleChange('search', e.target.value)}
            />
            {filters.search && (
              <button
                onClick={() => handleChange('search', '')}
                className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-600"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Category Filter */}
          <div className="md:col-span-3 relative">
            <select
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent focus:bg-white outline-none transition-all duration-200 appearance-none cursor-pointer font-medium text-gray-700"
              value={filters.category}
              onChange={(e) => handleChange('category', e.target.value)}
            >
              <option value="">All Categories</option>
              {CATEGORIES.map(c => (
                <option key={c.value} value={c.value}>{c.label}</option>
              ))}
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
              <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
              </svg>
            </div>
            {filters.category && (
              <span className="absolute top-0 right-0 -mt-2 -mr-2 flex h-5 w-5 items-center justify-center">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary-400 opacity-75"></span>
                <span className="relative inline-flex h-3 w-3 rounded-full bg-primary-600"></span>
              </span>
            )}
          </div>

          {/* Condition Filter */}
          <div className="md:col-span-3 relative">
            <select
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent focus:bg-white outline-none transition-all duration-200 appearance-none cursor-pointer font-medium text-gray-700"
              value={filters.condition}
              onChange={(e) => handleChange('condition', e.target.value)}
            >
              <option value="">All Conditions</option>
              {CONDITIONS.map(c => (
                <option key={c.value} value={c.value}>{c.label}</option>
              ))}
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
              <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
              </svg>
            </div>
            {filters.condition && (
              <span className="absolute top-0 right-0 -mt-2 -mr-2 flex h-5 w-5 items-center justify-center">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary-400 opacity-75"></span>
                <span className="relative inline-flex h-3 w-3 rounded-full bg-primary-600"></span>
              </span>
            )}
          </div>
        </div>

        {/* Active Filters Display */}
        {hasActiveFilters && (
          <div className="mt-4 flex flex-wrap gap-2">
            {filters.search && (
              <span className="inline-flex items-center gap-1 px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-sm font-medium">
                Search: {filters.search}
                <button
                  onClick={() => handleChange('search', '')}
                  className="hover:bg-primary-200 rounded-full p-0.5 transition-colors"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}
            {filters.category && (
              <span className="inline-flex items-center gap-1 px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-sm font-medium">
                {CATEGORIES.find(c => c.value === filters.category)?.label}
                <button
                  onClick={() => handleChange('category', '')}
                  className="hover:bg-primary-200 rounded-full p-0.5 transition-colors"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}
            {filters.condition && (
              <span className="inline-flex items-center gap-1 px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-sm font-medium">
                {CONDITIONS.find(c => c.value === filters.condition)?.label}
                <button
                  onClick={() => handleChange('condition', '')}
                  className="hover:bg-primary-200 rounded-full p-0.5 transition-colors"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}
          </div>
        )}
      </div>

      {/* Results Section */}
      {loading ? (
        <div className="flex flex-col items-center justify-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mb-4"></div>
          <p className="text-gray-600">Loading items...</p>
        </div>
      ) : items.length === 0 ? (
        <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
          <div className="bg-gray-100 rounded-full p-6 w-24 h-24 mx-auto mb-4 flex items-center justify-center">
            <Search className="w-12 h-12 text-gray-400" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">No items found</h3>
          <p className="text-gray-600 mb-6">
            Try adjusting your filters or search terms to find what you're looking for.
          </p>
          {hasActiveFilters && (
            <button
              onClick={clearFilters}
              className="btn-primary"
            >
              Clear Filters
            </button>
          )}
        </div>
      ) : (
        <>
          <div className="flex items-center justify-between mb-6">
            <p className="text-gray-600">
              Found <span className="font-semibold text-gray-900">{items.length}</span> items
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {items.map(item => {
              const isOwner = item?.donor?._id === user?.id
              const alreadyRequested = requestedItems.includes(item._id)

              return (
                <div
                  key={item._id}
                  className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 border border-gray-100 group"
                >
                  {/* Image */}
                  {item.images?.length > 0 ? (
                    <div className="relative h-48 overflow-hidden bg-gray-100">
                      <img
                        src={getImageUrl(item.images[0])}
                        alt={item.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                        onError={(e) => {
                          e.target.src = '/placeholder-image.png'
                        }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                    </div>
                  ) : (
                    <div className="h-48 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                      <Search className="w-16 h-16 text-gray-400" />
                    </div>
                  )}

                  {/* Content */}
                  <div className="p-6">
                    <h2 className="font-bold text-lg text-gray-900 mb-2 line-clamp-1">
                      {item.title}
                    </h2>
                    <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                      {item.description}
                    </p>

                    {/* Action Button */}
                    {isOwner ? (
                      <button className="w-full btn-secondary" disabled>
                        Your Item
                      </button>
                    ) : alreadyRequested ? (
                      <button className="w-full btn-secondary" disabled>
                        Requested
                      </button>
                    ) : (
                      <button
                        className="w-full btn-primary group-hover:shadow-lg"
                        onClick={() => handleRequest(item)}
                      >
                        Request Item
                      </button>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        </>
      )}
    </div>
  )
}

export default ItemList