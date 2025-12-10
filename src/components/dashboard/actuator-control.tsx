"use client";

import { Gamepad2 } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import type { ActuatorControl } from "@/lib/types";
import { cn } from "@/lib/utils";

interface ActuatorControlPanelProps {
    control: ActuatorControl;
    recommendation: {
        fanOn: boolean;
        lampOn: boolean;
        pumpOn: boolean;
    };
    onToggle: (actuator: "fanOn" | "lampOn" | "pumpOn", value: boolean) => void;
}

const controlItems = [
    { key: "fanOn" as const, label: "Kipas (Fan)", recoKey: "fanOn" as const },
    { key: "lampOn" as const, label: "Lampu (Grow Light)", recoKey: "lampOn" as const },
    { key: "pumpOn" as const, label: "Pompa Air", recoKey: "pumpOn" as const },
];

export function ActuatorControlPanel({
    control,
    recommendation,
    onToggle,
}: ActuatorControlPanelProps) {
    return (
        <div className="space-y-4">
            <div className="flex items-center gap-2">
                <Gamepad2 className="h-4 w-4 text-muted-foreground" />
                <h3 className="text-sm font-semibold">Kontrol Manual (Overdrive)</h3>
            </div>

            <p className="text-xs text-muted-foreground">
                Ambil alih kontrol aktuator secara manual. Status akan disinkronkan dengan perangkat IoT.
            </p>

            <div className="space-y-3">
                {controlItems.map((item) => {
                    const isOn = control[item.key];
                    const isRecommended = recommendation[item.recoKey];
                    const matchesReco = isOn === isRecommended;

                    return (
                        <div
                            key={item.key}
                            className={cn(
                                "flex items-center justify-between rounded-lg border p-3 transition-colors",
                                isOn
                                    ? "border-green-500/30 bg-green-500/5 dark:bg-green-500/10"
                                    : "border-border bg-card"
                            )}
                        >
                            <div className="space-y-1">
                                <span className="text-sm font-medium">{item.label}</span>
                                {!matchesReco && (
                                    <div className="flex items-center gap-1">
                                        <span className="text-xs text-muted-foreground">Rekomendasi AI:</span>
                                        <Badge variant={isRecommended ? "success" : "secondary"} className="text-[10px] px-1.5 py-0">
                                            {isRecommended ? "ON" : "OFF"}
                                        </Badge>
                                    </div>
                                )}
                            </div>
                            <Switch
                                checked={isOn}
                                onCheckedChange={(value) => onToggle(item.key, value)}
                            />
                        </div>
                    );
                })}
            </div>

            <div className="rounded-lg bg-muted/50 p-3">
                <p className="text-xs text-muted-foreground">
                    <span className="font-medium">Rekomendasi AI:</span>{" "}
                    Kipas: {recommendation.fanOn ? "ON" : "OFF"},{" "}
                    Lampu: {recommendation.lampOn ? "ON" : "OFF"},{" "}
                    Pompa: {recommendation.pumpOn ? "ON" : "OFF"}
                </p>
            </div>
        </div>
    );
}
