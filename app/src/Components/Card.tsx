import { CardProps } from "../props";
import { LineChart, Line, XAxis, YAxis, Tooltip, Legend } from "recharts";

export function Card({ label: cardLabel, data = [] }: CardProps) {
  const domainTolerance = 5;

  const formatTimeStamp = (timestamp: string) =>
    new Date(timestamp).toLocaleTimeString();

  const latestTempFormatted = data.length
    ? data[data.length - 1].temperature + "°C"
    : "...";
  const latestHumidFormatted = data.length
    ? data[data.length - 1].humidity + "%"
    : "...";

  document.title = `${latestTempFormatted} | ${latestHumidFormatted}`;

  return (
    <div className="card bg-dark flex-container">
      <div className="flex-container justify-center">
        <div className="flex-container direction-column">
          <div className="flex-container justify-center label">
            <div className="label">
              {cardLabel} – {latestTempFormatted} | {latestHumidFormatted}
            </div>
          </div>
          <div className="chart-container ">
            <LineChart width={800} height={400} data={data}>
              <Line
                type="monotone"
                dataKey="temperature"
                stroke="#d64161"
                strokeWidth="1"
                dot={false}
              />
              <Line
                type="monotone"
                dataKey="humidity"
                stroke="#6b5b95"
                strokeWidth="1"
                dot={false}
              />
              <XAxis
                dataKey="date"
                axisLine={{ stroke: "#3e4444" }}
                tick={false}
              />
              <YAxis
                axisLine={{ stroke: "#3e4444" }}
                domain={[
                  `dataMin - ${domainTolerance}`,
                  `dataMax + ${domainTolerance}`,
                ]}
              />
              <Tooltip labelFormatter={formatTimeStamp} />
              <Legend />
            </LineChart>
          </div>
        </div>
      </div>
    </div>
  );
}
