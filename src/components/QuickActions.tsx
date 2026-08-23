import React from 'react'
import { TrendingUp, Shield, PieChart, Zap } from 'lucide-react'

interface Props {
  onAction: (text: string) => void
}

const QuickActions: React.FC<Props> = ({ onAction }) => {
  const actions = [
    { label: '收益优化', icon: TrendingUp, prompt: '帮我优化闲置资产的收益' },
    { label: '风险评估', icon: Shield, prompt: '帮我分析当前持仓风险' },
    { label: '持仓总览', icon: PieChart, prompt: '查看我的完整持仓' },
    { label: '智能执行', icon: Zap, prompt: '根据当前市场自动调整配置' },
  ]

  return (
    <div className="flex gap-2">
      {actions.map((action) => (
        <button
          key={action.label}
          onClick={() => onAction(action.prompt)}
          className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-xl bg-[#12121f] border border-[#1a1a2a] text-[#8a8a9a] hover:bg-[#1a1a2a] hover:text-[#e8e8f0] transition-all"
        >
          <action.icon size={14} />
          {action.label}
        </button>
      ))}
    </div>
  )
}

export default QuickActions
