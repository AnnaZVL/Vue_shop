import { defineStore } from 'pinia';
import axios from "axios";
import { API_URL } from '@/services/productAPI';
import { ref } from 'vue';

export const useProductStore = defineStore('product', () => {
    const productsList = ref([])
    const product = ref({})   
    const paginationAll = ref ({})
    const totalProducts = ref(null)

// Получение списка товаров
    const getProductsList = async(filters, page = 1, limit = 6) => {       
        try {
            const response = await axios.get(API_URL +'/api/products', {
                params: {                    
                    page,
                    limit,
                    minPrice: filters.selectPriceMin,
                    maxPrice: filters.selectPriceMax,
                    categoryId: filters.selectCategoryId,
                    materialIds: [filters.selectMaterialId],
                    seasonIds: [filters.selectSeasonId],
                    colorIds: [filters.selectColorId]
                }
                })                   
                productsList.value = response.data.items
                paginationAll.value = response.data.pagination
                totalProducts.value = paginationAll.value.total 
                                                                    
                return response.data.items
        } catch (error) {
            console.log('Ошибка при получении списка продуктов', error);
        }  
    }

    //  Получение 1 продукта по id
    const getProduct = async(productId) => {
            try {
                const response = await axios.get(API_URL +`/api/products/${productId}`)
                   product.value = response.data        
                                 
            } catch (error) {
                console.log('Ошибка при получении продуктa', error);
            }            
        }
            
        return {
            productsList, product, totalProducts, paginationAll, getProductsList, getProduct, 
        }          
})