import type { AqiInfo } from "./types";

export const THRESHOLDS = {
    TEMP: {
        MIN: 18,
        OPTIMAL_MIN: 22,
        OPTIMAL_MAX: 28,
        MAX: 32,
        CRITICAL: 35,
    },
    HUMIDITY: {
        MIN: 40,
        OPTIMAL_MIN: 55,
        OPTIMAL_MAX: 75,
        MAX: 85,
        CRITICAL: 90,
    },
    SOIL_MOISTURE: {
        CRITICAL_LOW: 30,
        LOW: 45,
        OPTIMAL_MIN: 55,
        OPTIMAL_MAX: 75,
        HIGH: 85,
    },
    LIGHT: {
        CRITICAL_LOW: 200,
        LOW: 400,
        OPTIMAL_MIN: 600,
        OPTIMAL_MAX: 1200,
        HIGH: 1500,
    },
    EXT_TEMP: {
        HOT: 33,
    },
    EXT_HUMIDITY: {
        LOW: 45,
    },
    AQI: {
        BAD: 3,
    },
    FAN_RPM: {
        STRESS: 2000,
    },
    LAMP_WATT: {
        STRESS: 50,
    },
    PUMP_PSI: {
        STRESS: 25,
    },
} as const;

export const AQI_LEVELS: Record<number, AqiInfo> = {
    1: {
        level: 1,
        label: "Baik",
        color: "bg-green-500",
        description: "Kualitas udara memuaskan",
    },
    2: {
        level: 2,
        label: "Sedang",
        color: "bg-yellow-500",
        description: "Kualitas udara dapat diterima",
    },
    3: {
        level: 3,
        label: "Tidak Sehat",
        color: "bg-orange-500",
        description: "Sensitif terhadap polusi",
    },
    4: {
        level: 4,
        label: "Sangat Tidak Sehat",
        color: "bg-red-500",
        description: "Efek kesehatan serius",
    },
    5: {
        level: 5,
        label: "Berbahaya",
        color: "bg-purple-500",
        description: "Kondisi darurat kesehatan",
    },
};

export const UPDATE_INTERVAL_MS = 3000;

export const CHART_DATA_POINTS = 50;

export const ACTUATOR_LABELS = {
    fan: {
        name: "Kipas",
        unit: "RPM",
        icon: "Fan",
    },
    lamp: {
        name: "Lampu Tumbuh",
        unit: "Watt",
        icon: "Lightbulb",
    },
    pump: {
        name: "Pompa Air",
        unit: "PSI",
        icon: "Droplets",
    },
} as const;
