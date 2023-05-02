import { Box, Heading } from "@chakra-ui/react";
import { useSelector } from "react-redux";

import {
  LineChart,
  Line,
  XAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function Chart({ title, dataKey, grid }) {
  const usuarios = useSelector((state) => state.users);

  const usuariosPorMes = {
    ene: [],
    feb: [],
    mar: [],
    abr: [],
    may: [],
    jun: [],
    jul: [],
    ago: [],
    sep: [],
    oct: [],
    nov: [],
    dic: [],
  };

  // Agrupar usuarios por mes
  const usuariosAgrupados = usuarios.reduce((acumulador, usuario) => {
    const fecha = new Date(usuario.createdAt);
    const mes = fecha.toLocaleString("default", { month: "short" });
    const mesAbreviado = mes.slice(0, 3); // Obtener las primeras tres letras del nombre del mes
    const anio = fecha.getFullYear();
    
    const clave = `${mesAbreviado}-${anio}`;
    
    if (!acumulador[clave]) {
      acumulador[clave] = [];
    }
    acumulador[clave].push(usuario);
    return acumulador;
  }, {});

  // Agregar usuarios agrupados a los meses correspondientes
  Object.keys(usuariosPorMes).forEach((mes) => {
    const anioActual = new Date().getFullYear();
    const clave = `${mes}-${anioActual}`;
    usuariosPorMes[mes] = usuariosAgrupados[clave] || [];
  });
  
//Esto adecua el array de usuarios por mes al formato del dataKey
  const data = [];
for (const [key, value] of Object.entries(usuariosPorMes)) {
  data.push({
    name: key.charAt(0).toUpperCase() + key.slice(1),
    "Active User": value.length,
  });
}

  
  return (
    <Box
      w="90%"
      bg="white"
      boxShadow="2px -1px 5px 0px rgba(0,0,0,0.75)"
      p="20px"
      m="20px"
      maxWidth={{ base: "85%", md: "none" }}
      marginLeft={{ base: "1.6rem", md: "4rem" }}
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
