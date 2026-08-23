import React, { useRef, useEffect, useState } from 'react'
import MessageBubble from './MessageBubble'
import { Message } from '../types'
import { Send, Loader2 } from 'lucide-react'

interface Props {
  messages: Message[]
  isProcessing: boolean
  onSendMessage: (text: string) => void
}

const ChatInterface: React.FC<Props> = ({ messages, isProcessing, onSendMessage }) => {
  const [input, setInput] = useState('')
  const scrollRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [messages])

  const handleSend = () => {
    if (input.trim() && !isProcessing) {
      onSendMessage(input.trim())
      setInput('')
      if (inputRef.current) {
        inputRef.current.style.height = 'auto'
      }
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value)
    e.target.style.height = 'auto'
    e.target.style.height = Math.min(e.target.scrollHeight, 120) + 'px'
  }

  return (
    <div className="flex-1 flex flex-col min-h-0">
      <div ref={scrollRef} className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
        {messages.map((msg) => (
          <MessageBubble key={msg.id} message={msg} />
        ))}
        
        {isProcessing && (
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-full bg-[#1a1a2a] flex items-center justify-center text-xs font-bold text-[#6a6a7a]">
              AI
            </div>
            <div className="bg-[#12121f] rounded-2xl rounded-tl-none px-4 py-3 border border-[#1a1a2a]">
              <Loader2 size={20} className="animate-spin text-[#4a4a5a]" />
            </div>
          </div>
        )}
      </div>

      <div className="border-t border-[#1a1a2a] p-4">
        <div className="max-w-4xl mx-auto flex items-end gap-3 bg-[#12121f] rounded-2xl border border-[#1a1a2a] p-2 focus-within:border-blue-500/50 transition-colors">
          <textarea
            ref={inputRef}
            value={input}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            placeholder="说句话，或者输入命令..."
            className="flex-1 bg-transparent outline-none resize-none text-sm min-h-[40px] max-h-[120px] px-2 py-1.5 text-[#e8e8f0] placeholder-[#4a4a5a]"
            rows={1}
            disabled={isProcessing}
          />
          <button
            onClick={handleSend}
            disabled={!input.trim() || isProcessing}
            className={`p-2 rounded-xl transition-all ${
              input.trim() && !isProcessing
                ? 'bg-blue-500 text-white hover:bg-blue-600'
                : 'bg-[#1a1a2a] text-[#4a4a5a] cursor-not-allowed'
            }`}
          >
            <Send size={18} />
          </button>
        </div>
        <div className="flex items-center justify-between mt-2 text-[10px] text-[#3a3a4a] px-2">
          <span>AI 可读取持仓，执行操作需你确认</span>
          <span>⌘ + Enter 发送</span>
        </div>
      </div>
    </div>
  )
}

export default ChatInterface
