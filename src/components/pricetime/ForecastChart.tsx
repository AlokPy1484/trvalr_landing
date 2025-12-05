
'use client';

import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, ReferenceDot } from 'recharts';

interface ForecastChartProps {
    data: { day: number; price: number; best?: boolean }[];
    color: string;
    showBestBuy?: boolean;
}

export function ForecastChart({ data, color, showBestBuy = false }: ForecastChartProps) {

  const bestBuyPoint = showBestBuy ? data.find(p => p.best) : null;
    
  return (
    <div className="h-60 w-full">
        <ResponsiveContainer>
            <AreaChart data={data} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                 <defs>
                    <linearGradient id={`color-gradient`} x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor={color} stopOpacity={0.4}/>
                        <stop offset="95%" stopColor={color} stopOpacity={0}/>
                    </linearGradient>
                </defs>
                <XAxis 
                    dataKey="day" 
                    tickFormatter={(tick) => `Day ${tick}`} 
                    stroke="hsl(var(--muted-foreground))"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                />
                <YAxis
                    domain={['dataMin - 500', 'dataMax + 500']}
                    tickFormatter={(tick) => `₹${(tick/1000).toFixed(1)}k`} 
                    stroke="hsl(var(--muted-foreground))"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                    width={50}
                />
                <Tooltip
                    contentStyle={{ 
                        backgroundColor: 'hsl(var(--popover))', 
                        borderColor: 'hsl(var(--border))', 
                        borderRadius: '0.5rem',
                        color: 'hsl(var(--popover-foreground))'
                    }}
                    itemStyle={{ color: color }}
                    labelFormatter={(label) => `Day ${label}`}
                    formatter={(value) => [`₹${Number(value).toLocaleString()}`, "Price"]}
                    cursor={{ stroke: color, strokeWidth: 1, strokeDasharray: '3 3' }}
                />
                <Area 
                    type="monotone" 
                    dataKey="price" 
                    stroke={color} 
                    strokeWidth={2}
                    fill="url(#color-gradient)"
                    dot={false}
                />
                {bestBuyPoint && (
                    <ReferenceDot 
                        x={bestBuyPoint.day} 
                        y={bestBuyPoint.price} 
                        r={6} 
                        fill={color} 
                        stroke="hsl(var(--background))" 
                        strokeWidth={2} 
                    >
                         <text x={bestBuyPoint.day} y={bestBuyPoint.price - 20} fill="hsl(var(--accent-foreground))" fontSize="12" textAnchor="middle" className="font-semibold">Best Buy</text>
                    </ReferenceDot>
                )}
            </AreaChart>
        </ResponsiveContainer>
    </div>
  );
}
