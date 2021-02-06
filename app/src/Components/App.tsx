import React from "react";
import { DataRecord, getTemperatureAndHumidity } from "../model";
import { CardContainer } from "./CardContainer";
import "../App.css";

function App() {
  const [data, setData] = React.useState<DataRecord[]>([]);

  React.useEffect(() => {
    const fetchData = async () => {
      const data = await getTemperatureAndHumidity(30);
      if (data !== undefined) {
        setData(data.reverse());
      }
    };

    fetchData();
    setInterval(fetchData, 60 * 1000);
  }, []);

  return (
    <div className="app flex-container stretch-to-fit align-center justify-center">
      <CardContainer data={data} />
    </div>
  );
}

export default App;
