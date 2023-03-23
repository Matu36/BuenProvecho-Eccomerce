import React from "react";
import { Box, MenuButton, Button, Menu, Icon } from "@chakra-ui/react";
import { GiChickenOven, GiFishEggs, GiFrenchFries, GiFullPizza}  from "react-icons/gi";
import {TbSalad, TbIceCream} from "react-icons/tb";
import {BiDrink, BiDish} from "react-icons/bi";


export default function Sidebar () {

    return (
    <Box>
<Menu flexDirection="column" alignItems="flex-start" >
    
              <MenuButton as={Button} leftIcon={<Icon as={GiChickenOven} />}  
   color="#0077CC"
   textDecor="none"
   marginLeft="10px"
   padding="5px"
   borderRadius="5px"
   bg= "none"
   >
                Carnes
              </MenuButton>
              <MenuButton as={Button} leftIcon={<Icon as={GiFullPizza} />}  color="#0077CC"
   textDecor="none"
   marginLeft="10px"
   padding="5px"
   borderRadius="5px"
   bg= "none">
                Pastas
              </MenuButton>
              <MenuButton as={Button}  leftIcon={<Icon as={GiFishEggs} />} color="#0077CC"
   textDecor="none"
   marginLeft="10px"
   padding="5px"
   borderRadius="5px"
   bg= "none">
                Pescados
              </MenuButton>
              <MenuButton as={Button} leftIcon={<Icon as={TbSalad} />} color="#0077CC"
   textDecor="none"
   marginLeft="10px"
   padding="5px"
   borderRadius="5px"
   bg= "none">
                Ensaladas
              </MenuButton>
              <MenuButton as={Button}  leftIcon={<Icon as={GiFrenchFries} />} color="#0077CC"
   textDecor="none"
   marginLeft="10px"
   padding="5px"
   borderRadius="5px"
   bg= "none">
                Minutas
              </MenuButton>
              <MenuButton as={Button}  leftIcon={<Icon as={BiDish} />}   color="#0077CC"
   textDecor="none"
   marginLeft="10px"
   padding="5px"
   borderRadius="5px"
   bg= "none">
                Platos Frios
              </MenuButton>
              <MenuButton as={Button}  leftIcon={<Icon as={BiDrink} />} color="#0077CC"
   textDecor="none"
   marginLeft="10px"
   padding="5px"
   borderRadius="5px"
   bg= "none">
                Bebidas
              </MenuButton>
              <MenuButton as={Button} leftIcon={<Icon as={TbIceCream} />} color="#0077CC"
   textDecor="none"
   marginLeft="10px"
   padding="5px"
   borderRadius="5px"
   bg= "none">
                Postres
              </MenuButton>
             
            </Menu>

    </Box>
    )
}