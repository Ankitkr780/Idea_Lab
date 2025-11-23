import { useEffect, useState } from 'react'
import { itemService } from '../../services/itemService'
import { getImageUrl } from '../../utils/helpers'  // ✅ ADD THIS IMPORT

const MyItems = () => {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadItems = async () => {
      try {
        const res = await itemService.getMyItems()
        setItems(res.data)
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }
    loadItems()
  }, [])

  if (loading) return <p className="p-4">Loading...</p>

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">My Items</h1>

      {items.length === 0 ? (
        <div className="card">
          <p>No items found.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {items.map(item => (
            <div key={item._id} className="card">
              {/* ✅ ADD: Display image */}
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
              <p className="text-gray-600 text-sm mb-2">{item.description}</p>
              <div className="flex items-center justify-between">
                <span className="text-xs bg-gray-200 px-3 py-1 rounded-full font-medium">
                  {item.status}
                </span>
                <span className="text-xs text-gray-500">
                  {item.category}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default MyItems