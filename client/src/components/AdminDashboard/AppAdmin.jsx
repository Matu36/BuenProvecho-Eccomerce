import React from "react";
import { Flex } from "@chakra-ui/react";
import SideBarAdmin from "./SideBarAdmin";
import NavBarAdmin from "./NavBarAdmin";
import HomeAdmin from "./HomeAdmin";
import SideBarResponsive from "./SideBarResponsive";

export default function AppAdmin() {
  return (
    <Flex direction="column" height="100vh">
      <NavBarAdmin />
      <Flex marginLeft={{ base: "6.7rem", md: "24rem" }}>
        <HomeAdmin />

        <SideBarResponsive />
        <SideBarAdmin />
      </Flex>
    </Flex>
  );
}
