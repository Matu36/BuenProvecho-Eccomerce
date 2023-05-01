import { Box, Heading } from "@chakra-ui/react";
import {
  LineChart,
  Line,
  XAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function Chart({ title, data, dataKey, grid }) {
  return (
    <Box
      w="90%"
      bg="white"
      boxShadow="2px -1px 5px 0px rgba(0,0,0,0.75)"
      p="20px"
      m="20px"
      maxWidth={{base:"73%", md:"none"}}
      marginLeft= {{base:"1.5rem", md:"0"}}
    >
      <Heading as="h3" mb="20px">
        {title}
      </Heading>
      <ResponsiveContainer width="100%" aspect={4 / 1}>
        <LineChart data={data}>
          <XAxis dataKey="name" stroke="#5550bd" />
          <Line type="monotone" dataKey={dataKey} />
          <Tooltip />
          {grid && <CartesianGrid />}
        </LineChart>
      </ResponsiveContainer>
    </Box>
  );
}