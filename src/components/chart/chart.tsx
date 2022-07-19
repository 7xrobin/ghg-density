import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { EverageData } from "../../types/interfaces";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import styles from "./chart.module.css";

interface ChartProps {
  product?: string;
}

export function Chart({ product }: ChartProps) {
  const [data, setData] = useState<EverageData[]>();

  const formatData = (data: EverageData[]): EverageData[] => {
    return data.map((element: EverageData) => {
      return { ...element, start: element.start.split("T")[0] };
    });
  };

  const getData = useCallback(async () => {
    try {
      const response = await axios.get(
        `https://api.v2.emissions-api.org/api/v2/${product}/average.json?country=DE&begin=2019-02-01&end=2022-06-15`
      );
      setData(formatData(response.data));
    } catch (err) {
      console.log(err);
    }
  }, [product]);

  useEffect(() => {
    product && getData();
  }, [getData, product]);

  return (
    <div className={styles.container}>
      <ResponsiveContainer height={300}>
        <LineChart
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="start" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line
            type="monotone"
            dataKey="average"
            stroke="#8884d8"
            dot={false}
            activeDot={{ r: 8 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
