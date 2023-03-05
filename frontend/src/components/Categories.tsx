import styled from "styled-components";
import { categories } from "./data"
import CategoryItem from "./CategoryItem";
import { mobile } from "../responsive";
import { useState} from "react";
const Container = styled.div`
  display: flex;
  padding: 10px;
  justify-content: space-between;
  ${mobile({ padding: "0px", flexDirection:"column" })}
  
`;

interface CategoryProps {
  onCategoryChange: (categoryText: string) => void;
}

const Categories = ({ onCategoryChange }: CategoryProps) => {

  const handleTextChange = (newText: string) => {
    onCategoryChange(newText);
  };

    return (
      <Container>
        {categories.map((item) => (
          <CategoryItem onTextChange={handleTextChange} item={item} key={item.id} />
        ))}
      </Container>
    );
  };

export default Categories;