import config from "./config.json";

export interface Record {
  id: number;
  device: string;
  date: string;
}

export interface DataRecord {
  id: number;
  device: string;
  date: string;
  temperature: string;
  humidity: string;
}

export interface TemperatureRecord extends Record {
  temperature: number;
}

export interface HumidityRecord extends Record {
  humidity: number;
}

export async function getTemperatureAndHumidity(
  limit?: number
): Promise<DataRecord[] | undefined> {
  try {
    return await getData<DataRecord>("complete", `limit=${limit}`);
  } catch (error) {
    console.error("Could not get data: ", error);
  }
}

export async function getTemperature(
  id?: number
): Promise<TemperatureRecord[] | undefined> {
  try {
    return await getData<TemperatureRecord>("temperature");
  } catch (error) {
    console.error("Could not get temperature: ", error);
  }
}

export async function getHumidity(
  id?: number
): Promise<HumidityRecord[] | undefined> {
  try {
    return await getData<HumidityRecord>("humidity");
  } catch (error) {
    console.error("Could not get humidity: ", error);
  }
}

async function getData<T>(endpoint: string, params?: string) {
  const response = await fetch(
    `${config.API_SERVER}/${endpoint}${params ? "/?" + params : ""}`
  );
  const result = await response.json();
  return result as T[];
}
