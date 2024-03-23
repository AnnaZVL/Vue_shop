import { createRouter, createWebHistory } from "vue-router";

import HeaderMain from '@/components/Layots/HeaderMain';
import FooterMain from '@/components/Layots/FooterMain';
import CatalogPage from '@/Pages/CatalogPage';
import ProductPage from '@/Pages/ProductPage';
import CartPage from '@/Pages/CartPage';
import PlacingOrderPage from '@/Pages/PlacingOrderPage';
import SuccessOrderPage from '@/Pages/SuccessOrderPage'
import NotFoundPage from '@/Pages/NotFoundPage';

const router = createRouter({    
    history: createWebHistory(),
    routes: [
        { 
            path: '/', 
            name: 'Каталог',
            components:  { default: CatalogPage, header: HeaderMain, footer: FooterMain }, 
        },
        { 
            path: '/product/:id', 
            name: "Страница товара", 
            components: { default: ProductPage, header: HeaderMain, footer: FooterMain } 
        },
        { 
            path: '/cart', 
            name: "Корзина", 
            components: { default: CartPage, header: HeaderMain, footer: FooterMain },                   
        },
        {
            path: '/plaing',
            name: 'Оформление заказа',
            components: { default: PlacingOrderPage, header: HeaderMain, footer: FooterMain },
        },
        {
            path: '/success/:orderId',
            name: 'Заказ оформлен',
            components: { default: SuccessOrderPage, header: HeaderMain, footer: FooterMain },
        },
        {
            path: '/:pathMatch(.*)*', 
            name: "Страница не найдена",
            components: { default: NotFoundPage, header: HeaderMain, footer: FooterMain } 
        }
    ]
  })

export default router