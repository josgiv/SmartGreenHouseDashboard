export interface SensorData {
    id: number;
    createdAt: Date;
    temp: number;
    humidity: number;
    soilMoisture: number;
    light: number;
    extTemp: number;
    extHumidity: number;
    aqi: number;
    pm25: number;
}

export interface ActuatorMetrics {
    id: number;
    createdAt: Date;
    fanRpm: number;
    lampWatt: number;
    pumpPsi: number;
}

export interface ActuatorControl {
    id: number;
    fanOn: boolean;
    lampOn: boolean;
    pumpOn: boolean;
}

export interface ActuatorRecommendation {
    finalStatus: string;
    finalReco: string;
    futureTemp: number;
    futureHumidity: number;
    fanOn: boolean;
    lampOn: boolean;
    pumpOn: boolean;
    statusList: StatusItem[];
}

export interface StatusItem {
    type: "warning" | "danger" | "info";
    message: string;
}

export interface GrowthPrediction {
    growthStatus: "optimal" | "suboptimal" | "critical";
    growthConfidence: number;
    growthIssues: GrowthIssue[];
}

export interface GrowthIssue {
    type: "heat" | "light" | "water";
    message: string;
    severity: "low" | "medium" | "high";
}

export interface ChartDataPoint {
    time: string;
    timestamp: Date;
    temp: number;
    humidity: number;
    soilMoisture: number;
    light: number;
}

export type AqiLevel = 1 | 2 | 3 | 4 | 5;

export interface AqiInfo {
    level: AqiLevel;
    label: string;
    color: string;
    description: string;
}

export type ActuatorType = "fan" | "lamp" | "pump";

export interface ActuatorInfo {
    type: ActuatorType;
    label: string;
    icon: string;
    unit: string;
    value: number;
    isOn: boolean;
}
