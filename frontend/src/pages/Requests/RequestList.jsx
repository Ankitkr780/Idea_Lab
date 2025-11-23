import { useEffect, useState } from 'react'
import { requestService } from '../../services/requestService'
import toast from 'react-hot-toast'

const STATUS_COLORS = {
  pending: 'text-yellow-600 bg-yellow-100',
  approved: 'text-blue-600 bg-blue-100',
  rejected: 'text-red-600 bg-red-100',
  cancelled: 'text-gray-600 bg-gray-200',
  completed: 'text-green-600 bg-green-100'
}

const RequestList = () => {
  const [requests, setRequests] = useState([])
  const [loading, setLoading] = useState(true)

  const fetchRequests = async () => {
    try {
      const res = await requestService.getRequests()
      setRequests(res.data || [])
    } catch (error) {
      toast.error('Failed to load requests.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchRequests()
  }, [])

  const cancelRequest = async (id) => {
    try {
      await requestService.cancelRequest(id)
      toast.success('Request cancelled')
      fetchRequests()
    } catch (error) {
      toast.error(error.message || 'Failed to cancel')
    }
  }

  if (loading) return <p>Loading...</p>

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Requests</h1>

      {requests.length === 0 ? (
        <div className="card"><p>No requests found.</p></div>
      ) : (
        requests.map(req => (
          <div key={req._id} className="card flex justify-between items-center mb-4">
            
            <div>
              <h2 className="text-lg font-semibold">{req.item?.title}</h2>
              
              {/* Status Badge */}
              <span
                className={`text-sm px-3 py-1 rounded-full inline-block mt-1 font-medium ${STATUS_COLORS[req.status]}`}
              >
                {req.status.charAt(0).toUpperCase() + req.status.slice(1)}
              </span>

              {/* Date */}
              <p className="text-gray-500 text-sm mt-2">
                Requested on: {new Date(req.createdAt).toLocaleDateString()}
              </p>
            </div>

            {/* CANCEL Button Only If Allowed */}
            {(req.status === 'pending' || req.status === 'approved') && (
              <button
                onClick={() => cancelRequest(req._id)}
                className="btn-secondary hover:bg-red-500 hover:text-white transition px-4 py-2 rounded-lg"
              >
                Cancel
              </button>
            )}

          </div>
        ))
      )}
    </div>
  )
}

export default RequestList
