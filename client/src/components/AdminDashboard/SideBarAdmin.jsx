import { useState } from "react";
import {
  Box,
  Flex,
  Text,
  Stack,
  Icon,
  useColorMode,
} from "@chakra-ui/react";
import {
  MdShoppingBasket,
  MdPerson,
  MdAttachMoney,
  MdAssignment,
  MdMail,
} from "react-icons/md";

const categories = [
  { label: "Productos", icon: MdShoppingBasket },
  { label: "Usuarios", icon: MdPerson },
  { label: "Ventas", icon: MdAttachMoney },
  { label: "Ordenes", icon: MdAssignment },
  { label: "Contacto", icon: MdMail },
];

const SideBarAdmin = () => {
  const { colorMode } = useColorMode();
  const [activeCategory, setActiveCategory] = useState(categories[0]);
  const bgColor = colorMode === "light" ? "blue.400" : "gray.800";
  const hoverBgColor = colorMode === "light" ? "gray.100" : "gray.600";
  const activeBgColor = "orange.400";
  const textColor = colorMode === "light" ? "gray.800" : "white";

  return (
    <Box
      w="64"
      bg={bgColor}
      color={textColor}
      backgroundColor= "blue.400"
      boxShadow="lg"
      pos="fixed"
      top="0"
      left="0"
      h="full"
      borderRightWidth="1px"
      borderRightColor={colorMode === "light" ? "gray.200" : "gray.700"}
    >
      <Flex
        h="20"
        alignItems="center"
        justifyContent="center"
        fontWeight="bold"
        textTransform="uppercase"
        letterSpacing="wider"
      >
        FOOD!
      </Flex>
      <Box flex="1" overflowY="auto" mt="8">
        <Stack spacing="4" mt="4" align="stretch">
          {categories.map((category) => (
            <Box
              key={category.label}
              as="button"
              onClick={() => setActiveCategory(category)}
              p="3"
              borderRadius="md"
              transition="background-color 0.2s"
              _hover={{ bg: hoverBgColor }}
              bg={
                activeCategory.label === category.label ? activeBgColor : bgColor
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
  );
};

export default SideBarAdmin;