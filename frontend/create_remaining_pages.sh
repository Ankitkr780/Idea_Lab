#!/bin/bash

cd frontend

# Create placeholder pages
mkdir -p src/pages/Dashboard src/pages/Items src/pages/Requests

# Dashboards
cat > src/pages/Dashboard/DonorDashboard.jsx << 'EOF'
const DonorDashboard = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Donor Dashboard</h1>
      <div className="card">
        <p>Welcome, Donor! This is your dashboard.</p>
      </div>
    </div>
  )
}

export default DonorDashboard
EOF

cat > src/pages/Dashboard/ReceiverDashboard.jsx << 'EOF'
const ReceiverDashboard = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Receiver Dashboard</h1>
      <div className="card">
        <p>Welcome, Receiver! This is your dashboard.</p>
      </div>
    </div>
  )
}

export default ReceiverDashboard
EOF

# Item pages
cat > src/pages/Items/ItemList.jsx << 'EOF'
const ItemList = () => {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">All Items</h1>
      <div className="card">
        <p>Item list will appear here</p>
      </div>
    </div>
  )
}

export default ItemList
EOF

cat > src/pages/Items/ItemDetail.jsx << 'EOF'
const ItemDetail = () => {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Item Details</h1>
      <div className="card">
        <p>Item details will appear here</p>
      </div>
    </div>
  )
}

export default ItemDetail
EOF

cat > src/pages/Items/CreateItem.jsx << 'EOF'
const CreateItem = () => {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Create New Item</h1>
      <div className="card">
        <p>Create item form will appear here</p>
      </div>
    </div>
  )
}

export default CreateItem
EOF

cat > src/pages/Items/EditItem.jsx << 'EOF'
const EditItem = () => {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Edit Item</h1>
      <div className="card">
        <p>Edit item form will appear here</p>
      </div>
    </div>
  )
}

export default EditItem
EOF

cat > src/pages/Items/MyItems.jsx << 'EOF'
const MyItems = () => {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">My Items</h1>
      <div className="card">
        <p>Your items will appear here</p>
      </div>
    </div>
  )
}

export default MyItems
EOF

# Request pages
cat > src/pages/Requests/RequestList.jsx << 'EOF'
const RequestList = () => {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Requests</h1>
      <div className="card">
        <p>Request list will appear here</p>
      </div>
    </div>
  )
}

export default RequestList
EOF

cat > src/pages/Requests/RequestDetail.jsx << 'EOF'
const RequestDetail = () => {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Request Details</h1>
      <div className="card">
        <p>Request details will appear here</p>
      </div>
    </div>
  )
}

export default RequestDetail
EOF

echo "All pages created!"

