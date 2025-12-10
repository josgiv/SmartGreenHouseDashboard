"use client";

import { Settings2, CheckCircle, AlertTriangle, ChevronDown } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Button } from "@/components/ui/button";
import { SectionHeader } from "./section-header";
import type { ActuatorMetrics, GrowthPrediction, GrowthIssue } from "@/lib/types";
import { THRESHOLDS } from "@/lib/constants";
import { cn, formatNumber } from "@/lib/utils";
import { useState } from "react";

interface GrowthPredictionPanelProps {
    metrics: ActuatorMetrics;
}

function analyzeGrowth(metrics: ActuatorMetrics): GrowthPrediction {
    let confidence = 85 + Math.random() * 10;
    const issues: GrowthIssue[] = [];

    if (metrics.fanRpm > THRESHOLDS.FAN_RPM.STRESS) {
        issues.push({
            type: "heat",
            message: "Terdeteksi Stres Suhu (Panas)",
            severity: metrics.fanRpm > 2300 ? "high" : "medium",
        });
        confidence -= 15;
    }

    if (metrics.lampWatt > THRESHOLDS.LAMP_WATT.STRESS) {
        issues.push({
            type: "light",
            message: "Terdeteksi Stres Cahaya (Buatan)",
            severity: metrics.lampWatt > 65 ? "high" : "medium",
        });
        confidence -= 10;
    }

    if (metrics.pumpPsi > THRESHOLDS.PUMP_PSI.STRESS) {
        issues.push({
            type: "water",
            message: "Terdeteksi Stres Air (Kering)",
            severity: metrics.pumpPsi > 30 ? "high" : "medium",
        });
        confidence -= 20;
    }

    let status: "optimal" | "suboptimal" | "critical" = "optimal";
    if (issues.length > 0) {
        status = issues.some((i) => i.severity === "high") ? "critical" : "suboptimal";
        confidence = Math.max(confidence, 30);
    }

    return {
        growthStatus: status,
        growthConfidence: confidence,
        growthIssues: issues,
    };
}

const severityColors = {
    low: "bg-yellow-500/10 text-yellow-700 dark:text-yellow-400",
    medium: "bg-orange-500/10 text-orange-700 dark:text-orange-400",
    high: "bg-red-500/10 text-red-700 dark:text-red-400",
};

const statusConfig = {
    optimal: {
        color: "text-green-700 dark:text-green-400",
        bgColor: "bg-green-500/10",
        progressColor: "bg-green-500",
        label: "Optimal",
    },
    suboptimal: {
        color: "text-yellow-700 dark:text-yellow-400",
        bgColor: "bg-yellow-500/10",
        progressColor: "bg-yellow-500",
        label: "Sub-Optimal",
    },
    critical: {
        color: "text-red-700 dark:text-red-400",
        bgColor: "bg-red-500/10",
        progressColor: "bg-red-500",
        label: "Kritis",
    },
};

export function GrowthPredictionPanel({ metrics }: GrowthPredictionPanelProps) {
    const [isOpen, setIsOpen] = useState(false);
    const prediction = analyzeGrowth(metrics);
    const config = statusConfig[prediction.growthStatus];

    return (
        <Card className="border bg-gradient-to-br from-card to-secondary/20 shadow-lg">
            <CardContent className="pt-6">
                <SectionHeader
                    icon={Settings2}
                    iconClassName="bg-orange-500/10 dark:bg-orange-500/20"
                    title="Prediksi Pertumbuhan Tanaman"
                    description="Evaluasi berbasis kinerja aktuator"
                />

                <div className="grid gap-4 md:grid-cols-3">
                    <div className="space-y-4">
                        <h3 className="text-sm font-medium text-muted-foreground">
                            Hasil Prediksi
                        </h3>

                        <div className={cn("rounded-lg p-4", config.bgColor)}>
                            <div className="flex items-center gap-2">
                                {prediction.growthStatus === "optimal" ? (
                                    <CheckCircle className="h-5 w-5" />
                                ) : (
                                    <AlertTriangle className="h-5 w-5" />
                                )}
                                <span className={cn("font-semibold", config.color)}>
                                    {config.label}
                                </span>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <div className="flex items-center justify-between text-sm">
                                <span className="text-muted-foreground">Tingkat Kepercayaan</span>
                                <span className="font-medium">
                                    {formatNumber(prediction.growthConfidence)}%
                                </span>
                            </div>
                            <Progress
                                value={prediction.growthConfidence}
                                className="h-2"
                                indicatorClassName={config.progressColor}
                            />
                        </div>
                    </div>

                    <div className="space-y-4 md:col-span-2">
                        <h3 className="text-sm font-medium text-muted-foreground">
                            Faktor yang Mempengaruhi
                        </h3>

                        {prediction.growthIssues.length === 0 ? (
                            <div className="flex items-center gap-2 rounded-lg bg-muted/50 p-4">
                                <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-500" />
                                <span className="text-sm">
                                    Tidak ada tanda-tanda stres terdeteksi.
                                </span>
                            </div>
                        ) : (
                            <div className="space-y-2">
                                {prediction.growthIssues.map((issue, idx) => (
                                    <div
                                        key={idx}
                                        className={cn(
                                            "flex items-center gap-2 rounded-lg p-3",
                                            severityColors[issue.severity]
                                        )}
                                    >
                                        <AlertTriangle className="h-4 w-4 shrink-0" />
                                        <span className="text-sm font-medium">{issue.message}</span>
                                        <Badge variant="outline" className="ml-auto text-xs">
                                            {issue.severity === "high"
                                                ? "Tinggi"
                                                : issue.severity === "medium"
                                                    ? "Sedang"
                                                    : "Rendah"}
                                        </Badge>
                                    </div>
                                ))}
                            </div>
                        )}

                        <Collapsible open={isOpen} onOpenChange={setIsOpen}>
                            <CollapsibleTrigger asChild>
                                <Button variant="ghost" className="w-full justify-between">
                                    Lihat Input Model
                                    <ChevronDown
                                        className={cn(
                                            "h-4 w-4 transition-transform",
                                            isOpen && "rotate-180"
                                        )}
                                    />
                                </Button>
                            </CollapsibleTrigger>
                            <CollapsibleContent className="mt-2">
                                <pre className="overflow-x-auto rounded-lg bg-muted p-3 text-xs">
                                    {JSON.stringify(
                                        {
                                            fitur_1_rpm_kipas: metrics.fanRpm,
                                            fitur_2_watt_lampu: formatNumber(metrics.lampWatt),
                                            fitur_3_psi_pompa: formatNumber(metrics.pumpPsi),
                                        },
                                        null,
                                        2
                                    )}
                                </pre>
                            </CollapsibleContent>
                        </Collapsible>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
