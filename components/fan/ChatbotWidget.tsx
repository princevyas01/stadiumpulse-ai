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
    <div className="bg-chalk-white dark:bg-black rounded-sm border-2 border-concrete-gray/20 dark:border-concrete-gray/40 flex flex-col h-[500px] shadow-sm">
      <div className="p-4 border-b-2 border-concrete-gray/20 dark:border-concrete-gray/40 flex justify-between items-center bg-pitch-green text-floodlight-white">
        <div className="flex items-center space-x-3">
          <Bot className="text-signal-amber" size={28} />
          <div>
            <h2 className="font-display text-2xl uppercase tracking-wider">AI Concierge</h2>
            <p className="font-mono text-xs text-concrete-gray flex items-center"><Globe size={12} className="mr-1" /> AUTO-TRANSLATE ACTIVE</p>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map(msg => (
          <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[80%] p-3 text-sm font-sans font-medium border-2 ${
              msg.role === 'user' 
                ? 'bg-pitch-green text-floodlight-white border-pitch-green dark:bg-floodlight-white dark:text-pitch-green dark:border-floodlight-white' 
                : 'bg-floodlight-white text-pitch-green border-concrete-gray/30 dark:bg-black dark:text-floodlight-white dark:border-concrete-gray/50'
            }`}>
              {msg.content}
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex justify-start">
            <div className="bg-floodlight-white dark:bg-black text-concrete-gray p-3 border-2 border-concrete-gray/30 dark:border-concrete-gray/50 flex items-center space-x-2">
              <Loader2 size={16} className="animate-spin" />
              <span className="font-mono text-xs uppercase font-bold">PROCESSING...</span>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <form onSubmit={handleSubmit} className="p-4 border-t-2 border-concrete-gray/20 dark:border-concrete-gray/40 flex space-x-2 bg-floodlight-white dark:bg-pitch-green">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="ENTER INQUIRY..."
          className="flex-1 bg-chalk-white dark:bg-black dark:text-floodlight-white border-2 border-concrete-gray/30 dark:border-concrete-gray/50 px-4 py-3 font-mono uppercase focus:outline-none focus:border-signal-amber transition-colors text-sm placeholder:text-concrete-gray/60"
        />
        <button
          type="submit"
          disabled={loading || !input.trim()}
          className="bg-pitch-green dark:bg-floodlight-white text-floodlight-white dark:text-pitch-green px-4 hover:bg-signal-amber hover:text-pitch-green disabled:opacity-50 transition-colors"
          aria-label="Send message"
        >
          <Send size={20} className="ml-0.5" />
        </button>
      </form>
    </div>
  )
}
