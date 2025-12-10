"use client";

import { Toaster as Sonner, type ToasterProps } from "sonner";

function Toaster({ ...props }: ToasterProps) {
    return (
        <Sonner
            className="toaster group"
            style={
                {
                    "--normal-bg": "hsl(var(--popover))",
                    "--normal-text": "hsl(var(--popover-foreground))",
                    "--normal-border": "hsl(var(--border))",
                } as React.CSSProperties
            }
            toastOptions={{
                classNames: {
                    toast:
                        "group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg",
                    description: "group-[.toast]:text-muted-foreground",
                    actionButton:
                        "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
                    cancelButton:
                        "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground",
                    success:
                        "group-[.toaster]:bg-green-500/10 group-[.toaster]:text-green-600 group-[.toaster]:border-green-500/20",
                    error:
                        "group-[.toaster]:bg-red-500/10 group-[.toaster]:text-red-600 group-[.toaster]:border-red-500/20",
                    warning:
                        "group-[.toaster]:bg-yellow-500/10 group-[.toaster]:text-yellow-600 group-[.toaster]:border-yellow-500/20",
                    info: "group-[.toaster]:bg-blue-500/10 group-[.toaster]:text-blue-600 group-[.toaster]:border-blue-500/20",
                },
            }}
            {...props}
        />
    );
}

export { Toaster };
