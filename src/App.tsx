import React, { useState } from 'react'
import ChatInterface from './components/ChatInterface'
import AssetOverview from './components/AssetOverview'
import QuickActions from './components/QuickActions'
import { Message, Asset } from './types'

// 模拟持仓数据
const mockAssets: Asset[] = [
  { symbol: 'ETH', name: 'Ethereum', balance: 3.42, usdValue: 8243.22, chain: 'Ethereum' },
  { symbol: 'BTC', name: 'Bitcoin', balance: 0.15, usdValue: 8475.00, chain: 'Bitcoin' },
  { symbol: 'USDC', name: 'USD Coin', balance: 12500.00, usdValue: 12500.00, chain: 'Ethereum' },
  { symbol: 'SOL', name: 'Solana', balance: 120.5, usdValue: 3856.00, chain: 'Solana' },
  { symbol: 'ARB', name: 'Arbitrum', balance: 8500, usdValue: 5100.00, chain: 'Arbitrum' },
]

const totalValue = mockAssets.reduce((sum, a) => sum + a.usdValue, 0)

function App() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      role: 'assistant',
      content: '👋 你好！我是你的 AI 金融管家。我看到你目前在 4 条链上持有约 **$38,174** 的资产。\n\n你想做什么？比如：\n• "帮我看看最近哪个仓位该调整"\n• "把闲置 USDC 转到收益最高的协议"\n• "最近市场波动大，帮我分析一下风险"',
      timestamp: new Date(),
      type: 'text',
    }
  ])
  const [isProcessing, setIsProcessing] = useState(false)

  const handleSendMessage = async (text: string) => {
    const userMsg: Message = {
      id: `user-${Date.now()}`,
      role: 'user',
      content: text,
      timestamp: new Date(),
      type: 'text',
    }
    setMessages(prev => [...prev, userMsg])
    setIsProcessing(true)

    setTimeout(() => {
      const response = generateAIResponse(text)
      setMessages(prev => [...prev, response])
      setIsProcessing(false)
    }, 800 + Math.random() * 600)
  }

  const generateAIResponse = (userInput: string): Message => {
    const lower = userInput.toLowerCase()
    
    if (lower.includes('收益') || lower.includes('apy') || lower.includes('利息')) {
      return {
        id: `ai-${Date.now()}`,
        role: 'assistant',
        content: `📊 **收益优化建议**\n\n我扫描了你当前的持仓分布，发现你有 **$12,500 USDC** 在 Ethereum 上闲置。\n\n当前最优收益选项：\n• **Aave v3** — 4.8% APY (USDC)\n• **Compound v3** — 4.2% APY\n• **Ethena sUSDe** — 8.9% APY ⭐ 当前最高\n\n建议将 USDC 转入 Ethena 获取更高收益。是否执行？`,
        timestamp: new Date(),
        type: 'transaction_preview',
        data: {
          action: 'deposit',
          protocol: 'Ethena',
          token: 'USDC',
          amount: 12500,
          estimatedApy: 8.9
        }
      }
    }
    
    if (lower.includes('风险') || lower.includes('波动') || lower.includes('调整')) {
      return {
        id: `ai-${Date.now()}`,
        role: 'assistant',
        content: `🛡️ **风险分析报告**\n\n市场波动率指数 (VIX-like) 当前处于 **72**，属于高波动区间。\n\n你的持仓风险分布：\n• **BTC/ETH** — 43% (中等风险)\n• **SOL** — 10% (高风险)\n• **稳定币** — 33% (低风险)\n\n⚠️ 建议：SOL 仓位占比偏高，近期价格波动较大。是否考虑将部分 SOL 转换为稳定币以降低风险敞口？`,
        timestamp: new Date(),
        type: 'alert',
      }
    }

    if (lower.includes('持仓') || lower.includes('资产') || lower.includes('多少钱')) {
      return {
        id: `ai-${Date.now()}`,
        role: 'assistant',
        content: `📈 **当前持仓总览**\n\n总资产价值：**$${totalValue.toLocaleString()}**\n\n分项：\n• ETH: $8,243 (21.6%)\n• BTC: $8,475 (22.2%)\n• USDC: $12,500 (32.7%)\n• SOL: $3,856 (10.1%)\n• ARB: $5,100 (13.4%)\n\n近 24h 整体浮动：**+2.3%** ✅`,
        timestamp: new Date(),
        type: 'asset_summary',
        data: { assets: mockAssets, total: totalValue }
      }
    }

    return {
      id: `ai-${Date.now()}`,
      role: 'assistant',
      content: `🔍 我理解你的问题是："${userInput}"\n\n我需要进一步确认你的意图。你可以更具体地告诉我：\n• 要查询某个具体资产的详情？\n• 要执行一笔交易？\n• 要优化收益配置？\n• 要分析市场风险？\n\n我会根据你的需求给出更精准的建议。`,
      timestamp: new Date(),
      type: 'text',
    }
  }

  return (
    <div className="flex h-screen bg-[#0a0a0f] text-[#e8e8f0]">
      <div className="w-80 border-r border-[#1a1a2a] p-6 flex flex-col">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-lg">
            AI
          </div>
          <div>
            <h1 className="text-lg font-semibold">金融助手</h1>
            <p className="text-xs text-[#6a6a7a]">在线 · 已连接 4 条链</p>
          </div>
        </div>

        <AssetOverview assets={mockAssets} totalValue={totalValue} />
        
        <div className="mt-auto pt-4 border-t border-[#1a1a2a]">
          <div className="flex items-center gap-2 text-xs text-[#5a5a6a]">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            安全模式 · 非托管
          </div>
          <p className="text-[10px] text-[#3a3a4a] mt-1">
            AI 可准备交易，执行需你的确认
          </p>
        </div>
      </div>

      <div className="flex-1 flex flex-col min-w-0">
        <div className="border-b border-[#1a1a2a] px-6 py-3 flex items-center justify-between">
          <span className="text-sm font-medium text-[#8a8a9a]">💬 对话</span>
          <QuickActions onAction={handleSendMessage} />
        </div>

        <ChatInterface 
          messages={messages} 
          isProcessing={isProcessing}
          onSendMessage={handleSendMessage}
        />
      </div>
    </div>
  )
}

export default App
