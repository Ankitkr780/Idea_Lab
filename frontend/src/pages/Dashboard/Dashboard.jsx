const Dashboard = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="card">
          <h3 className="text-lg font-semibold mb-2">My Items</h3>
          <p className="text-gray-600">Items you've listed</p>
        </div>
        <div className="card">
          <h3 className="text-lg font-semibold mb-2">My Requests</h3>
          <p className="text-gray-600">Items you've requested</p>
        </div>
        <div className="card">
          <h3 className="text-lg font-semibold mb-2">Received Requests</h3>
          <p className="text-gray-600">Requests for your items</p>
        </div>
        <div className="card">
          <h3 className="text-lg font-semibold mb-2">Available Items</h3>
          <p className="text-gray-600">Browse all items</p>
        </div>
      </div>
    </div>
  )
}

export default Dashboard