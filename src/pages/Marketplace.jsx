import { useState } from 'react'
import ProductCard from '../components/ProductCard'
import { products as mockProducts } from '../data/mockData'
import { Filter, Search } from 'lucide-react'

export default function Marketplace({ addToCart }) {
  const [filter, setFilter] = useState('All')
  const [search, setSearch] = useState('')
  const [sortBy, setSortBy] = useState('price_low')

  const categories = ['All', 'Vegetables', 'Fruits', 'Grains']

  const filteredProducts = mockProducts
    .filter(p => {
      const matchesFilter = filter === 'All' || p.category === filter
      const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase())
      return matchesFilter && matchesSearch
    })
    .sort((a, b) => {
      if (sortBy === 'price_low') {
        return a.price - b.price
      }
      if (sortBy === 'price_high') {
        return b.price - a.price
      }
      if (sortBy === 'bestseller') {
        return b.rating - a.rating
      }
      return 0
    })

  return (
    <div className="container animate-fade-in" style={{ padding: '3rem 1.5rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '3rem', flexWrap: 'wrap', gap: '1.5rem' }}>
        <div>
          <h1 style={{ fontSize: '3rem', marginBottom: '0.5rem' }}>Fresh <span className="text-gradient">Marketplace</span></h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem' }}>Support local farmers directly.</p>
        </div>

        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', flexWrap: 'wrap' }}>
          <div style={{ position: 'relative' }}>
            <Search size={20} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-secondary)' }} />
            <input 
              type="text" 
              placeholder="Search products..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{
                background: 'var(--glass-bg)',
                border: '1px solid var(--glass-border)',
                padding: '0.75rem 1rem 0.75rem 3rem',
                borderRadius: '8px',
                color: 'var(--text-primary)',
                outline: 'none',
                minWidth: '250px'
              }}
            />
          </div>

          <div style={{ display: 'flex', gap: '0.5rem', background: 'var(--glass-bg)', padding: '0.5rem', borderRadius: '8px', border: '1px solid var(--glass-border)' }}>
            <Filter size={20} style={{ margin: '0.25rem 0.5rem', color: 'var(--text-secondary)' }} />
            {categories.map(c => (
              <button 
                key={c}
                onClick={() => setFilter(c)}
                style={{
                  background: filter === c ? 'var(--accent-color)' : 'transparent',
                  color: filter === c ? 'white' : 'var(--text-primary)',
                  border: 'none',
                  padding: '0.5rem 1rem',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  transition: 'all 0.3s'
                }}
              >
                {c}
              </button>
            ))}
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', background: 'var(--glass-bg)', padding: '0.75rem 1rem', borderRadius: '12px', border: '1px solid var(--glass-border)' }}>
            <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
              <span style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>Sort:</span>
              <button
                type="button"
                onClick={() => setSortBy('price_low')}
                style={{
                  padding: '0.5rem 0.85rem',
                  borderRadius: '8px',
                  border: sortBy === 'price_low' ? '1px solid var(--accent-color)' : '1px solid transparent',
                  background: sortBy === 'price_low' ? 'var(--accent-color)' : 'transparent',
                  color: sortBy === 'price_low' ? 'white' : 'var(--text-primary)',
                  cursor: 'pointer'
                }}
              >
                Price: Low to High
              </button>
              <button
                type="button"
                onClick={() => setSortBy('price_high')}
                style={{
                  padding: '0.5rem 0.85rem',
                  borderRadius: '8px',
                  border: sortBy === 'price_high' ? '1px solid var(--accent-color)' : '1px solid transparent',
                  background: sortBy === 'price_high' ? 'var(--accent-color)' : 'transparent',
                  color: sortBy === 'price_high' ? 'white' : 'var(--text-primary)',
                  cursor: 'pointer'
                }}
              >
                Price: High to Low
              </button>
              <button
                type="button"
                onClick={() => setSortBy('bestseller')}
                style={{
                  padding: '0.5rem 0.85rem',
                  borderRadius: '8px',
                  border: sortBy === 'bestseller' ? '1px solid var(--accent-color)' : '1px solid transparent',
                  background: sortBy === 'bestseller' ? 'var(--accent-color)' : 'transparent',
                  color: sortBy === 'bestseller' ? 'white' : 'var(--text-primary)',
                  cursor: 'pointer'
                }}
              >
                Bestseller
              </button>
            </div>
          </div>
        </div>
      </div>

      {filteredProducts.length > 0 ? (
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', 
          gap: '2.5rem' 
        }}>
          {filteredProducts.map(product => (
            <ProductCard key={product.id} product={product} addToCart={addToCart} />
          ))}
        </div>
      ) : (
        <div style={{ textAlign: 'center', padding: '5rem', background: 'var(--glass-bg)', borderRadius: '16px', border: '1px solid var(--glass-border)' }}>
          <h2 style={{ fontSize: '2rem', marginBottom: '1rem' }}>No products found</h2>
          <p style={{ color: 'var(--text-secondary)' }}>Try adjusting your search or filters.</p>
        </div>
      )}
    </div>
  )
}
