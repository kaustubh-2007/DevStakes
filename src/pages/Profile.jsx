import { User, MapPin, Phone } from 'lucide-react'

export default function Profile({ user, orders }) {
  return (
    <div className="container animate-fade-in" style={{ padding: '3rem 1.5rem' }}>
      <h1 style={{ fontSize: '2.5rem', marginBottom: '2rem' }}>My Profile</h1>

      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) 2fr', gap: '3rem' }}>
        
        {/* Profile Details Sidebar */}
        <div className="glass-panel" style={{ padding: '2rem', height: 'fit-content' }}>
          <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
            <div style={{
              width: '120px',
              height: '120px',
              borderRadius: '50%',
              background: 'linear-gradient(135deg, var(--accent-color), var(--success-color))',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 1rem',
              boxShadow: '0 8px 32px rgba(114, 184, 38, 0.4)'
            }}>
              <User size={60} color="white" />
            </div>
            <h2 style={{ margin: '0 0 0.5rem 0', fontSize: '1.5rem' }}>{user.name}</h2>
            <span style={{ 
              background: 'rgba(114, 184, 38, 0.2)', 
              color: '#b4f177', 
              padding: '0.25rem 1rem', 
              borderRadius: '20px', 
              fontSize: '0.9rem',
              fontWeight: 500,
              textTransform: 'capitalize'
            }}>
              {user.role}
            </span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div style={{ display: 'flex', gap: '1rem', color: 'var(--text-secondary)' }}>
              <Phone size={20} />
              <span>+1 (555) 123-4567</span>
            </div>
            <div style={{ display: 'flex', gap: '1rem', color: 'var(--text-secondary)' }}>
              <MapPin size={20} />
              <span>123 Market St, San Francisco, CA</span>
            </div>
          </div>
          
          <button className="btn btn-secondary" style={{ width: '100%', marginTop: '2rem' }}>
            Edit Profile
          </button>
        </div>

        <div>
          <h2 style={{ fontSize: '1.8rem', marginBottom: '1.5rem' }}>Account at a Glance</h2>
          <div className="glass-card" style={{ padding: '2rem', borderRadius: '20px', display: 'grid', gap: '1.5rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1rem' }}>
              <div>
                <div style={{ color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>Orders Completed</div>
                <div style={{ fontSize: '1.8rem', fontWeight: 700 }}>{orders.length}</div>
              </div>
              <div style={{ padding: '0.75rem 1rem', borderRadius: '16px', background: 'rgba(114, 184, 38, 0.1)', color: 'var(--success-color)', fontWeight: 700 }}>
                New
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div style={{ background: 'rgba(255,255,255,0.05)', padding: '1rem', borderRadius: '16px' }}>
                <div style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Favorite Category</div>
                <div style={{ fontWeight: 600, marginTop: '0.5rem' }}>Fresh Vegetables</div>
              </div>
              <div style={{ background: 'rgba(255,255,255,0.05)', padding: '1rem', borderRadius: '16px' }}>
                <div style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Preferred Farm</div>
                <div style={{ fontWeight: 600, marginTop: '0.5rem' }}>Green Valley Farm</div>
              </div>
            </div>

            <p style={{ margin: 0, color: 'var(--text-secondary)' }}>
              Track your activity and update your preferences anytime. Orders you place will show up here once you start shopping.
            </p>
          </div>
        </div>

      </div>
    </div>
  )
}
