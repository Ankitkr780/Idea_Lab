import { useEffect, useState } from 'react'
import { itemService } from '../../services/itemService'

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
              <h2 className="font-semibold">{item.title}</h2>
              <p className="text-gray-600">{item.description}</p>
              <span className="text-xs bg-gray-200 px-2 py-1 rounded mt-2 inline-block">
                {item.status}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default MyItems
