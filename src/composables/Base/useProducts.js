import { useProductStore } from "@/store/productStore";
import { ref } from "vue";
import axios from "axios";
import { API_URL } from '@/services/productAPI';

// Получение списка товаров с фильтрацией
export async function useProducts(filters, page = 1, limit = 6) {
    const productStore = useProductStore()
    const productsList = ref([])

    if (!filters) {
      filters = {selectPriceMin: 0,
        selectPriceMax: 0,
        selectColorId: 0,
        selectCategoryId: 0,
        selectMaterialId: 0,
        selectSeasonId: 0,
      }
    }
   
    await productStore.getProductsList(filters, page, limit);
    productsList.value = productStore.productsList
   
    return productsList
}

//  Получение одного товара по id
export async function useProduct(productId) {
  const productStore = useProductStore()
  const product = ref({})
 
  await productStore.getProduct(productId);
  product.value = productStore.product

  return product
}

// Получение массива цветов и замена белого цвета на серый
export async function useColorsList() {
    const colorArr = ref([])
    
    try {
      const response = await axios.get(API_URL + '/api/colors');

      response.data.items.map((color) => {
        if (color.code === '#ffffff') {
          color.code = '#F0F0F0';
          colorArr.value.push(color);
        } else {
          colorArr.value.push(color);
        }
      });
    } catch (error) {
      console.log('Ошибка при получении списка цветов', error);
    }     
  
    return colorArr.value
}

//  Получение категорий
export async function useCategoryList() {
  const categoryArr = ref([]);

  try {
    const response = await axios.get(API_URL + '/api/productCategories');
    categoryArr.value = response.data.items;
  } catch (error) {
    console.log('Ошибка при получении списка категорий', error);
  }

  return categoryArr.value
}

//  получение материалов
export async function useMaterialsList() {
  const materialsArr = ref([]);

  try {
    const response = await axios.get(API_URL + '/api/materials');
    materialsArr.value = response.data.items;
  } catch (error) {
    console.log('Ошибка при получении списка материалов', error);
  }

  return materialsArr.value
}

//  получение сезонов
export async function useSeasonsList() {
  const seasonsArr = ref([]);
   
  try {
    const response = await axios.get(API_URL + '/api/seasons');
    seasonsArr.value = response.data.items;
  } catch (error) {
    console.log('Ошибка при получении списка сезонов', error);
  }
  
  return seasonsArr.value    
}

