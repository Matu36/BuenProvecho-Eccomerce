import React from "react";
import { Flex} from "@chakra-ui/react";
import SideBarAdmin from "./SideBarAdmin";
import NavBarAdmin from "./NavBarAdmin";
import HomeAdmin from "./HomeAdmin";



export default function AppAdmin () {

//va el navbar, la sidebar, el home (los widgets);
//Autenticacion - LocalStorage

/* import { useAuth0 } from "@auth0/auth0-react";

const { isAutenticated } = useAuth0();
  const currentUser = JSON.parse(localStorage.getItem("MANGIARE_user"));
  console.log(isAutenticated, currentUser); */

    return (

      <Flex direction="column" height="100vh">
            <NavBarAdmin />
            <Flex marginLeft={{ base: '0', md: '25rem' }} width="100%">
            <HomeAdmin />
            
            
          
<SideBarAdmin />
</Flex>
    </Flex>
  
    )
}