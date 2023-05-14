import React from "react";
import { Button, HStack } from "@chakra-ui/react";

export default function Paginations(props) {
  const { numberOfPage, currentPage, handlePageNumber } = props;

  const handleClick = (pageNumber) => {
    handlePageNumber(pageNumber);
  };

  const renderPageNumbers = () => {
    const pageNumbers = [];
    for (let i = 1; i <= numberOfPage; i++) {
      pageNumbers.push(i);
    }

    return pageNumbers.map((pageNumber) => (
      <Button
        key={pageNumber}
        size="sm"
        variant={currentPage === pageNumber ? "solid" : "ghost"}
        colorScheme={currentPage === pageNumber ? "purple" : "gray"}
        onClick={() => handleClick(pageNumber)}
      >
        {pageNumber}
      </Button>
    ));
  };

  const isFirstPage = currentPage === 1;
  const isLastPage = currentPage === numberOfPage;
  const hasMultiplePages = numberOfPage > 1;

  return (
    <HStack spacing={{ base: 0, md: 2 }} mt={{ base: 0, md: 4 }}>
      <Button
        display={{ base: "none", md: "flex" }}
        isDisabled={isFirstPage || !hasMultiplePages}
        size="sm"
        variant="ghost"
        colorScheme="gray"
        onClick={() => handleClick(1)}
      >
        Primera
      </Button>

      <Button
        display={{ base: "none", md: "flex" }}
        isDisabled={isFirstPage || !hasMultiplePages}
        size="sm"
        variant="ghost"
        colorScheme="gray"
        onClick={() => handleClick(currentPage - 1)}
      >
        Anterior
      </Button>

      {renderPageNumbers()}

      <Button
        display={{ base: "none", md: "flex" }}
        isDisabled={isLastPage || !hasMultiplePages}
        size="sm"
        variant="ghost"
        colorScheme="gray"
        onClick={() => handleClick(currentPage + 1)}
      >
        Siguiente
      </Button>

      <Button
        display={{ base: "none", md: "flex" }}
        isDisabled={isLastPage || !hasMultiplePages}
        size="sm"
        variant="ghost"
        colorScheme="gray"
        onClick={() => handleClick(numberOfPage)}
      >
        Última
      </Button>
    </HStack>
  );
}
