import axios from "axios";
import { useEffect, useState } from "react";
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

interface EverageData {
  everage: string;
  end: string;
  start: string;
}

interface ChartProps {
  product?: string;
}

export function Chart({ product }: ChartProps) {
  const [data, setData] = useState<EverageData[]>();

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.get(
          `https://api.v2.emissions-api.org/api/v2/${product}/average.json?country=DE&begin=2019-02-01&end=2022-06-15`
        );
        const dataFormated = response.data.map((element: EverageData) => {
          return { ...element, start: element.start.split("T")[0] };
        });
        setData(dataFormated);
      } catch (err) {
        console.log(err);
      }
    };
    product && getData();
  }, [product]);

  return (
    <ResponsiveContainer width="90%" height={300}>
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
          activeDot={{ r: 8 }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}
