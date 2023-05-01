import React, {useState} from "react";
import {
    Box,
    Flex,
    Text,
    Stack,
    Icon,
    useColorMode,
  } from "@chakra-ui/react";
  import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";
  import {
    MdShoppingBasket,
    MdPerson,
    MdAttachMoney,
    MdAssignment,
    MdMail,
  } from "react-icons/md";
  import { FaHome } from 'react-icons/fa';
  import { useDispatch } from "react-redux";
  import { changeHomeAdminShow } from "../../Redux/actions";

export default function SideBarResponsive () {
    const dispatch = useDispatch();
    const [isOpen, setIsOpen] = useState(false);
    const toggleSidebar = () => setIsOpen(!isOpen);
    const categories = [
        { label: "Home", icon: FaHome },
        { label: "Productos", icon: MdShoppingBasket},
        { label: "Usuarios", icon: MdPerson},
        { label: "Ventas", icon: MdAttachMoney},
        { label: "Ordenes", icon: MdAssignment},
        { label: "Mensajes", icon: MdMail },
      ];
    
      const { colorMode } = useColorMode();
      const [activeCategory, setActiveCategory] = useState(categories[0]);
      const bgColor = colorMode === "light" ? "blue.400" : "gray.800";
      const hoverBgColor = colorMode === "light" ? "gray.100" : "gray.600";
      const activeBgColor = "orange.400";
      const textColor = colorMode === "light" ? "gray.800" : "white";
      

      
      const handleHomeAdmin = (e) => {
        dispatch(changeHomeAdminShow(e.target.textContent));
        setActiveCategory(categories);
        setIsOpen(false);
      };


    return (

        <Box display={{md:"none"}}>
            
    
<Box>
      
    <Box marginLeft="-31rem" marginTop="-3rem" >
      {isOpen ? (
        <HamburgerIcon w={6} h={6} onClick={toggleSidebar} />
      ) : (
        <HamburgerIcon w={6} h={6} onClick={toggleSidebar} />
      )}
    </Box>
  
        {isOpen && (
          <Box
            w="64"
            bg={bgColor}
            color={textColor}
            backgroundColor="blue.400"
            boxShadow="lg"
            pos="fixed"
            top="0"
            left="0"
            h="full"
            borderRightWidth="1px"
            borderRightColor={colorMode === "light" ? "gray.200" : "gray.700"}
          >
            <Box flex="1" overflowY="auto" mt="8">
              <Stack spacing="4" mt="4" align="stretch">
                {categories.map((category) => (
                  <Box
                    key={category.label}
                    as="button"
                    onClick={(e) => {
                      handleHomeAdmin(e);
                      setActiveCategory(category);
                    }}
                    p="3"
                    borderRadius="md"
                    transition="background-color 0.2s"
                    _hover={{ bg: hoverBgColor }}
                    bg={
                      activeCategory.label === category.label
                        ? activeBgColor
                        : bgColor
                    }
                  >
                    <Flex alignItems="center">
                      <Icon as={category.icon} mr="2" />
                      <Text>{category.label}</Text>
                    </Flex>
                  </Box>
                ))}
              </Stack>
            </Box>
          </Box>
        )}
      
      </Box>

    </Box>
    )
}