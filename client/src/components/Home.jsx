import React, {useState} from "react";
import { Box, Image } from "@chakra-ui/react";
import NavBar from "./NavBar";
import RandomSlider from "./randomSlider";
import Logo from "../img/LOGO.png";
import Card from "./Card";
import Sidebar from "./Sidebar";

export default function Home() {

  const [selectedFood, setSelectedFood] = useState();
  

  const handleSelectFood = (food) => {
    setSelectedFood(food);
    console.log(selectedFood)
  };



  return (
    <Box>
      <NavBar handleSelectFood={handleSelectFood} />
      {selectedFood && (
        <Box position="fixed" top="0" left="0" right="0" zIndex="1">
          <Card selectedFood={selectedFood} />
        </Box>
      )}

<Box display={{ base: "none", md: "flex" }} position="fixed"
backgroundColor= "#F6F6F6" 
borderRight= "1px solid #DADADA" 
padding= "10px"
    top="85"
    left="0"
    bottom="0"
    width="10rem"
    overflow="auto"
   
   >
        <Sidebar />
      </Box>
      <Box
        mt={{base: "-20rem", md: "-8rem"}}
        display="flex"
        alignItems="center"
        justifyContent="center"
        height="100vh"
      >
        <Box 
        maxWidth={{base: "200px", md: "400px"}} 
        maxHeight={{base:"50px", md: "200px"}} margin="auto">
          <Image
            src={Logo}
            alt="Logo de la empresa"
            width="100%"
            height="100%"
            objectFit="contain"
          />
        </Box>
      </Box>

       <Box marginLeft="14rem" marginTop="-7rem">
        {RandomSlider()}
      </Box> 
      
    </Box>
  );
}
