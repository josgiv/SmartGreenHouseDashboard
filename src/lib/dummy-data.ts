import type {
    SensorData,
    ActuatorMetrics,
    ActuatorControl,
    ChartDataPoint,
} from "./types";
import { randomInRange, clamp } from "./utils";
import { CHART_DATA_POINTS } from "./constants";

let lastSensorData: SensorData | null = null;
let lastActuatorMetrics: ActuatorMetrics | null = null;

function generateWithVariation(base: number, variation: number): number {
    const change = randomInRange(-variation, variation);
    return base + change;
}

export function generateSensorData(): SensorData {
    const baseTemp = lastSensorData?.temp ?? 26;
    const baseHumidity = lastSensorData?.humidity ?? 65;
    const baseSoilMoisture = lastSensorData?.soilMoisture ?? 60;
    const baseLight = lastSensorData?.light ?? 800;
    const baseExtTemp = lastSensorData?.extTemp ?? 30;
    const baseExtHumidity = lastSensorData?.extHumidity ?? 55;

    const newData: SensorData = {
        id: Date.now(),
        createdAt: new Date(),
        temp: clamp(generateWithVariation(baseTemp, 0.5), 18, 38),
        humidity: clamp(generateWithVariation(baseHumidity, 2), 30, 95),
        soilMoisture: clamp(generateWithVariation(baseSoilMoisture, 1.5), 20, 90),
        light: clamp(generateWithVariation(baseLight, 50), 100, 1800),
        extTemp: clamp(generateWithVariation(baseExtTemp, 0.3), 20, 40),
        extHumidity: clamp(generateWithVariation(baseExtHumidity, 1), 25, 85),
        aqi: Math.random() > 0.9 ? Math.floor(randomInRange(2, 4)) : 1,
        pm25: clamp(randomInRange(5, 35), 5, 150),
    };

    lastSensorData = newData;
    return newData;
}

export function generateActuatorMetrics(
    control: ActuatorControl
): ActuatorMetrics {
    const baseFanRpm = lastActuatorMetrics?.fanRpm ?? 1200;
    const baseLampWatt = lastActuatorMetrics?.lampWatt ?? 25;
    const basePumpPsi = lastActuatorMetrics?.pumpPsi ?? 15;

    const newMetrics: ActuatorMetrics = {
        id: Date.now(),
        createdAt: new Date(),
        fanRpm: control.fanOn
            ? clamp(generateWithVariation(baseFanRpm, 100), 800, 2500)
            : 0,
        lampWatt: control.lampOn
            ? clamp(generateWithVariation(baseLampWatt, 5), 10, 75)
            : 0,
        pumpPsi: control.pumpOn
            ? clamp(generateWithVariation(basePumpPsi, 2), 10, 35)
            : 0,
    };

    lastActuatorMetrics = newMetrics;
    return newMetrics;
}

export function generateInitialActuatorControl(): ActuatorControl {
    return {
        id: 1,
        fanOn: true,
        lampOn: false,
        pumpOn: true,
    };
}

export function generateInitialChartData(): ChartDataPoint[] {
    const data: ChartDataPoint[] = [];
    const now = new Date();

    for (let i = CHART_DATA_POINTS - 1; i >= 0; i--) {
        const timestamp = new Date(now.getTime() - i * 3000);
        const baseTemp = 26 + Math.sin(i * 0.2) * 3;
        const baseHumidity = 65 + Math.cos(i * 0.15) * 10;
        const baseSoilMoisture = 60 + Math.sin(i * 0.1) * 8;
        const baseLight = 800 + Math.cos(i * 0.25) * 200;

        data.push({
            time: timestamp.toLocaleTimeString("id-ID", {
                hour: "2-digit",
                minute: "2-digit",
            }),
            timestamp,
            temp: clamp(generateWithVariation(baseTemp, 0.3), 18, 38),
            humidity: clamp(generateWithVariation(baseHumidity, 1), 30, 95),
            soilMoisture: clamp(generateWithVariation(baseSoilMoisture, 0.8), 20, 90),
            light: clamp(generateWithVariation(baseLight, 30), 100, 1800),
        });
    }

    return data;
}

export function sensorDataToChartPoint(sensor: SensorData): ChartDataPoint {
    return {
        time: sensor.createdAt.toLocaleTimeString("id-ID", {
            hour: "2-digit",
            minute: "2-digit",
        }),
        timestamp: sensor.createdAt,
        temp: sensor.temp,
        humidity: sensor.humidity,
        soilMoisture: sensor.soilMoisture,
        light: sensor.light,
    };
}
