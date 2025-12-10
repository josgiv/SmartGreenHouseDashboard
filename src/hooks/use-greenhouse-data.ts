"use client";

import { useState, useEffect, useCallback } from "react";
import type {
    SensorData,
    ActuatorMetrics,
    ActuatorControl,
    ChartDataPoint,
} from "@/lib/types";
import {
    generateSensorData,
    generateActuatorMetrics,
    generateInitialActuatorControl,
    generateInitialChartData,
    sensorDataToChartPoint,
} from "@/lib/dummy-data";
import { UPDATE_INTERVAL_MS, CHART_DATA_POINTS } from "@/lib/constants";
import { THRESHOLDS } from "@/lib/constants";

interface AIRecommendation {
    fanOn: boolean;
    lampOn: boolean;
    pumpOn: boolean;
}

function calculateRecommendation(data: SensorData): AIRecommendation {
    let fanOn = false;
    let lampOn = false;
    let pumpOn = false;

    if (
        data.extTemp > THRESHOLDS.EXT_TEMP.HOT &&
        data.extHumidity < THRESHOLDS.EXT_HUMIDITY.LOW &&
        data.soilMoisture < THRESHOLDS.SOIL_MOISTURE.OPTIMAL_MIN
    ) {
        pumpOn = true;
    }

    if (data.aqi >= THRESHOLDS.AQI.BAD) {
        fanOn = true;
    }

    if (data.temp > THRESHOLDS.TEMP.MAX) {
        fanOn = true;
    }

    if (data.soilMoisture < THRESHOLDS.SOIL_MOISTURE.LOW) {
        pumpOn = true;
    }

    if (data.humidity > THRESHOLDS.HUMIDITY.MAX) {
        fanOn = true;
    }

    if (data.light < THRESHOLDS.LIGHT.LOW) {
        lampOn = true;
    }

    return { fanOn, lampOn, pumpOn };
}

export function useGreenhouseData() {
    const [actuatorControl, setActuatorControl] = useState<ActuatorControl>(() =>
        generateInitialActuatorControl()
    );

    const [sensorData, setSensorData] = useState<SensorData | null>(() => generateSensorData());

    const [actuatorMetrics, setActuatorMetrics] = useState<ActuatorMetrics | null>(() =>
        generateActuatorMetrics(generateInitialActuatorControl())
    );

    const [chartData, setChartData] = useState<ChartDataPoint[]>(() => generateInitialChartData());

    const [lastUpdated, setLastUpdated] = useState<Date>(new Date());
    const [isLoading, setIsLoading] = useState(false);

    const recommendation: AIRecommendation = sensorData
        ? calculateRecommendation(sensorData)
        : { fanOn: false, lampOn: false, pumpOn: false };

    const updateData = useCallback(() => {
        const newSensorData = generateSensorData();
        const newMetrics = generateActuatorMetrics(actuatorControl);

        setSensorData(newSensorData);
        setActuatorMetrics(newMetrics);
        setLastUpdated(new Date());
        // setRecommendation derived, no need to set

        setChartData((prev) => {
            const newPoint = sensorDataToChartPoint(newSensorData);
            const updated = [...prev, newPoint];
            return updated.length > CHART_DATA_POINTS ? updated.slice(1) : updated;
        });
    }, [actuatorControl]);

    useEffect(() => {
        // Initial setup removed as we use lazy init
    }, []);

    useEffect(() => {
        if (isLoading) return;

        const interval = setInterval(updateData, UPDATE_INTERVAL_MS);
        return () => clearInterval(interval);
    }, [isLoading, updateData]);

    const toggleActuator = useCallback(
        (actuator: "fanOn" | "lampOn" | "pumpOn", value: boolean) => {
            setActuatorControl((prev) => ({
                ...prev,
                [actuator]: value,
            }));
        },
        []
    );

    return {
        sensorData,
        actuatorMetrics,
        actuatorControl,
        chartData,
        lastUpdated,
        isLoading,
        recommendation,
        toggleActuator,
    };
}
