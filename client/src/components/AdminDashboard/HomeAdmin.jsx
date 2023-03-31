import React from "react";
import { Box } from "@chakra-ui/react";
import FeaturedInfo from "./FeaturedInfo";
import Chart from "./Chart";
import { data } from "./UserData";

export default function HomeAdmin () {

//Aca van los widgets, el chart, el homeshow; aca se renderiza todo;

/* <FeaturedInfo />
          <Chart
            data={data}
            title="User Analytics"
            grid
            dataKey="Active User"
          />
          <div className="homeWidgets">
            <WidgetSm />
            <WidgetLg all={true} /> */


    return (
        <Box>
<FeaturedInfo />
<Chart
            data={data}
            title="Anlítica de Usuarios"
            grid
            dataKey="Active User"
          />
        </Box>
    )
}
