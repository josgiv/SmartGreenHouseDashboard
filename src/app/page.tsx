"use client";

import { Toaster } from "@/components/ui/sonner";
import { useGreenhouseData } from "@/hooks/use-greenhouse-data";
import { DashboardHeader } from "@/components/dashboard/dashboard-header";
import { InternalConditions } from "@/components/dashboard/internal-conditions";
import { ExternalConditions } from "@/components/dashboard/external-conditions";
import { AIAnalysis } from "@/components/dashboard/ai-analysis";
import { SensorChart } from "@/components/dashboard/sensor-chart";
import { GrowthPredictionPanel } from "@/components/dashboard/growth-prediction";
import { ActuatorPanel } from "@/components/dashboard/actuator-panel";
import { toast } from "sonner";
import { Sprout, Loader2 } from "lucide-react";

function LoadingScreen() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-background">
      <div className="relative">
        <div className="absolute inset-0 animate-ping rounded-full bg-green-500/20" />
        <div className="relative flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-green-400 to-emerald-600 shadow-lg">
          <Sprout className="h-8 w-8 text-white" />
        </div>
      </div>
      <div className="flex items-center gap-2 text-muted-foreground">
        <Loader2 className="h-4 w-4 animate-spin" />
        <span>Memuat data greenhouse...</span>
      </div>
    </div>
  );
}

export default function GreenhouseDashboard() {
  const {
    sensorData,
    actuatorMetrics,
    actuatorControl,
    chartData,
    lastUpdated,
    isLoading,
    recommendation,
    toggleActuator,
  } = useGreenhouseData();

  const handleToggle = (actuator: "fanOn" | "lampOn" | "pumpOn", value: boolean) => {
    toggleActuator(actuator, value);

    const labels = {
      fanOn: "Kipas",
      lampOn: "Lampu",
      pumpOn: "Pompa",
    };

    if (value) {
      toast.success(`${labels[actuator]} dinyalakan`, {
        description: "Status aktuator berhasil diperbarui",
      });
    } else {
      toast.info(`${labels[actuator]} dimatikan`, {
        description: "Status aktuator berhasil diperbarui",
      });
    }
  };

  if (isLoading || !sensorData || !actuatorMetrics) {
    return <LoadingScreen />;
  }

  return (
    <>
      <Toaster position="top-right" richColors closeButton />
      <div className="min-h-screen bg-background">
        <div className="mx-auto max-w-screen-2xl px-4 py-6 md:px-6 lg:px-8">
          <DashboardHeader lastUpdated={lastUpdated} isLive />

          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            <div className="space-y-6 lg:col-span-2">
              <InternalConditions data={sensorData} />
              <ExternalConditions data={sensorData} />
              <AIAnalysis sensorData={sensorData} />
              <SensorChart data={chartData} />
              <GrowthPredictionPanel metrics={actuatorMetrics} />
            </div>

            <div className="lg:col-span-1">
              <ActuatorPanel
                metrics={actuatorMetrics}
                control={actuatorControl}
                recommendation={recommendation}
                onToggle={handleToggle}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}