"use client"

import { useState, useRef, useEffect } from 'react'
import { getCsrfToken } from '@/lib/getCsrfToken'
import { Send, Bot, Loader2, Globe } from 'lucide-react'

type Message = { id: string; role: 'user' | 'assistant'; content: string }

/**
 * ChatbotWidget
 */
export function ChatbotWidget() {
  const [messages, setMessages] = useState<Message[]>([
    { id: '1', role: 'assistant', content: "Hello! I'm your Multilingual AI Concierge. How can I help you today? (Hola / Bonjour!)" }
  ])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim()) return

    const userMsg: Message = { id: Date.now().toString(), role: 'user', content: input }
    setMessages(prev => [...prev, userMsg])
    setInput('')
    setLoading(true)

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'x-csrf-token': getCsrfToken() },
        body: JSON.stringify({ message: userMsg.content, history: messages.slice(-4) })
      })
      if (!res.ok || !res.body) throw new Error('Failed to fetch')
      
      const reader = res.body.getReader()
      const decoder = new TextDecoder()
      let fullText = ''
      
      const botMsgId = Date.now().toString()
      setMessages(prev => [...prev, { id: botMsgId, role: 'assistant', content: '' }])

      while (true) {
        const { value, done } = await reader.read()
        if (done) break
        fullText += decoder.decode(value, { stream: true })
        setMessages(prev => prev.map(m => m.id === botMsgId ? { ...m, content: fullText } : m))
      }
    } catch {
      const errorMsg: Message = { id: Date.now().toString(), role: 'assistant', content: "I'm having trouble connecting right now. Please try again." }
      setMessages(prev => [...prev, errorMsg])
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="bg-white dark:bg-theme-dark rounded-std border border-black/10 dark:border-white/10 flex flex-col h-[500px] shadow-soft overflow-hidden">
      <div className="p-5 border-b border-black/10 dark:border-white/10 flex justify-between items-center bg-theme-light dark:bg-white/5">
        <div className="flex items-center space-x-3">
          <Bot className="text-theme-accent" size={24} />
          <div>
            <h2 className="font-sans font-semibold text-lg text-theme-text-primary dark:text-theme-light">AI Concierge</h2>
            <p className="font-sans text-xs text-theme-text-secondary flex items-center"><Globe size={12} className="mr-1" /> Auto-translate active</p>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-5 space-y-4 custom-scrollbar">
        {messages.map(msg => (
          <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[80%] p-3 text-[15px] font-sans leading-relaxed rounded-std ${
              msg.role === 'user' 
                ? 'bg-theme-text-primary text-white dark:bg-theme-light dark:text-theme-dark' 
                : 'bg-theme-light dark:bg-white/5 border border-black/5 dark:border-white/5 text-theme-text-primary dark:text-theme-light'
            }`}>
              {msg.content}
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex justify-start">
            <div className="bg-theme-light dark:bg-white/5 border border-black/5 dark:border-white/5 text-theme-text-secondary p-3 rounded-std flex items-center space-x-2">
              <Loader2 size={16} className="animate-spin" />
              <span className="font-sans text-[13px] font-medium">Processing...</span>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <form onSubmit={handleSubmit} className="p-4 border-t border-black/10 dark:border-white/10 flex space-x-2 bg-white dark:bg-theme-dark">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask a question..."
          className="flex-1 bg-theme-light dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-std px-4 py-2.5 font-sans text-[15px] focus:outline-none focus:border-theme-accent focus:ring-1 focus:ring-theme-accent transition-colors text-theme-text-primary dark:text-theme-light placeholder:text-theme-text-secondary"
        />
        <button
          type="submit"
          disabled={loading || !input.trim()}
          className="bg-theme-text-primary dark:bg-theme-light text-white dark:text-theme-dark rounded-[8px] px-4 py-2 hover:bg-theme-accent dark:hover:bg-theme-accent dark:hover:text-white disabled:opacity-50 transition-colors flex items-center justify-center"
          aria-label="Send message"
        >
          <Send size={18} />
        </button>
      </form>
    </div>
  )
}
