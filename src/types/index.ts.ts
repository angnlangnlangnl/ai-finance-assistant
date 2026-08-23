export interface Asset {
  symbol: string
  name: string
  balance: number
  usdValue: number
  chain: string
  icon?: string
}

export interface Message {
  id: string
  role: 'user' | 'assistant' | 'system'
  content: string
  timestamp: Date
  type?: 'text' | 'asset_summary' | 'transaction_preview' | 'alert'
  data?: any
}

export interface TransactionPreview {
  from: string
  to: string
  amount: number
  token: string
  chain: string
  estimatedGas: string
  totalUsd: number
}

export interface UserProfile {
  riskTolerance: 'conservative' | 'moderate' | 'aggressive'
  preferredChains: string[]
  watchlist: string[]
}
