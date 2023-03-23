import React, {useState} from "react";
import { Box, Image } from "@chakra-ui/react";
import NavBar from "./NavBar";
import RandomSlider from "./randomSlider";
import Logo from "../img/LOGO.png";
import Card from "./Card";

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

      <Box
        mt="-8rem"
        display="flex"
        alignItems="center"
        justifyContent="center"
        height="100vh"
      >
        <Box maxWidth="400px" maxHeight="200px" margin="auto">
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
