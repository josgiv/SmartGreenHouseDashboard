"use client";

import { Thermometer, Droplets, TreeDeciduous, Sun } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { SectionHeader } from "./section-header";
import { MetricCard } from "./metric-card";
import { BarChart3 } from "lucide-react";
import type { SensorData } from "@/lib/types";
import { THRESHOLDS } from "@/lib/constants";

interface InternalConditionsProps {
    data: SensorData;
}

function getTemperatureStatus(temp: number) {
    if (temp >= THRESHOLDS.TEMP.CRITICAL) return "danger";
    if (temp >= THRESHOLDS.TEMP.MAX || temp < THRESHOLDS.TEMP.MIN) return "warning";
    if (temp >= THRESHOLDS.TEMP.OPTIMAL_MIN && temp <= THRESHOLDS.TEMP.OPTIMAL_MAX)
        return "success";
    return "normal";
}

function getHumidityStatus(humidity: number) {
    if (humidity >= THRESHOLDS.HUMIDITY.CRITICAL) return "danger";
    if (humidity >= THRESHOLDS.HUMIDITY.MAX || humidity < THRESHOLDS.HUMIDITY.MIN)
        return "warning";
    if (
        humidity >= THRESHOLDS.HUMIDITY.OPTIMAL_MIN &&
        humidity <= THRESHOLDS.HUMIDITY.OPTIMAL_MAX
    )
        return "success";
    return "normal";
}

function getSoilMoistureStatus(moisture: number) {
    if (moisture <= THRESHOLDS.SOIL_MOISTURE.CRITICAL_LOW) return "danger";
    if (moisture <= THRESHOLDS.SOIL_MOISTURE.LOW) return "warning";
    if (
        moisture >= THRESHOLDS.SOIL_MOISTURE.OPTIMAL_MIN &&
        moisture <= THRESHOLDS.SOIL_MOISTURE.OPTIMAL_MAX
    )
        return "success";
    return "normal";
}

function getLightStatus(light: number) {
    if (light <= THRESHOLDS.LIGHT.CRITICAL_LOW) return "danger";
    if (light <= THRESHOLDS.LIGHT.LOW) return "warning";
    if (
        light >= THRESHOLDS.LIGHT.OPTIMAL_MIN &&
        light <= THRESHOLDS.LIGHT.OPTIMAL_MAX
    )
        return "success";
    return "normal";
}

export function InternalConditions({ data }: InternalConditionsProps) {
    return (
        <Card className="border bg-gradient-to-br from-card to-secondary/20 shadow-lg">
            <CardContent className="pt-6">
                <SectionHeader
                    icon={BarChart3}
                    iconClassName="bg-blue-500/10 dark:bg-blue-500/20"
                    title="Kondisi Internal Saat Ini"
                    description="Data sensor dari dalam greenhouse"
                />

                <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
                    <MetricCard
                        title="Suhu Udara"
                        value={data.temp}
                        unit="°C"
                        icon={<Thermometer className="h-4 w-4" />}
                        status={getTemperatureStatus(data.temp)}
                        description={`Rentang optimal: ${THRESHOLDS.TEMP.OPTIMAL_MIN}-${THRESHOLDS.TEMP.OPTIMAL_MAX}°C`}
                    />
                    <MetricCard
                        title="Kelembapan Udara"
                        value={data.humidity}
                        unit="%"
                        icon={<Droplets className="h-4 w-4" />}
                        status={getHumidityStatus(data.humidity)}
                        description={`Rentang optimal: ${THRESHOLDS.HUMIDITY.OPTIMAL_MIN}-${THRESHOLDS.HUMIDITY.OPTIMAL_MAX}%`}
                    />
                    <MetricCard
                        title="Kelembapan Tanah"
                        value={data.soilMoisture}
                        unit="%"
                        icon={<TreeDeciduous className="h-4 w-4" />}
                        status={getSoilMoistureStatus(data.soilMoisture)}
                        description={`Rentang optimal: ${THRESHOLDS.SOIL_MOISTURE.OPTIMAL_MIN}-${THRESHOLDS.SOIL_MOISTURE.OPTIMAL_MAX}%`}
                    />
                    <MetricCard
                        title="Intensitas Cahaya"
                        value={Math.round(data.light)}
                        unit="lux"
                        icon={<Sun className="h-4 w-4" />}
                        status={getLightStatus(data.light)}
                        description={`Rentang optimal: ${THRESHOLDS.LIGHT.OPTIMAL_MIN}-${THRESHOLDS.LIGHT.OPTIMAL_MAX} lux`}
                    />
                </div>
            </CardContent>
        </Card>
    );
}
