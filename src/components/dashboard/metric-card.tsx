"use client";

import { TrendingUp, TrendingDown, Minus } from "lucide-react";
import { cn, formatNumber } from "@/lib/utils";
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from "@/components/ui/tooltip";

interface MetricCardProps {
    title: string;
    value: number | string;
    unit?: string;
    icon?: React.ReactNode;
    trend?: "up" | "down" | "neutral";
    trendValue?: string;
    status?: "normal" | "warning" | "danger" | "success";
    description?: string;
    className?: string;
}

const statusColors = {
    normal: "border-border bg-card",
    warning: "border-yellow-500/50 bg-yellow-500/5 dark:bg-yellow-500/10",
    danger: "border-red-500/50 bg-red-500/5 dark:bg-red-500/10",
    success: "border-green-500/50 bg-green-500/5 dark:bg-green-500/10",
};

const trendColors = {
    up: "text-green-600 dark:text-green-500",
    down: "text-red-600 dark:text-red-500",
    neutral: "text-muted-foreground",
};

export function MetricCard({
    title,
    value,
    unit,
    icon,
    trend,
    trendValue,
    status = "normal",
    description,
    className,
}: MetricCardProps) {
    const TrendIcon =
        trend === "up" ? TrendingUp : trend === "down" ? TrendingDown : Minus;
    const displayValue =
        typeof value === "number" ? formatNumber(value) : value;

    const content = (
        <div
            className={cn(
                "group relative overflow-hidden rounded-xl border p-4 shadow-sm transition-all hover:shadow-md",
                statusColors[status],
                className
            )}
        >
            <div className="flex items-start justify-between">
                <div className="space-y-1">
                    <p className="text-xs font-medium text-muted-foreground">{title}</p>
                    <div className="flex items-baseline gap-1">
                        <span className="text-2xl font-bold tracking-tight text-foreground">
                            {displayValue}
                        </span>
                        {unit && (
                            <span className="text-sm font-medium text-muted-foreground">
                                {unit}
                            </span>
                        )}
                    </div>
                </div>
                {icon && (
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-muted/50 text-muted-foreground transition-colors group-hover:bg-muted">
                        {icon}
                    </div>
                )}
            </div>

            {trend && trendValue && (
                <div className={cn("mt-2 flex items-center gap-1", trendColors[trend])}>
                    <TrendIcon className="h-3.5 w-3.5" />
                    <span className="text-xs font-medium">{trendValue}</span>
                </div>
            )}

            <div className="absolute inset-x-0 bottom-0 h-0.5 bg-gradient-to-r from-transparent via-primary/20 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
        </div>
    );

    if (description) {
        return (
            <Tooltip>
                <TooltipTrigger asChild>{content}</TooltipTrigger>
                <TooltipContent side="bottom" className="max-w-xs">
                    <p>{description}</p>
                </TooltipContent>
            </Tooltip>
        );
    }

    return content;
}
