import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { itemService } from '../../services/itemService'
import toast from 'react-hot-toast'
import { Upload, X } from 'lucide-react'
import { CATEGORIES, CONDITIONS } from '../../utils/constants'

const CreateItem = () => {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    condition: '',
    quantity: 1,
    pickupLocation: '',
    tags: ''
  })
  const [images, setImages] = useState([])
  const [imagePreviews, setImagePreviews] = useState([])

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files)
    
    if (files.length + images.length > 5) {
      toast.error('Maximum 5 images allowed')
      return
    }

    // Add new images
    setImages([...images, ...files])

    // Create previews
    files.forEach(file => {
      const reader = new FileReader()
      reader.onloadend = () => {
        setImagePreviews(prev => [...prev, reader.result])
      }
      reader.readAsDataURL(file)
    })
  }

  const removeImage = (index) => {
    setImages(images.filter((_, i) => i !== index))
    setImagePreviews(imagePreviews.filter((_, i) => i !== index))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      const formDataToSend = new FormData()
      
      // Append text fields
      Object.keys(formData).forEach(key => {
        formDataToSend.append(key, formData[key])
      })

      // Append images
      images.forEach(image => {
        formDataToSend.append('images', image)
      })

      await itemService.createItem(formDataToSend)
      toast.success('Item created successfully!')
      navigate('/my-items')
    } catch (error) {
      toast.error(error.message || 'Failed to create item')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-3xl mx-auto">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Create New Item</h1>
        <p className="text-gray-600 mt-2">List a stationary item you want to donate</p>
      </div>

      <form onSubmit={handleSubmit} className="card space-y-6">
        {/* Title */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Title *
          </label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            className="input-field"
            placeholder="e.g., Engineering Mathematics Textbook"
          />
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Description *
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
            rows="4"
            className="input-field"
            placeholder="Describe the item, its condition, and any other relevant details..."
          />
        </div>

        {/* Category and Condition */}
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Category *
            </label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
              className="input-field"
            >
              <option value="">Select category</option>
              {CATEGORIES.map(cat => (
                <option key={cat.value} value={cat.value}>
                  {cat.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Condition *
            </label>
            <select
              name="condition"
              value={formData.condition}
              onChange={handleChange}
              required
              className="input-field"
            >
              <option value="">Select condition</option>
              {CONDITIONS.map(cond => (
                <option key={cond.value} value={cond.value}>
                  {cond.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Quantity and Pickup Location */}
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Quantity *
            </label>
            <input
              type="number"
              name="quantity"
              value={formData.quantity}
              onChange={handleChange}
              required
              min="1"
              className="input-field"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Pickup Location *
            </label>
            <input
              type="text"
              name="pickupLocation"
              value={formData.pickupLocation}
              onChange={handleChange}
              required
              className="input-field"
              placeholder="e.g., Library, Room 205"
            />
          </div>
        </div>

        {/* Tags */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Tags (comma separated)
          </label>
          <input
            type="text"
            name="tags"
            value={formData.tags}
            onChange={handleChange}
            className="input-field"
            placeholder="e.g., mathematics, engineering, first year"
          />
          <p className="text-xs text-gray-500 mt-1">
            Add tags to help others find your item
          </p>
        </div>

        {/* Image Upload */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Images (Max 5)
          </label>
          
          {/* Image Previews */}
          {imagePreviews.length > 0 && (
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-4">
              {imagePreviews.map((preview, index) => (
                <div key={index} className="relative">
                  <img
                    src={preview}
                    alt={`Preview ${index + 1}`}
                    className="w-full h-24 object-cover rounded-lg"
                  />
                  <button
                    type="button"
                    onClick={() => removeImage(index)}
                    className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* Upload Button */}
          {images.length < 5 && (
            <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer hover:bg-gray-50">
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <Upload className="w-8 h-8 text-gray-400 mb-2" />
                <p className="text-sm text-gray-600">
                  <span className="font-semibold">Click to upload</span> or drag and drop
                </p>
                <p className="text-xs text-gray-500">PNG, JPG, GIF up to 5MB</p>
              </div>
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />
            </label>
          )}
        </div>

        {/* Submit Buttons */}
        <div className="flex gap-4">
          <button
            type="submit"
            disabled={loading}
            className="btn-primary flex-1 disabled:opacity-50"
          >
            {loading ? 'Creating...' : 'Create Item'}
          </button>
          <button
            type="button"
            onClick={() => navigate('/my-items')}
            className="btn-secondary"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  )
}

export default CreateItem