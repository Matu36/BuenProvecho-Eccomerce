import React from "react";

import { Flex, Box, Text, Heading } from "@chakra-ui/react";
import { BiDownArrowAlt, BiUpArrowAlt } from "react-icons/bi";

export default function FeaturedInfo() {
  return (
    <Flex justify="space-between" alignItems="center" bg="gray.50" p="4" borderRadius="10px">
      <Box flex="1" mr="4">
        <Heading as="h3" fontSize="lg" mb="2">
          Revenue
        </Heading>
        <Box display="flex" alignItems="center" mb="2">
          <Text fontSize="2xl" fontWeight="semibold" mr="2">
            $2,415
          </Text>
          <Box display="flex" alignItems="center" color="red.500">
            <Text mr="2" fontSize="md">
              -11.4
            </Text>
            <BiDownArrowAlt />
          </Box>
        </Box>
        <Text fontSize="md" color="gray.500">
          Compare to last month
        </Text>
      </Box>

      <Box flex="1" mr="4">
        <Heading as="h3" fontSize="lg" mb="2">
          Sales
        </Heading>
        <Box display="flex" alignItems="center" mb="2">
          <Text fontSize="2xl" fontWeight="semibold" mr="2">
            $4,415
          </Text>
          <Box display="flex" alignItems="center" color="red.500">
            <Text mr="2" fontSize="md">
              -1.4
            </Text>
            <BiDownArrowAlt />
          </Box>
        </Box>
        <Text fontSize="md" color="gray.500">
          Compare to last month
        </Text>
      </Box>

      <Box flex="1">
        <Heading as="h3" fontSize="lg" mb="2">
          Cost
        </Heading>
        <Box display="flex" alignItems="center" mb="2">
          <Text fontSize="2xl" fontWeight="semibold" mr="2">
            $2,225
          </Text>
          <Box display="flex" alignItems="center" color="green.500">
            <Text mr="2" fontSize="md">
              +2.4
            </Text>
            <BiUpArrowAlt />
          </Box>
        </Box>
        <Text fontSize="md" color="gray.500">
          Compare to last month
        </Text>
      </Box>
    </Flex>
  );
}