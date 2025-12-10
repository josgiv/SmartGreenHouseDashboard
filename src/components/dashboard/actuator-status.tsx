"use client";

import { Fan, Lightbulb, Droplets } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { MetricCard } from "./metric-card";
import type { ActuatorType, ActuatorMetrics, ActuatorControl } from "@/lib/types";
import { cn } from "@/lib/utils";

interface ActuatorStatusProps {
    type: ActuatorType;
    metrics: ActuatorMetrics;
    control: ActuatorControl;
}

const actuatorConfig = {
    fan: {
        label: "Kipas (Fan)",
        icon: Fan,
        metricTitle: "Kecepatan Kipas",
        unit: "RPM",
        getValue: (m: ActuatorMetrics) => m.fanRpm,
        getIsOn: (c: ActuatorControl) => c.fanOn,
    },
    lamp: {
        label: "Lampu (Grow Light)",
        icon: Lightbulb,
        metricTitle: "Konsumsi Daya",
        unit: "Watt",
        getValue: (m: ActuatorMetrics) => m.lampWatt,
        getIsOn: (c: ActuatorControl) => c.lampOn,
    },
    pump: {
        label: "Pompa Air",
        icon: Droplets,
        metricTitle: "Tekanan Pompa",
        unit: "PSI",
        getValue: (m: ActuatorMetrics) => m.pumpPsi,
        getIsOn: (c: ActuatorControl) => c.pumpOn,
    },
};

export function ActuatorStatus({ type, metrics, control }: ActuatorStatusProps) {
    const config = actuatorConfig[type];
    const Icon = config.icon;
    const isOn = config.getIsOn(control);
    const value = config.getValue(metrics);

    return (
        <div className="space-y-2">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <Icon className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm font-medium">{config.label}</span>
                </div>
                <Badge
                    variant={isOn ? "success" : "secondary"}
                    className={cn(
                        "gap-1.5 transition-all",
                        isOn && "shadow-sm shadow-green-500/25"
                    )}
                >
                    <span
                        className={cn(
                            "h-1.5 w-1.5 rounded-full",
                            isOn ? "bg-green-500 animate-pulse" : "bg-muted-foreground"
                        )}
                    />
                    {isOn ? "MENYALA" : "MATI"}
                </Badge>
            </div>

            <MetricCard
                title={config.metricTitle}
                value={isOn ? value : 0}
                unit={config.unit}
                icon={<Icon className="h-4 w-4" />}
                status={isOn ? "success" : "normal"}
            />
        </div>
    );
}
