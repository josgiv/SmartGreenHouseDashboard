"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Sun, Moon, Monitor } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

export function ThemeToggle() {
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setMounted(true);
        }, 0);
        return () => clearTimeout(timer);
    }, []);

    if (!mounted) {
        return (
            <div className="flex items-center gap-1 rounded-lg bg-muted/50 p-1">
                <div className="h-8 w-8 animate-pulse rounded-md bg-muted" />
                <div className="h-8 w-8 animate-pulse rounded-md bg-muted" />
                <div className="h-8 w-8 animate-pulse rounded-md bg-muted" />
            </div>
        );
    }

    const options = [
        { value: "light", icon: Sun, label: "Mode Terang" },
        { value: "dark", icon: Moon, label: "Mode Gelap" },
        { value: "system", icon: Monitor, label: "Ikuti Sistem" },
    ] as const;

    return (
        <div className="flex items-center gap-1 rounded-lg bg-muted/50 p-1">
            {options.map((option) => {
                const Icon = option.icon;
                const isActive = theme === option.value;

                return (
                    <Tooltip key={option.value}>
                        <TooltipTrigger asChild>
                            <Button
                                variant="ghost"
                                size="icon"
                                className={cn(
                                    "h-8 w-8 rounded-md transition-all",
                                    isActive
                                        ? "bg-background text-foreground shadow-sm"
                                        : "text-muted-foreground hover:text-foreground"
                                )}
                                onClick={() => setTheme(option.value)}
                            >
                                <Icon className="h-4 w-4" />
                                <span className="sr-only">{option.label}</span>
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent side="bottom">
                            <p>{option.label}</p>
                        </TooltipContent>
                    </Tooltip>
                );
            })}
        </div>
    );
}
