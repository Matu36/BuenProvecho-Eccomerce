import React from "react";
import { Button, Text, Box, Image, Flex } from "@chakra-ui/react";
import {
  AiOutlineCloseCircle,
  AiOutlineMinusCircle,
  AiFillPlusCircle,
} from "react-icons/ai";
import { ADD_TO_CART } from "../../../Redux/actions";
import { useDispatch } from "react-redux";

export default function CartItem({ data, delFromCart }) {
  const dispatch = useDispatch();

  const addToCartHandler = () => {
    dispatch({ type: ADD_TO_CART, payload: id });
  };

  let { id, Imagen, Nombre, Efectivo, quantity } = data;

  return (
    <Box marginTop={{ base: "-1rem", md: "0rem" }}>
      <Flex
        border="solid 4px darkRed"
        marginTop={{ base: "2rem", md: "0.5rem" }}
        direction={{ base: "column", md: "row" }}
      >
        <Box
          maxW={{ base: "50%", md: "30%" }}
          height={{ base: "50px", md: "150px" }}
          marginTop={{ base: "1rem", md: "1.5rem" }}
          marginBottom={{ base: "2rem", md: "0" }}
        >
          <Image
            marginLeft={{ base: "0.5rem", md: "1rem" }}
            boxSize={{ base: "70px", md: "150px" }}
            objectFit="cover"
            src={Imagen}
            border="solid 4px darkRed"
            marginTop="-0.5rem"
          />
        </Box>

        <Box
          width={{ base: "auto", md: "auto" }}
          maxWidth={{ base: "100%", md: "600px" }}
        >
          <Box display="flex" justifyContent="flex-end">
            <Button
              onClick={() => delFromCart(id, true)}
              marginTop={{ base: "-6rem", md: "0" }}
              background="none"
              _hover={{ background: "none", color: "white" }}
              fontSize="24px"
            >
              <AiOutlineCloseCircle />
            </Button>
          </Box>

          <Box marginTop={{ base: "0rem", md: "-1rem" }}>
            <Text
              fontSize="1xl"
              fontWeight="bold"
              mb={1}
              mx={2}
              marginLeft={{ base: "1rem", md: "2rem" }}
            >
              {" "}
              {Nombre}{" "}
            </Text>
            <br />
            <br />

            <Box
              display={{ base: "block", md: "flex" }}
              mx={{ base: 0, md: 2 }}
              ml={{ base: 0, md: 4 }}
              mt={{ base: -10, md: 0 }}
            >
              <Text fontSize="1xl" fontWeight="bold" mx={5}>
                {" "}
                S/. ${Efectivo}
              </Text>
              <Text fontSize="1xl" fontWeight="bold" mx={5}>
                {" "}
                Cantidad: {quantity}{" "}
              </Text>
              <Text fontSize="1xl" fontWeight="bold" mx={5}>
                {" "}
                Sub total: ${Efectivo * quantity}.00{" "}
              </Text>
            </Box>
            <Box marginLeft={{ base: 2, md: 135 }} display={{ base: "flex" }}>
              <Button
                onClick={() => delFromCart(id)}
                background="none"
                fontSize="20px"
                _hover={{ background: "red.500" }}
              >
                {" "}
                <AiOutlineMinusCircle />{" "}
              </Button>
              <Button
                onClick={addToCartHandler}
                background="none"
                fontSize="20px"
                _hover={{ background: "red.500" }}
              >
                {" "}
                <AiFillPlusCircle />{" "}
              </Button>
            </Box>
          </Box>
        </Box>
      </Flex>
    </Box>
  );
}
