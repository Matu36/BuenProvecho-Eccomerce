import React, { useState } from "react";
import { Box, Button, Menu, Icon } from "@chakra-ui/react";
import {
  GiChickenOven,
  GiFishEggs,
  GiFrenchFries,
  GiFullPizza,
  GiChickenLeg,
} from "react-icons/gi";
import { TbSalad, TbIceCream } from "react-icons/tb";
import { CiPizza } from "react-icons/ci";
import { BiDrink, BiDish } from "react-icons/bi";
import { useSelector } from "react-redux";

export default function Sidebar({ setProducts }) {
  const Food = useSelector((state) => state.comidas);

  const [activeCategory, setActiveCategory] = useState(null);

  const handleClick = (category) => {
    setActiveCategory(category);

    // Filtra la base de datos por categoría seleccionada
    const filteredProducts = Food.filter(
      (product) => product.Categoria === category
    );
    setProducts(filteredProducts);
  };

  return (
    <div className="contenedor">
      <button style={{ padding: "1rem" }} onClick={() => handleClick("Carnes")}>
        <GiChickenOven />
        Carnes
      </button>
      <button style={{ padding: "1rem" }} onClick={() => handleClick("Pollo")}>
        <GiChickenLeg />
        Pollo
      </button>
      <button style={{ padding: "1rem" }} onClick={() => handleClick("Pasta")}>
        <GiFullPizza />
        Pastas
      </button>
      <button style={{ padding: "1rem" }} onClick={() => handleClick("Pizzas")}>
        <CiPizza />
        Pizzas
      </button>
      <button
        style={{ padding: "1rem" }}
        onClick={() => handleClick("Pescados")}
      >
        <GiFishEggs />
        Pescados
      </button>
      <button
        style={{ padding: "1rem" }}
        onClick={() => handleClick("Ensaladas")}
      >
        <TbSalad />
        Ensaladas
      </button>
      <button
        style={{ padding: "1rem" }}
        onClick={() => handleClick("Guarniciones")}
      >
        <GiFrenchFries />
        Guarniciones
      </button>
      <button
        style={{ padding: "1rem" }}
        onClick={() => handleClick("Platos frios")}
      >
        <BiDish />
        Platos Frios
      </button>
      <button
        style={{ padding: "1rem" }}
        onClick={() => handleClick("Bebidas")}
      >
        <BiDrink />
        Bebidas
      </button>
      <button
        style={{ padding: "1rem" }}
        onClick={() => handleClick("Postres")}
      >
        <TbIceCream />
        Postres
      </button>
    </div>
  );
}
