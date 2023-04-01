import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import { Box } from "@chakra-ui/react";
import FeaturedInfo from "./FeaturedInfo";
import Chart from "./Chart";
import { data } from "./UserData";
import WidgetSm from "./WidgetSm";
import WidgetLg from "./WidgetLg";
import {getComidas} from "../../Redux/actions/index";
import Productos from "./Productos";


export default function HomeAdmin () {

  // let currentUser = JSON.parse(localStorage.getItem("MANGIARE_user"));
  const dispatch = useDispatch();
  const homeShow = useSelector((state) => state.homeShow);

   useEffect(() => {
    dispatch(getComidas());
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
          {homeShow === "Home" && (
          <Box>
<FeaturedInfo />
<Chart
            data={data}
            title="Analítica de Usuarios"
            grid
            dataKey="Active User"
          />
          <WidgetSm />
          <WidgetLg />
          </Box>
          )}
          </Box>
        
    )}
    