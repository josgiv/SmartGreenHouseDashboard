"use client";

import { History } from "lucide-react";
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
} from "recharts";
import { Card, CardContent } from "@/components/ui/card";
import { SectionHeader } from "./section-header";
import type { ChartDataPoint } from "@/lib/types";

interface SensorChartProps {
    data: ChartDataPoint[];
}

interface CustomTooltipProps {
    active?: boolean;
    payload?: Array<{
        name: string;
        value: number;
        color: string;
        dataKey: string;
    }>;
    label?: string;
}

function CustomTooltip({ active, payload, label }: CustomTooltipProps) {
    if (!active || !payload || payload.length === 0) {
        return null;
    }

    return (
        <div className="rounded-lg border bg-popover p-3 shadow-lg">
            <p className="mb-2 text-sm font-medium text-popover-foreground">{label}</p>
            <div className="space-y-1">
                {payload.map((entry, index) => (
                    <div key={index} className="flex items-center justify-between gap-4">
                        <div className="flex items-center gap-2">
                            <div
                                className="h-2.5 w-2.5 rounded-full"
                                style={{ backgroundColor: entry.color }}
                            />
                            <span className="text-xs text-muted-foreground">{entry.name}</span>
                        </div>
                        <span className="text-xs font-medium text-popover-foreground">
                            {entry.value.toFixed(1)}
                            {entry.dataKey === "temp" ? "°C" : entry.dataKey === "light" ? " lux" : "%"}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
}

export function SensorChart({ data }: SensorChartProps) {
    return (
        <Card className="border-0 bg-gradient-to-br from-card to-card/80 shadow-lg dark:from-card dark:to-card/80">
            <CardContent className="pt-6">
                <SectionHeader
                    icon={History}
                    iconClassName="bg-purple-500/10"
                    title="Histori Sensor"
                    description="Tren data sensor 50 pembacaan terakhir"
                />

                <div className="h-[300px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={data} margin={{ top: 5, right: 10, left: -20, bottom: 5 }}>
                            <CartesianGrid
                                strokeDasharray="3 3"
                                className="stroke-border"
                                stroke="currentColor"
                                opacity={0.1}
                            />
                            <XAxis
                                dataKey="time"
                                className="text-xs"
                                tick={{ fill: "currentColor", fontSize: 10, opacity: 0.6 }}
                                tickLine={{ stroke: "currentColor", opacity: 0.2 }}
                                axisLine={{ stroke: "currentColor", opacity: 0.2 }}
                            />
                            <YAxis
                                className="text-xs"
                                tick={{ fill: "currentColor", fontSize: 10, opacity: 0.6 }}
                                tickLine={{ stroke: "currentColor", opacity: 0.2 }}
                                axisLine={{ stroke: "currentColor", opacity: 0.2 }}
                            />
                            <Tooltip content={<CustomTooltip />} />
                            <Legend
                                wrapperStyle={{ paddingTop: "10px" }}
                                formatter={(value) => (
                                    <span className="text-xs text-muted-foreground">{value}</span>
                                )}
                            />
                            <Line
                                type="monotone"
                                dataKey="temp"
                                name="Suhu (°C)"
                                stroke="#ef4444"
                                strokeWidth={2}
                                dot={false}
                                activeDot={{ r: 4, strokeWidth: 2 }}
                            />
                            <Line
                                type="monotone"
                                dataKey="humidity"
                                name="Kelembapan (%)"
                                stroke="#3b82f6"
                                strokeWidth={2}
                                dot={false}
                                activeDot={{ r: 4, strokeWidth: 2 }}
                            />
                            <Line
                                type="monotone"
                                dataKey="soilMoisture"
                                name="Tanah (%)"
                                stroke="#22c55e"
                                strokeWidth={2}
                                dot={false}
                                activeDot={{ r: 4, strokeWidth: 2 }}
                            />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            </CardContent>
        </Card>
    );
}
