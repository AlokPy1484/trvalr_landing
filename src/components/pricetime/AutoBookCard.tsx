
'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Wand2, Bell, CheckCircle, BarChart2 } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';

export function AutoBookCard() {
    const [isAutoBookActive, setIsAutoBookActive] = useState(false);
    const [targetPrice, setTargetPrice] = useState('');

    return (
        <Card className="bg-card/50 border-border/80 backdrop-blur-lg flex flex-col">
            <CardHeader>
                <CardTitle className="flex items-center gap-2 text-foreground">
                    <Wand2 className="text-accent" />
                    Auto-Book
                </CardTitle>
                <CardDescription>Let our AI book for you when the price hits your target.</CardDescription>
            </CardHeader>
            <CardContent className="flex-grow flex flex-col justify-between">
                <div className="space-y-4">
                    <div className="flex items-center justify-between">
                        <Label htmlFor="autobook-switch" className="text-lg font-medium text-foreground">Activate Auto-Book</Label>
                        <Switch id="autobook-switch" checked={isAutoBookActive} onCheckedChange={setIsAutoBookActive} />
                    </div>
                    
                    <AnimatePresence>
                        {isAutoBookActive && (
                            <motion.div 
                                initial={{ opacity: 0, height: 0 }} 
                                animate={{ opacity: 1, height: 'auto' }} 
                                exit={{ opacity: 0, height: 0 }}
                                className="space-y-4 overflow-hidden"
                            >
                                <div>
                                    <Label htmlFor="target-price">Target Price (₹)</Label>
                                    <Input 
                                        id="target-price"
                                        type="number" 
                                        placeholder="e.g., 42000"
                                        value={targetPrice}
                                        onChange={(e) => setTargetPrice(e.target.value)}
                                        className="bg-background/70 border-border mt-1"
                                    />
                                </div>
                                <div>
                                    <Button className="w-full bg-accent hover:bg-accent/90 text-accent-foreground font-bold">
                                        <Bell className="mr-2 h-4 w-4" />
                                        Set Price Alert
                                    </Button>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
                
                <div className="mt-6 border-t border-border pt-4">
                    <div className="flex items-start gap-3">
                        <BarChart2 className="h-8 w-8 text-green-500 mt-1 flex-shrink-0" />
                        <div>
                            <p className="font-semibold text-foreground">Proven Savings</p>
                            <p className="text-sm text-muted-foreground">
                                Saved <span className="font-bold text-green-500">₹6.2 Cr</span> for 42,000+ travelers last month.
                            </p>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
