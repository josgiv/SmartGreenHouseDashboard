"use client";

import { CloudRain, Thermometer, Droplets, Wind } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { SectionHeader } from "./section-header";
import { MetricCard } from "./metric-card";
import type { SensorData } from "@/lib/types";
import { AQI_LEVELS, THRESHOLDS } from "@/lib/constants";
import { cn } from "@/lib/utils";

interface ExternalConditionsProps {
    data: SensorData;
}

function getAqiInfo(aqi: number) {
    return AQI_LEVELS[Math.min(Math.max(aqi, 1), 5)];
}

export function ExternalConditions({ data }: ExternalConditionsProps) {
    const aqiInfo = getAqiInfo(data.aqi);

    return (
        <Card className="border bg-gradient-to-br from-card to-secondary/20 shadow-lg">
            <CardContent className="pt-6">
                <SectionHeader
                    icon={CloudRain}
                    iconClassName="bg-indigo-500/10 dark:bg-indigo-500/20"
                    title="Kondisi Eksternal"
                    description="Data cuaca dan kualitas udara luar"
                />

                <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
                    <MetricCard
                        title="Suhu Eksternal"
                        value={data.extTemp}
                        unit="°C"
                        icon={<Thermometer className="h-4 w-4" />}
                        status={data.extTemp > THRESHOLDS.EXT_TEMP.HOT ? "warning" : "normal"}
                        description="Suhu udara di luar greenhouse"
                    />
                    <MetricCard
                        title="Kelembapan Eksternal"
                        value={data.extHumidity}
                        unit="%"
                        icon={<Droplets className="h-4 w-4" />}
                        status={
                            data.extHumidity < THRESHOLDS.EXT_HUMIDITY.LOW ? "warning" : "normal"
                        }
                        description="Kelembapan udara eksternal"
                    />

                    <div className="rounded-xl border bg-card p-4 shadow-sm transition-all hover:shadow-md">
                        <div className="flex items-start justify-between">
                            <div className="space-y-1">
                                <p className="text-xs font-medium text-muted-foreground">
                                    Kualitas Udara (AQI)
                                </p>
                                <div className="flex items-center gap-2">
                                    <Badge
                                        className={cn(
                                            "font-semibold",
                                            aqiInfo.level <= 1
                                                ? "bg-green-500/15 text-green-700 dark:text-green-400"
                                                : aqiInfo.level === 2
                                                    ? "bg-yellow-500/15 text-yellow-700 dark:text-yellow-400"
                                                    : aqiInfo.level === 3
                                                        ? "bg-orange-500/15 text-orange-700 dark:text-orange-400"
                                                        : "bg-red-500/15 text-red-700 dark:text-red-400"
                                        )}
                                    >
                                        {aqiInfo.label}
                                    </Badge>
                                </div>
                            </div>
                            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-muted/50 text-muted-foreground">
                                <Wind className="h-4 w-4" />
                            </div>
                        </div>

                        <div className="mt-3 space-y-1">
                            <div className="flex items-center justify-between text-xs">
                                <span className="text-muted-foreground">PM2.5</span>
                                <span className="font-medium">{data.pm25.toFixed(1)} μg/m³</span>
                            </div>
                            <p className="text-xs text-muted-foreground">{aqiInfo.description}</p>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
