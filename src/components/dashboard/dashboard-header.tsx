"use client";

import { Sprout, RefreshCw } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { ThemeToggle } from "@/components/theme-toggle";
import { formatDateTime } from "@/lib/utils";

interface DashboardHeaderProps {
    lastUpdated: Date;
    isLive?: boolean;
}

export function DashboardHeader({
    lastUpdated,
    isLive = true,
}: DashboardHeaderProps) {
    return (
        <header className="mb-8">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div className="flex items-center gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-green-400 to-emerald-600 shadow-lg shadow-green-500/25">
                        <Sprout className="h-7 w-7 text-white" />
                    </div>
                    <div>
                        <h1 className="text-2xl font-bold tracking-tight text-foreground md:text-3xl">
                            Dashboard Smart Greenhouse
                        </h1>
                        <p className="mt-0.5 text-sm text-muted-foreground">
                            Monitoring dan Prediksi Kondisi Greenhouse berbasis IoT dan
                            Machine Learning
                        </p>
                    </div>
                </div>

                <div className="flex items-center gap-3">
                    <ThemeToggle />

                    {isLive && (
                        <Badge variant="success" className="gap-1.5 px-3 py-1">
                            <span className="relative flex h-2 w-2">
                                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
                                <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500" />
                            </span>
                            LIVE
                        </Badge>
                    )}
                    <div className="flex items-center gap-2 rounded-lg bg-muted/50 px-3 py-2 text-xs text-muted-foreground">
                        <RefreshCw className="h-3.5 w-3.5" />
                        <span>Terakhir: {formatDateTime(lastUpdated)}</span>
                    </div>
                </div>
            </div>
        </header>
    );
}
