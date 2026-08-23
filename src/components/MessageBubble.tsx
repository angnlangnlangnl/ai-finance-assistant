import React from 'react'
import { Message } from '../types'
import { CheckCircle, AlertTriangle, Sparkles } from 'lucide-react'

interface Props {
  message: Message
}

const MessageBubble: React.FC<Props> = ({ message }) => {
  const isUser = message.role === 'user'
  const isSystem = message.role === 'system'

  if (isSystem) {
    return (
      <div className="flex justify-center">
        <div className="bg-[#12121f] text-xs text-[#5a5a6a] px-4 py-1.5 rounded-full border border-[#1a1a2a]">
          {message.content}
        </div>
      </div>
    )
  }

  const formatContent = (text: string) => {
    return text.split(/\*\*(.*?)\*\*/g).map((part, i) => 
      i % 2 === 1 ? <strong key={i} className="text-white">{part}</strong> : part
    )
  }

  return (
    <div className={`flex items-start gap-3 ${isUser ? 'flex-row-reverse' : ''}`}>
      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 ${
        isUser ? 'bg-blue-500 text-white' : 'bg-[#1a1a2a] text-[#6a6a7a]'
      }`}>
        {isUser ? '我' : 'AI'}
      </div>

      <div className={`max-w-[80%] ${isUser ? 'bg-blue-500 rounded-2xl rounded-tr-none' : 'bg-[#12121f] rounded-2xl rounded-tl-none border border-[#1a1a2a]'} px-4 py-3`}>
        {message.type === 'transaction_preview' && (
          <div className="flex items-center gap-1.5 text-xs text-emerald-400 mb-1.5">
            <CheckCircle size={14} />
            <span>交易预览 · 待确认</span>
          </div>
        )}
        {message.type === 'alert' && (
          <div className="flex items-center gap-1.5 text-xs text-amber-400 mb-1.5">
            <AlertTriangle size={14} />
            <span>风险提醒</span>
          </div>
        )}
        {message.type === 'asset_summary' && (
          <div className="flex items-center gap-1.5 text-xs text-blue-400 mb-1.5">
            <Sparkles size={14} />
            <span>持仓分析</span>
          </div>
        )}

        <div className={`text-sm leading-relaxed whitespace-pre-wrap ${isUser ? 'text-white' : 'text-[#d0d0e0]'}`}>
          {formatContent(message.content)}
        </div>

        {message.type === 'transaction_preview' && (
          <div className="flex gap-2 mt-3">
            <button className="text-xs bg-emerald-500/20 text-emerald-400 px-4 py-1.5 rounded-lg hover:bg-emerald-500/30 transition-colors">
              确认执行
            </button>
            <button className="text-xs bg-[#1a1a2a] text-[#6a6a7a] px-4 py-1.5 rounded-lg hover:bg-[#2a2a3a] transition-colors">
              修改参数
            </button>
          </div>
        )}

        <div className={`text-[10px] mt-1.5 ${isUser ? 'text-blue-200/60' : 'text-[#4a4a5a]'}`}>
          {message.timestamp.toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' })}
        </div>
      </div>
    </div>
  )
}

export default MessageBubble
