"use client";

import { Cpu } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { SectionHeader } from "./section-header";
import { ActuatorStatus } from "./actuator-status";
import { ActuatorControlPanel } from "./actuator-control";
import type { ActuatorMetrics, ActuatorControl } from "@/lib/types";

interface ActuatorPanelProps {
    metrics: ActuatorMetrics;
    control: ActuatorControl;
    recommendation: {
        fanOn: boolean;
        lampOn: boolean;
        pumpOn: boolean;
    };
    onToggle: (actuator: "fanOn" | "lampOn" | "pumpOn", value: boolean) => void;
}

export function ActuatorPanel({
    metrics,
    control,
    recommendation,
    onToggle,
}: ActuatorPanelProps) {
    return (
        <Card className="border bg-gradient-to-br from-card to-secondary/20 shadow-lg lg:sticky lg:top-6">
            <CardContent className="pt-6">
                <SectionHeader
                    icon={Cpu}
                    iconClassName="bg-pink-500/10 dark:bg-pink-500/20"
                    title="Status & Kontrol Aktuator"
                    description="Monitoring dan kontrol perangkat"
                />

                <div className="space-y-4">
                    <h3 className="text-sm font-medium text-muted-foreground">
                        Monitoring Kinerja
                    </h3>

                    <ActuatorStatus type="fan" metrics={metrics} control={control} />
                    <ActuatorStatus type="lamp" metrics={metrics} control={control} />
                    <ActuatorStatus type="pump" metrics={metrics} control={control} />
                </div>

                <Separator className="my-6" />

                <ActuatorControlPanel
                    control={control}
                    recommendation={recommendation}
                    onToggle={onToggle}
                />
            </CardContent>
        </Card>
    );
}
