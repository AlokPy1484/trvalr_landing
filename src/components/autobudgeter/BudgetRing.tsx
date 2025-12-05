
'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip } from 'recharts';

export interface CategorySpend {
  name: string;
  value: number;
  color: string;
}

interface BudgetRingProps {
  data: CategorySpend[];
  totalBudget: number;
}

const CustomTooltip = ({ active, payload, totalBudget }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    const percentage = ((data.value / totalBudget) * 100).toFixed(1);
    return (
      <div className="bg-popover/80 backdrop-blur-sm text-popover-foreground p-3 rounded-lg border border-border">
        <p className="font-bold">{`${data.name}: ₹${data.value.toLocaleString()}`}</p>
        <p className="text-sm text-muted-foreground">{`(${percentage}%)`}</p>
      </div>
    );
  }
  return null;
};

export function BudgetRing({ data, totalBudget }: BudgetRingProps) {
  const spentAmount = data.reduce((acc, item) => acc + item.value, 0);
  const remainingAmount = totalBudget - spentAmount;

  return (
    <Card className="bg-card/50 border border-border text-foreground">
      <CardHeader>
        <CardTitle>Budget Overview</CardTitle>
        <CardDescription className="text-muted-foreground">Your spending breakdown.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="w-full h-52 relative">
          <ResponsiveContainer>
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                fill="#8884d8"
                paddingAngle={5}
                dataKey="value"
                nameKey="name"
                cornerRadius={5}
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} stroke={entry.color} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip totalBudget={totalBudget} />} />
            </PieChart>
          </ResponsiveContainer>
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
            <span className="text-sm text-muted-foreground">Spent</span>
            <span className="text-xl font-bold text-primary">
              ₹{spentAmount.toLocaleString()}
            </span>
          </div>
        </div>
        <div className="mt-4 space-y-2">
            <div className="flex justify-between items-center text-sm">
                <span className="text-muted-foreground">Total Budget:</span>
                <span className="font-semibold text-foreground">₹{totalBudget.toLocaleString()}</span>
            </div>
            <div className="flex justify-between items-center text-sm">
                <span className="text-muted-foreground">Remaining:</span>
                <span className={`font-semibold ${remainingAmount >= 0 ? 'text-green-500' : 'text-destructive'}`}>
                    ₹{remainingAmount.toLocaleString()}
                </span>
            </div>
        </div>
      </CardContent>
    </Card>
  );
}
