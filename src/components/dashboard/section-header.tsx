"use client";

import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface SectionHeaderProps {
    icon: LucideIcon;
    iconClassName?: string;
    title: string;
    description?: string;
    action?: React.ReactNode;
}

export function SectionHeader({
    icon: Icon,
    iconClassName,
    title,
    description,
    action,
}: SectionHeaderProps) {
    return (
        <div className="mb-4 flex items-start justify-between">
            <div className="flex items-center gap-3">
                <div
                    className={cn(
                        "flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10",
                        iconClassName
                    )}
                >
                    <Icon className="h-5 w-5 text-primary" />
                </div>
                <div>
                    <h2 className="text-lg font-semibold text-foreground">{title}</h2>
                    {description && (
                        <p className="text-sm text-muted-foreground">{description}</p>
                    )}
                </div>
            </div>
            {action && <div>{action}</div>}
        </div>
    );
}
