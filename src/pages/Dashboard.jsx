import { useState } from 'react'
import { PlusCircle, Package as PkgIcon, DollarSign, Activity, Image as ImageIcon } from 'lucide-react'
import { products } from '../data/mockData'

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState('add')
  const [productName, setProductName] = useState('')
  const [category, setCategory] = useState('Vegetables')
  const [quantity, setQuantity] = useState('')
  const [price, setPrice] = useState('')
  const [suggestedPrice, setSuggestedPrice] = useState(null)
  const [imageFile, setImageFile] = useState(null)
  const [imagePreview, setImagePreview] = useState(null)
  const [listedProducts, setListedProducts] = useState(products)

  const handleSuggest = () => {
    // Mock simple logic for AI price suggestion
    setSuggestedPrice(42)
  }

  const handleImageChange = (e) => {
    const file = e.target.files?.[0]
    if (file) {
      setImageFile(file)
      setImagePreview(URL.createObjectURL(file))
    }
  }

  const handlePublish = () => {
    if (!productName || !price || !quantity) {
      alert('Please fill in product name, price, and quantity before publishing.')
      return
    }

    const newProduct = {
      id: listedProducts.length + 1,
      name: productName,
      price: Number(price),
      unit: 'kg',
      farmer: 'Your Farm',
      rating: 4.5,
      category,
      image: imagePreview || '/assets/tomatoes.png',
      description: 'New product added by the farmer.'
    }

    setListedProducts([newProduct, ...listedProducts])
    setProductName('')
    setCategory('Vegetables')
    setQuantity('')
    setPrice('')
    setImageFile(null)
    setImagePreview(null)
    setSuggestedPrice(null)
    alert('Product published successfully!')
  }

  return (
    <div className="container animate-fade-in" style={{ padding: '3rem 1.5rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '2.5rem' }}>Farmer Dashboard</h1>
        <div style={{ background: 'rgba(255,255,255,0.05)', padding: '0.5rem 1rem', borderRadius: '8px', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Activity size={20} color="var(--success-color)" />
          <span>Status: <strong>Active</strong></span>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) 3fr', gap: '2rem' }}>
        
        {/* Sidebar Nav */}
        <div className="glass-panel" style={{ padding: '1.5rem', height: 'fit-content' }}>
          <button 
            style={activeTab === 'add' ? activeTabStyle : tabStyle}
            onClick={() => setActiveTab('add')}
          >
            <PlusCircle size={20} /> Add Product
          </button>
          <button 
            style={activeTab === 'manage' ? activeTabStyle : tabStyle}
            onClick={() => setActiveTab('manage')}
          >
            <PkgIcon size={20} /> My Products
          </button>
        </div>

        {/* Content Area */}
        <div className="glass-panel" style={{ padding: '2.5rem' }}>
          
          {activeTab === 'add' ? (
            <div>
              <h2 style={{ fontSize: '1.8rem', marginBottom: '2rem' }}>Add New Product</h2>
              
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                  
                  <div className="form-group">
                    <label style={labelStyle}>Product Name</label>
                    <input
                      type="text"
                      placeholder="e.g. Organic Carrots"
                      value={productName}
                      onChange={(e) => setProductName(e.target.value)}
                      style={inputStyle}
                    />
                  </div>
                  
                  <div className="form-group">
                    <label style={labelStyle}>Category</label>
                    <select value={category} onChange={(e) => setCategory(e.target.value)} style={inputStyle}>
                      <option>Vegetables</option>
                      <option>Fruits</option>
                      <option>Grains</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label style={labelStyle}>Quantity (Available)</label>
                    <input
                      type="number"
                      placeholder="50"
                      value={quantity}
                      onChange={(e) => setQuantity(e.target.value)}
                      style={inputStyle}
                    />
                  </div>

                  <div className="form-group" style={{ position: 'relative' }}>
                    <label style={labelStyle}>Price per Unit (₹)</label>
                    <div style={{ display: 'flex', gap: '1rem' }}>
                      <div style={{ position: 'relative', flex: 1 }}>
                        <DollarSign size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-secondary)' }} />
                        <input 
                          type="number" 
                          value={price}
                          onChange={(e) => setPrice(e.target.value)}
                          placeholder="0.00" 
                          style={{ ...inputStyle, paddingLeft: '2.5rem' }} 
                        />
                      </div>
                      <button className="btn btn-secondary" onClick={handleSuggest} style={{ whiteSpace: 'nowrap' }}>
                        AI Suggest
                      </button>
                    </div>
                  </div>

                  {suggestedPrice && (
                    <div className="animate-fade-in" style={{ padding: '1rem', background: 'rgba(114, 184, 38, 0.1)', border: '1px solid var(--accent-color)', borderRadius: '8px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ color: '#b4f177' }}>AI Suggested Price: <strong>₹{suggestedPrice}/unit</strong></span>
                      <button 
                        onClick={() => setPrice(suggestedPrice)}
                        style={{ background: 'transparent', border: 'none', color: 'var(--accent-color)', cursor: 'pointer', fontWeight: 'bold' }}
                      >
                        Apply
                      </button>
                    </div>
                  )}

                  <button className="btn btn-primary" onClick={handlePublish} style={{ marginTop: '1rem' }}>
                    Publish Product
                  </button>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  <label style={labelStyle}>Upload Image</label>
                  <label htmlFor="product-image-upload" style={{ 
                    border: '2px dashed var(--glass-border)', 
                    borderRadius: '12px', 
                    flex: 1, 
                    display: 'flex', 
                    flexDirection: 'column',
                    alignItems: 'center', 
                    justifyContent: 'center',
                    background: 'rgba(0,0,0,0.2)',
                    cursor: 'pointer',
                    overflow: 'hidden',
                    textAlign: 'center',
                    padding: '1rem'
                  }}>
                    <input
                      id="product-image-upload"
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      style={{ display: 'none' }}
                    />
                    {imagePreview ? (
                      <img src={imagePreview} alt="Product preview" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    ) : (
                      <>
                        <ImageIcon size={48} color="var(--text-secondary)" style={{ marginBottom: '1rem' }} />
                        <p style={{ color: 'var(--text-secondary)' }}>Click to upload image</p>
                      </>
                    )}
                  </label>
                </div>

              </div>
            </div>
          ) : (
            <div>
              <h2 style={{ fontSize: '1.8rem', marginBottom: '2rem' }}>My Listed Products</h2>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ background: 'rgba(255,255,255,0.05)', textAlign: 'left' }}>
                    <th style={{ padding: '1rem', borderBottom: '1px solid var(--glass-border)' }}>Product</th>
                    <th style={{ padding: '1rem', borderBottom: '1px solid var(--glass-border)' }}>Category</th>
                    <th style={{ padding: '1rem', borderBottom: '1px solid var(--glass-border)' }}>Price</th>
                    <th style={{ padding: '1rem', borderBottom: '1px solid var(--glass-border)' }}>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {listedProducts.map((p, i) => (
                    <tr key={i}>
                      <td style={{ padding: '1rem', borderBottom: '1px solid rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                        <img src={p.image} alt={p.name} style={{ width: '40px', height: '40px', borderRadius: '4px', objectFit: 'cover' }} />
                        {p.name}
                      </td>
                      <td style={{ padding: '1rem', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>{p.category}</td>
                      <td style={{ padding: '1rem', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>₹{p.price.toFixed(2)}</td>
                      <td style={{ padding: '1rem', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                        <span style={{ background: 'rgba(16, 185, 129, 0.1)', color: 'var(--success-color)', padding: '0.25rem 0.5rem', borderRadius: '4px', fontSize: '0.8rem' }}>Active</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
          
        </div>
      </div>
    </div>
  )
}

const tabStyle = {
  width: '100%',
  padding: '1rem',
  background: 'transparent',
  border: 'none',
  color: 'var(--text-secondary)',
  textAlign: 'left',
  borderRadius: '8px',
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
  gap: '0.75rem',
  fontSize: '1rem',
  marginBottom: '0.5rem',
  transition: 'all 0.2s'
}

const activeTabStyle = {
  ...tabStyle,
  background: 'rgba(114, 184, 38, 0.15)',
  color: 'var(--text-primary)',
}

const labelStyle = {
  display: 'block',
  marginBottom: '0.5rem',
  color: 'var(--text-secondary)',
  fontSize: '0.9rem'
}

const inputStyle = {
  width: '100%',
  background: 'var(--glass-bg)',
  border: '1px solid var(--glass-border)',
  color: 'var(--text-primary)',
  padding: '0.75rem 1rem',
  borderRadius: '8px',
  outline: 'none'
}
