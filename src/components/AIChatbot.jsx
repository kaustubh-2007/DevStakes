import { useState } from 'react'
import { MessageCircle, X, Send } from 'lucide-react'

export default function AIChatbot() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState([
    { text: "Hi! I'm your AI Farmer Assistant. How can I help you today?", isBot: true }
  ])
  const [input, setInput] = useState('')
  const [isTyping, setIsTyping] = useState(false)

  const handleSend = () => {
    if (!input.trim()) return
    
    const userMsg = input
    setMessages(prev => [...prev, { text: userMsg, isBot: false }])
    setInput('')
    setIsTyping(true)

    setTimeout(() => {
      let botReply = "I can help with crop price suggestions, or finding products."
      if (userMsg.toLowerCase().includes('price')) {
        botReply = "The current average price for tomatoes is ₹40/kg, and wheat is ₹25/kg depending on the season."
      } else if (userMsg.toLowerCase().includes('help')) {
        botReply = "You can browse the marketplace to find fresh produce directly from farmers, or go to the dashboard if you want to sell."
      }

      setMessages(prev => [...prev, { text: botReply, isBot: true }])
      setIsTyping(false)
    }, 1500)
  }

  return (
    <>
      <button 
        className="btn btn-primary"
        style={{
          position: 'fixed',
          bottom: '2rem',
          right: '2rem',
          borderRadius: '50%',
          width: '60px',
          height: '60px',
          padding: 0,
          boxShadow: '0 10px 25px rgba(139, 92, 246, 0.5)',
          zIndex: 999
        }}
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X size={28} /> : <MessageCircle size={28} />}
      </button>

      {isOpen && (
        <div className="glass-panel animate-fade-in" style={{
          position: 'fixed',
          bottom: '6rem',
          right: '2rem',
          width: '350px',
          height: '500px',
          display: 'flex',
          flexDirection: 'column',
          zIndex: 999,
          overflow: 'hidden'
        }}>
          <div style={{
            background: 'linear-gradient(135deg, #8b5cf6, #3b82f6)',
            padding: '1rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem'
          }}>
            <MessageCircle size={24} />
            <span style={{ fontWeight: '600', fontSize: '1.2rem' }} className="poppins">AgriBot AI</span>
          </div>

          <div style={{
            flex: 1,
            overflowY: 'auto',
            padding: '1.5rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem'
          }}>
            {messages.map((msg, i) => (
              <div key={i} style={{
                alignSelf: msg.isBot ? 'flex-start' : 'flex-end',
                background: msg.isBot ? 'rgba(255,255,255,0.1)' : 'var(--accent-color)',
                padding: '0.75rem 1rem',
                borderRadius: msg.isBot ? '16px 16px 16px 4px' : '16px 16px 4px 16px',
                maxWidth: '85%',
                lineHeight: '1.5'
              }}>
                {msg.text}
              </div>
            ))}
            {isTyping && (
              <div style={{
                alignSelf: 'flex-start',
                background: 'rgba(255,255,255,0.1)',
                padding: '1rem',
                borderRadius: '16px 16px 16px 4px',
              }}>
                <div className="floating-dots">
                  <span></span><span></span><span></span>
                </div>
              </div>
            )}
          </div>

          <div style={{
            padding: '1rem',
            borderTop: '1px solid var(--glass-border)',
            display: 'flex',
            gap: '0.5rem'
          }}>
            <input 
              type="text" 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Ask anything..."
              style={{
                flex: 1,
                background: 'rgba(0,0,0,0.2)',
                border: '1px solid var(--glass-border)',
                borderRadius: '20px',
                padding: '0.75rem 1rem',
                color: 'white',
                outline: 'none'
              }}
            />
            <button 
              onClick={handleSend}
              style={{
                background: 'var(--accent-color)',
                border: 'none',
                borderRadius: '50%',
                width: '45px',
                height: '45px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                color: 'white'
              }}
            >
              <Send size={20} style={{ marginLeft: '-2px' }} />
            </button>
          </div>
        </div>
      )}
    </>
  )
}
