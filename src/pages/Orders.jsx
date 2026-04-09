import { Link } from 'react-router-dom'
import { ShoppingCart, Truck, Calendar, Package } from 'lucide-react'

export default function Orders({ user, orders }) {
  return (
    <div className="container animate-fade-in" style={{ padding: '3rem 1.5rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', marginBottom: '2rem' }}>
        <div>
          <h1 style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>My Orders</h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem' }}>
            {user ? `Hi ${user.name}, here’s the latest status for your recent orders.` : 'View your order history and tracking status.'}
          </p>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', background: 'var(--glass-bg)', border: '1px solid var(--glass-border)', padding: '0.9rem 1rem', borderRadius: '14px' }}>
          <ShoppingCart size={24} color="var(--accent-color)" />
          <div>
            <div style={{ fontSize: '0.95rem', color: 'var(--text-secondary)' }}>Total Orders</div>
            <div style={{ fontSize: '1.4rem', fontWeight: 700 }}>{orders.length}</div>
          </div>
        </div>
      </div>

      {orders.length === 0 ? (
        <div className="glass-panel" style={{ padding: '3rem', textAlign: 'center' }}>
          <h2 style={{ fontSize: '2rem', marginBottom: '1rem' }}>No orders placed yet</h2>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>
            Your placed orders will appear here after checkout.
          </p>
          <Link to="/marketplace" className="btn btn-primary">Browse Marketplace</Link>
        </div>
      ) : (
        <div style={{ display: 'grid', gap: '1.5rem' }}>
          {orders.map(order => (
            <div key={order.id} className="glass-panel" style={{ padding: '1.75rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem', marginBottom: '1rem' }}>
                <div>
                  <div style={{ fontSize: '0.95rem', color: 'var(--text-secondary)' }}>Order ID</div>
                  <h2 style={{ margin: 0 }}>{order.id}</h2>
                </div>
                <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', flexWrap: 'wrap' }}>
                  <span style={{ padding: '0.5rem 0.85rem', borderRadius: '999px', background: 'rgba(111, 181, 38, 0.15)', color: 'var(--success-color)', fontWeight: 600 }}>{order.status}</span>
                  <span style={{ color: 'var(--text-secondary)' }}><Calendar size={16} /> {order.date}</span>
                  <span style={{ color: 'var(--text-secondary)' }}><Truck size={16} /> {order.delivery}</span>
                </div>
              </div>

              <div style={{ display: 'grid', gap: '1rem' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: '1rem' }}>
                  <div>
                    <div style={{ color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>Items</div>
                    <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'grid', gap: '0.6rem' }}>
                      {order.cart.map((item, index) => (
                        <li key={index} style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-primary)' }}>
                          <span>{item.name} x{item.qty}</span>
                          <strong>₹{(item.qty * item.price).toFixed(0)}</strong>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div style={{ background: 'rgba(255,255,255,0.08)', padding: '1rem', borderRadius: '16px', minWidth: '180px', display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
                    <div style={{ color: 'var(--text-secondary)' }}>Total</div>
                    <div style={{ fontSize: '1.75rem', fontWeight: 700 }}>₹{order.total.toFixed(2)}</div>
                    <button className="btn btn-secondary" style={{ width: '100%', padding: '0.8rem 1rem' }}>
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}