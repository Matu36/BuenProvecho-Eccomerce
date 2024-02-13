import { Box, Button } from "@chakra-ui/react";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import Swal from "sweetalert2";

const BotonMP = () => {
  const { isAuthenticated } = useAuth0();

  const [logueado, setLogueado] = useState();

  const sinLoguear = () => {
    if (!logueado) {
      Swal.fire({
        title: "Debes iniciar sesión para realizar pagos",
        position: "center",
      });
    }
  };

  return (
    <Box>
      {isAuthenticated ? (
        <Link to="/CheckoutMP">
          <Button
            fontSize="18px"
            backgroundColor="#009ee3"
            color="#fff"
            maxW={{ base: "90%", md: "90%" }}
            _hover={{ backgroundColor: "#0077b3" }}
          >
            Pagar con MercadoPago
          </Button>
        </Link>
      ) : (
        <Button
          onClick={sinLoguear}
          fontSize="18px"
          backgroundColor="#009ee3"
          color="#fff"
          maxW={{ base: "90%", md: "90%" }}
          _hover={{ backgroundColor: "#0077b3" }}
        >
          Pagar con MercadoPago
        </Button>
      )}
    </Box>
  );
};

export default BotonMP;
