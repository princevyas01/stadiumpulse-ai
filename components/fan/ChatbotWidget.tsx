"use client"

import { useState, useRef, useEffect } from 'react'
import { Send, Bot, Loader2, Globe } from 'lucide-react'

type Message = { id: string; role: 'user' | 'assistant'; content: string }

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
        headers: { 'Content-Type': 'application/json' },
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
    <div className="bg-white rounded-xl shadow-sm border border-neutral-100 flex flex-col h-[500px]">
      <div className="p-4 border-b border-neutral-100 flex justify-between items-center bg-blue-50 rounded-t-xl">
        <div className="flex items-center space-x-3">
          <Bot className="text-blue-600" size={24} />
          <div>
            <h2 className="font-bold text-blue-900">AI Concierge</h2>
            <p className="text-xs text-blue-600 flex items-center"><Globe size={12} className="mr-1" /> Auto-translates EN/ES/FR</p>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map(msg => (
          <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[80%] p-3 rounded-2xl text-sm ${
              msg.role === 'user' 
                ? 'bg-blue-600 text-white rounded-br-none' 
                : 'bg-neutral-100 text-neutral-800 rounded-bl-none'
            }`}>
              {msg.content}
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex justify-start">
            <div className="bg-neutral-100 text-neutral-500 p-3 rounded-2xl rounded-bl-none flex items-center space-x-2">
              <Loader2 size={16} className="animate-spin" />
              <span className="text-xs font-medium">Typing...</span>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <form onSubmit={handleSubmit} className="p-4 border-t border-neutral-100 flex space-x-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your question..."
          className="flex-1 bg-neutral-50 border border-neutral-200 rounded-full px-4 py-2 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all text-sm"
        />
        <button
          type="submit"
          disabled={loading || !input.trim()}
          className="bg-blue-600 text-white p-2.5 rounded-full hover:bg-blue-700 disabled:opacity-50 transition-colors"
          aria-label="Send message"
        >
          <Send size={18} className="ml-0.5" />
        </button>
      </form>
    </div>
  )
}
