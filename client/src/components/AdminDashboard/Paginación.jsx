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
    <HStack spacing={2} mt={4}>
      <Button
        isDisabled={isFirstPage || !hasMultiplePages}
        size="sm"
        variant="ghost"
        colorScheme="gray"
        onClick={() => handleClick(1)}
      >
        Primera
      </Button>

      <Button
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
        isDisabled={isLastPage || !hasMultiplePages}
        size="sm"
        variant="ghost"
        colorScheme="gray"
        onClick={() => handleClick(currentPage + 1)}
      >
        Siguiente
      </Button>

      <Button
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