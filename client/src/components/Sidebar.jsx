import React, {useState} from "react";
import { Box, Button, Menu, Icon } from "@chakra-ui/react";
import { GiChickenOven, GiFishEggs, GiFrenchFries, GiFullPizza}  from "react-icons/gi";
import {TbSalad, TbIceCream} from "react-icons/tb";
import {BiDrink, BiDish} from "react-icons/bi";
import { DB } from "../utils/DB";

export default function Sidebar ({setProducts}) {
  const [activeCategory, setActiveCategory] = useState(null);

  const handleClick = (category) => {
    setActiveCategory(category);

    // Filtra la base de datos por categoría seleccionada
    const filteredProducts = DB.filter((product) => product.Categoría === category);
    setProducts(filteredProducts);
  };
    return (
    <Box>
<Menu flexDirection="column" alignItems="flex-start" >
    
<Button as="a"
      href="#Cartas" leftIcon={<Icon as={GiChickenOven} />} onClick={() => handleClick("Carnes")}  
   color="#0077CC"
   textDecor="none"
   marginLeft="10px"
   padding="5px"
   borderRadius="5px"
   bg= "none"
   >
                Carnes
              </Button>
              <Button as="a"
      href="#Cartas" leftIcon={<Icon as={GiFullPizza} />} onClick={() => handleClick("Pasta")}  color="#0077CC"
   textDecor="none"
   marginLeft="10px"
   padding="5px"
   borderRadius="5px"
   bg= "none">
                Pastas
              </Button>
              <Button as="a"
      href="#Cartas" leftIcon={<Icon as={GiFishEggs} />} onClick={() => handleClick("Pescados")} color="#0077CC"
   textDecor="none"
   marginLeft="10px"
   padding="5px"
   borderRadius="5px"
   bg= "none">
                Pescados
              </Button>
              <Button as="a"
      href="#Cartas" leftIcon={<Icon as={TbSalad} />} onClick={() => handleClick("Ensaladas")} color="#0077CC"
   textDecor="none"
   marginLeft="10px"
   padding="5px"
   borderRadius="5px"
   bg= "none">
                Ensaladas
              </Button>
              <Button as="a"
      href="#Cartas" leftIcon={<Icon as={GiFrenchFries} />} onClick={() => handleClick("Minutas")} color="#0077CC"
   textDecor="none"
   marginLeft="10px"
   padding="5px"
   borderRadius="5px"
   bg= "none">
                Minutas
              </Button>
              <Button as="a"
      href="#Cartas" leftIcon={<Icon as={BiDish} />} onClick={() => handleClick("Platos frios")}   color="#0077CC"
   textDecor="none"
   marginLeft="10px"
   padding="5px"
   borderRadius="5px"
   bg= "none">
                Platos Frios
              </Button>
              <Button as="a"
      href="#Cartas" leftIcon={<Icon as={BiDrink} />} onClick={() => handleClick("Bebidas")} color="#0077CC"
   textDecor="none"
   marginLeft="10px"
   padding="5px"
   borderRadius="5px"
   bg= "none">
                Bebidas
              </Button>
              <Button as="a"
      href="#Cartas" leftIcon={<Icon as={TbIceCream} />} onClick={() => handleClick("Postres")} color="#0077CC"
   textDecor="none"
   marginLeft="10px"
   padding="5px"
   borderRadius="5px"
   bg= "none">
                Postres
              </Button>
             
            </Menu>

    </Box>
    )
}