import React from 'react';
import HomeBody from '../components/HomeBody';
import Bestsellers from '../components/Bestsellers';
import Categories from '../components/Categories';
import CategorySwitcher from '../components/CategorySwitcher';
import Products from '../components/Products';
import { Carousel } from '../components/Carousel';
import AnimatedBlock from '../utils/animation';

export default function Home() {
  return (
    <>
      <HomeBody />
      <Bestsellers />
      <Categories />
      <CategorySwitcher />
      <AnimatedBlock>
        <Products limit={8}/>
      </AnimatedBlock>
      <Carousel />
    </>
  );
}
