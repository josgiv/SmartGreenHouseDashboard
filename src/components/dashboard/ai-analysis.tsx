"use client";

import { Brain, AlertTriangle, CheckCircle, Zap } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { SectionHeader } from "./section-header";
import { MetricCard } from "./metric-card";
import type { SensorData, ActuatorRecommendation } from "@/lib/types";
import { THRESHOLDS } from "@/lib/constants";
import { cn, formatNumber } from "@/lib/utils";

interface AIAnalysisProps {
    sensorData: SensorData;
}

function analyzeConditions(data: SensorData): ActuatorRecommendation {
    const statuses: { type: "warning" | "danger"; message: string }[] = [];
    const recommendations: string[] = [];

    if (
        data.extTemp > THRESHOLDS.EXT_TEMP.HOT &&
        data.extHumidity < THRESHOLDS.EXT_HUMIDITY.LOW &&
        data.soilMoisture < THRESHOLDS.SOIL_MOISTURE.OPTIMAL_MIN
    ) {
        statuses.push({ type: "warning", message: "Siaga Kemarau (Eksternal)" });
        if (!recommendations.includes("Nyalakan Pompa Air")) {
            recommendations.push("Nyalakan Pompa Air");
        }
    }

    if (data.aqi >= THRESHOLDS.AQI.BAD) {
        statuses.push({ type: "danger", message: "Cuaca Buruk (Polusi Tinggi)" });
        if (!recommendations.includes("Nyalakan Kipas")) {
            recommendations.push("Nyalakan Kipas");
        }
    }

    if (data.temp > THRESHOLDS.TEMP.MAX) {
        statuses.push({ type: "warning", message: "Stres Panas (Internal)" });
        if (!recommendations.includes("Nyalakan Kipas")) {
            recommendations.push("Nyalakan Kipas");
        }
    }

    if (data.soilMoisture < THRESHOLDS.SOIL_MOISTURE.LOW) {
        statuses.push({ type: "warning", message: "Tanah Kering (Internal)" });
        if (!recommendations.includes("Nyalakan Pompa Air")) {
            recommendations.push("Nyalakan Pompa Air");
        }
    }

    if (data.humidity > THRESHOLDS.HUMIDITY.MAX) {
        statuses.push({ type: "warning", message: "Terlalu Lembap (Internal)" });
        if (!recommendations.includes("Nyalakan Kipas")) {
            recommendations.push("Nyalakan Kipas");
        }
    }

    if (data.light < THRESHOLDS.LIGHT.LOW) {
        statuses.push({ type: "warning", message: "Kurang Cahaya (Internal)" });
        if (!recommendations.includes("Nyalakan Lampu")) {
            recommendations.push("Nyalakan Lampu");
        }
    }

    const finalStatus = statuses.length > 0 ? statuses.map((s) => s.message).join(", ") : "Optimal";
    const finalReco = recommendations.length > 0 ? [...new Set(recommendations)].join(", ") : "Tidak ada tindakan diperlukan";

    const variation = () => Math.random() * 1.5 - 0.5;
    const futureTemp = data.temp + variation();
    const futureHumidity = data.humidity + variation() * 2;

    return {
        finalStatus,
        finalReco,
        futureTemp,
        futureHumidity,
        fanOn: finalReco.includes("Kipas"),
        lampOn: finalReco.includes("Lampu"),
        pumpOn: finalReco.includes("Pompa"),
        statusList: statuses,
    };
}

export function AIAnalysis({ sensorData }: AIAnalysisProps) {
    const analysis = analyzeConditions(sensorData);
    const isOptimal = analysis.statusList.length === 0;

    return (
        <Card className="border bg-gradient-to-br from-card to-secondary/20 shadow-lg">
            <CardContent className="pt-6">
                <SectionHeader
                    icon={Brain}
                    iconClassName="bg-teal-500/10 dark:bg-teal-500/20"
                    title="Analisis AI"
                    description="Rekomendasi berbasis sensor dan kondisi lingkungan"
                />

                <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-3">
                        <h3 className="text-sm font-medium text-muted-foreground">
                            Prediksi Status
                        </h3>
                        <div
                            className={cn(
                                "rounded-lg p-4",
                                isOptimal
                                    ? "bg-green-500/10 text-green-700 dark:text-green-400"
                                    : "bg-yellow-500/10 text-yellow-700 dark:text-yellow-400"
                            )}
                        >
                            <div className="flex items-center gap-2">
                                {isOptimal ? (
                                    <CheckCircle className="h-5 w-5" />
                                ) : (
                                    <AlertTriangle className="h-5 w-5" />
                                )}
                                <span className="font-semibold">{analysis.finalStatus}</span>
                            </div>
                        </div>

                        {!isOptimal && (
                            <div className="flex flex-wrap gap-2">
                                {analysis.statusList.map((status, idx) => (
                                    <Badge
                                        key={idx}
                                        variant={status.type === "danger" ? "danger" : "warning"}
                                    >
                                        {status.message}
                                    </Badge>
                                ))}
                            </div>
                        )}
                    </div>

                    <div className="space-y-3">
                        <h3 className="text-sm font-medium text-muted-foreground">
                            Rekomendasi Tindakan
                        </h3>
                        <div className="rounded-lg bg-blue-500/10 p-4 text-blue-700 dark:text-blue-400">
                            <div className="flex items-center gap-2">
                                <Zap className="h-5 w-5" />
                                <span className="font-semibold">{analysis.finalReco}</span>
                            </div>
                        </div>

                        <div className="flex gap-2">
                            <Badge variant={analysis.fanOn ? "success" : "secondary"}>
                                Kipas: {analysis.fanOn ? "ON" : "OFF"}
                            </Badge>
                            <Badge variant={analysis.lampOn ? "success" : "secondary"}>
                                Lampu: {analysis.lampOn ? "ON" : "OFF"}
                            </Badge>
                            <Badge variant={analysis.pumpOn ? "success" : "secondary"}>
                                Pompa: {analysis.pumpOn ? "ON" : "OFF"}
                            </Badge>
                        </div>
                    </div>
                </div>

                <div className="mt-6">
                    <h3 className="mb-3 text-sm font-medium text-muted-foreground">
                        Prediksi 1 Jam ke Depan
                    </h3>
                    <div className="grid grid-cols-2 gap-3">
                        <MetricCard
                            title="Prediksi Suhu"
                            value={formatNumber(analysis.futureTemp)}
                            unit="°C"
                            trend={analysis.futureTemp > sensorData.temp ? "up" : "down"}
                            trendValue={`${analysis.futureTemp > sensorData.temp ? "+" : ""}${formatNumber(analysis.futureTemp - sensorData.temp)}°C`}
                        />
                        <MetricCard
                            title="Prediksi Kelembapan"
                            value={formatNumber(analysis.futureHumidity)}
                            unit="%"
                            trend={analysis.futureHumidity > sensorData.humidity ? "up" : "down"}
                            trendValue={`${analysis.futureHumidity > sensorData.humidity ? "+" : ""}${formatNumber(analysis.futureHumidity - sensorData.humidity)}%`}
                        />
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
