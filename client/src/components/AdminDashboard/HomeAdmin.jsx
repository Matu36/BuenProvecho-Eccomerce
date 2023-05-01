import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import { Box, Flex, Stack } from "@chakra-ui/react";
import FeaturedInfo from "./FeaturedInfo";
import Chart from "./Chart";
import { data } from "./UserData";
import WidgetSm from "./WidgetSm";
import WidgetLg from "./WidgetLg";
import {getComidas, getMensajes, getUsers} from "../../Redux/actions/index";
import Productos from "./Productos";
// import { getUsers } from "../../Redux/actions/index";
import Mensajes from "./Mensajes";
import Usuarios from "./Usuarios";


export default function HomeAdmin () {

  let currentUser = JSON.parse(localStorage.getItem("user"));
  const dispatch = useDispatch();
  const homeShow = useSelector((state) => state.homeShow);

   useEffect(() => {
    dispatch(getComidas());
    dispatch(getMensajes())
    dispatch(getUsers(currentUser))
    }, []);

    /*
    dispatch(getReviews(currentUser));
    dispatch(getUsers(currentUser));
  }, []);

  return (
    <div className="home">
      {homeShow === "Reviews" && <Reviews />}
      {homeShow === "Users" && <UserList />}
      {homeShow === "Ingredients" && <Products />}
      {homeShow === "Orders" && <Orders all={true} />}
      {homeShow === "eMail" && <Email />}
      {homeShow === "Feedback" && <Feedback />}
      {homeShow === "Home" && (
        <div></div> */

  

    return (
        <Box>
          
          {homeShow === "Productos" && <Productos />}
          {homeShow === "Mensajes" && <Mensajes />}
          {homeShow === "Usuarios" && <Usuarios />}
          {homeShow === "Home" && (
          <Box marginLeft="-7rem">
<FeaturedInfo />
<Chart
            data={data}
            title="Analítica de Usuarios"
            grid
            dataKey="Active User"
          />
          <Stack direction={{ base: "column", md: "row" }} >
            <Box>
          <WidgetSm />
          </Box>
          <Box >
          <WidgetLg/>
          </Box>
          </Stack>
          </Box>
          )}
          </Box>
        
    )}
    
