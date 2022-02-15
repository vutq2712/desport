import React from "react";
import Scrollspy from 'react-scrollspy'

export default function CategoryTab() {
  return (
    <nav className='nav de-top-navigation' id='HomeNav'>
      <Scrollspy offset={-60} className='scrollspy mb-0 de-top-navigation-menu' items={['Premium', 'Upcoming', 'Suggestion', 'Favorites']} currentClassName='active '>
        <a className={`nav-link de-category-tab-item `} href='#Premium'>
          <span>Preminum</span>
        </a>
        <a className={`nav-link de-category-tab-item `} href='#Upcoming'>
          <span>Upcoming</span>
        </a>
        <a className={`nav-link de-category-tab-item `} href='#Suggestion'>
          <span>Suggestion</span>
        </a>
        <a className={`nav-link de-category-tab-item `} href='#Favorites'>
          <span>Favorites</span>
        </a>
      </Scrollspy>
    </nav>
  )
}
