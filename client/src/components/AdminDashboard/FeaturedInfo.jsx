import React from "react";

import { Flex, Box, Text, Heading } from "@chakra-ui/react";
import { BiDownArrowAlt, BiUpArrowAlt } from "react-icons/bi";

export default function FeaturedInfo() {
  return (
    <Flex justify="space-between" alignItems="center" bg="gray.50" p="4" borderRadius="10px"
    maxW={{ base: "80%", md: "none" }} marginLeft={{base:"0", md:"6rem"}}>
      <Box flex="1" ml="1" backgroundColor="blue.400" marginLeft={{base:"0", md:"-5rem"}}>
        <Heading as="h3"color="white" fontSize="lg" mb="2" marginLeft={{base:"1rem", md:"5rem"}}>
          Ganancias
        </Heading>
        <Box display="flex" alignItems="center" mb="2">
          <Text color="white" fontSize="2xl" fontWeight="semibold" mr="0"marginLeft={{base:"0", md:"4rem"}}>
            $2,415
          </Text>
          <Box display="flex" alignItems="center" color="red.500">
            <Text mr="2" fontSize="md">
              -11.4
            </Text>
            <BiDownArrowAlt />
          </Box>
        </Box>
        <Text  backgroundColor="blue.600" textAlign="center" fontSize="md" color="white" marginLeft={{base:"0", md:"0rem"}}>
          Comparado con el mes pasado
        </Text>
      </Box>

      <Box flex="1" mr="2" backgroundColor="green.200">
        <Heading as="h3" color="white" fontSize="lg" mb="2" marginLeft={{base:"2rem", md:"6rem"}}>
          Ventas
        </Heading>
        <Box display="flex" alignItems="center" mb="2">
          <Text color="white" fontSize="2xl" fontWeight="semibold" mr="0" marginLeft={{base:"0.5rem", md:"5rem"}}>
            $4,415
          </Text>
          <Box display="flex" alignItems="center" color="red.500">
            <Text mr="2" fontSize="md">
              -1.4
            </Text>
            <BiDownArrowAlt />
          </Box>
        </Box>
        <Text align="center"  backgroundColor="green.500" fontSize="md" color="white" marginLeft={{base:"0", md:"0rem"}}>
        Comparado con el mes pasado
        </Text>
      </Box>

      <Box flex="1" backgroundColor="yellow.200" marginLeft="-0.5rem">
        <Heading textAlign="center" as="h3" fontSize="lg" mb="2" color="white">
          Costos
        </Heading>
        <Box display="flex" alignItems="center" mb="2">
          <Text color="white" fontSize="2xl" fontWeight="semibold" mr="2"marginLeft={{base:"0rem", md:"5rem"}}>
            $2,225
          </Text>
          <Box display="flex" alignItems="center" color="green.500">
            <Text mr="1" fontSize="md">
      +2.4
            </Text>
            <BiUpArrowAlt />
          </Box>
        </Box>
        <Text fontSize="md" color="white" textAlign="center" backgroundColor="yellow.500">
        Comparado con el mes pasado
        </Text>
      </Box>
    </Flex>
  );
}