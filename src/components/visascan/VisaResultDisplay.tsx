
'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle, AlertTriangle, XCircle, FileText, Download, Compass, RefreshCw } from 'lucide-react';
import type { VisaCheckOutput } from '@/ai/flows/visa-check-flow';
import { ApprovalGauge } from './ApprovalGauge';
import { SmartTimeline } from './SmartTimeline';
import { GlobalVisaTracker } from './GlobalVisaTracker';

interface VisaResultDisplayProps {
  result: VisaCheckOutput;
  onReset: () => void;
}

const statusInfo = {
  'NOT_REQUIRED': {
    icon: CheckCircle,
    color: 'text-green-500',
    title: 'You DO NOT need a visa.',
  },
  'ON_ARRIVAL': {
    icon: AlertTriangle,
    color: 'text-yellow-500',
    title: 'Visa-on-arrival available.',
  },
  'REQUIRED': {
    icon: XCircle,
    color: 'text-destructive',
    title: 'Visa Required.',
  },
};

const AITipCard = ({ tip }: { tip: string }) => (
    <div className="mt-4 p-4 bg-primary/10 border border-primary/20 rounded-lg">
        <p className="text-sm text-primary-foreground/90"><span className="font-bold text-primary">AI Tip:</span> {tip}</p>
    </div>
);

const DocumentRequirement = ({ documentName }: { documentName: string }) => (
  <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-md">
    <FileText className="h-5 w-5 text-muted-foreground" />
    <span className="text-sm font-medium text-foreground">{documentName}</span>
  </div>
);

export function VisaResultDisplay({ result, onReset }: VisaResultDisplayProps) {
  const currentStatus = statusInfo[result.visaStatus];

  return (
    <div className="w-full max-w-7xl">
        <Card className="bg-card/50 backdrop-blur-lg border border-border/20 shadow-2xl mb-6">
            <CardHeader className="text-center border-b border-border/20 p-4">
                <div className="flex items-center justify-center gap-3">
                    <currentStatus.icon className={`h-8 w-8 ${currentStatus.color}`} />
                    <CardTitle className="text-2xl font-bold text-foreground">{currentStatus.title}</CardTitle>
                </div>
                <p className="text-muted-foreground pt-1 text-base">{result.summary}</p>
            </CardHeader>
        </Card>
        
        <div className="grid lg:grid-cols-3 gap-6">
            {/* Left Column */}
            <div className="lg:col-span-2 space-y-6">
                <Card className="bg-card/50 backdrop-blur-lg border border-border/20 shadow-xl">
                    <CardHeader>
                        <h3 className="font-semibold text-lg text-foreground">Documents Needed</h3>
                    </CardHeader>
                    <CardContent className="space-y-2">
                        {result.requiredDocuments.map((doc, index) => (
                            <DocumentRequirement key={index} documentName={doc} />
                        ))}
                    </CardContent>
                </Card>

                 <Card className="bg-card/50 backdrop-blur-lg border border-border/20 shadow-xl">
                    <CardHeader>
                        <h3 className="font-semibold text-lg text-foreground">Application Resources</h3>
                    </CardHeader>
                    <CardContent className="grid sm:grid-cols-2 gap-4 items-start">
                         <div>
                            <h4 className="font-medium text-foreground mb-2">Key Details</h4>
                             <div className="flex justify-between items-center text-sm p-3 bg-muted/50 rounded-md">
                                <span className="text-muted-foreground">Processing Time:</span>
                                <span className="font-medium text-foreground">{result.processingTime}</span>
                             </div>
                             <div className="flex justify-between items-center text-sm p-3 bg-muted/50 rounded-md mt-2">
                                <span className="text-muted-foreground">Estimated Cost:</span>
                                <span className="font-medium text-foreground">{result.cost}</span>
                             </div>
                         </div>
                        <div className="flex flex-col space-y-2 justify-end h-full">
                            <Button variant="outline" className="w-full justify-start gap-2">
                                <Download className="h-4 w-4" /> Download Pre-filled PDF
                            </Button>
                            <Button variant="outline" className="w-full justify-start gap-2">
                                <Compass className="h-4 w-4" /> Find Nearest Consulate
                            </Button>
                        </div>
                    </CardContent>
                </Card>

                {result.aiTip && <AITipCard tip={result.aiTip} />}
            </div>

            {/* Right Column */}
            <div className="space-y-6">
                <ApprovalGauge chance={result.approvalChance} riskFactors={result.riskFactors} />
                <SmartTimeline timeline={result.timeline} />
                <GlobalVisaTracker />
            </div>
        </div>

        <div className="mt-8 text-center">
            <Button onClick={onReset}><RefreshCw className="mr-2 h-4 w-4" />Start a New Check</Button>
        </div>
    </div>
  );
}
