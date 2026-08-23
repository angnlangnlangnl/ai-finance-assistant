import React from 'react'
import { Asset } from '../types'
import { TrendingUp, TrendingDown, Wallet } from 'lucide-react'

interface Props {
  assets: Asset[]
  totalValue: number
}

const AssetOverview: React.FC<Props> = ({ assets, totalValue }) => {
  const change = 2.3

  return (
    <div className="space-y-4">
      <div className="bg-[#12121f] rounded-2xl p-4 border border-[#1a1a2a]">
        <div className="flex items-center justify-between">
          <span className="text-sm text-[#6a6a7a]">总资产</span>
          <span className={`text-sm ${change >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
            {change >= 0 ? '+' : ''}{change}%
          </span>
        </div>
        <div className="text-2xl font-bold mt-1">${totalValue.toLocaleString()}</div>
        <div className="flex items-center gap-2 mt-2 text-xs text-[#5a5a5a]">
          <Wallet size={14} />
          <span>{assets.length} 种资产 · 4 条链</span>
        </div>
      </div>

      <div className="space-y-1.5">
        {assets.map((asset) => (
          <div key={asset.symbol} className="flex items-center justify-between py-2 px-3 rounded-xl hover:bg-[#12121f] transition-colors cursor-pointer">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-[#1a1a2a] flex items-center justify-center text-xs font-bold text-[#6a6a7a]">
                {asset.symbol.slice(0, 2)}
              </div>
              <div>
                <div className="text-sm font-medium">{asset.symbol}</div>
                <div className="text-xs text-[#5a5a6a]">{asset.balance} · {asset.chain}</div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-sm font-medium">${asset.usdValue.toLocaleString()}</div>
              <div className="text-xs text-[#5a5a6a]">
                {((asset.usdValue / totalValue) * 100).toFixed(1)}%
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default AssetOverview
