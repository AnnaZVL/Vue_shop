import { defineStore } from 'pinia';
import axios from "axios";
import { API_URL } from '@/services/productAPI';
import { ref } from 'vue';

export const useCartStore = defineStore('cart', () => {
    const cartList = ref([]);
    const orderData = ref([]);
    const userAccessKey = ref(null);
    const totalAmount = ref(null);
    const payList = ref([]);
    const deliveryList = ref([])
    
// Получение списка всех продуктов в корзине
    const getCartList = async() => {
        try {
            await axios.get(API_URL +'/api/baskets', {
                params: {
                    userAccessKey: userAccessKey.value,                     
                }
                }).then(response => {                
            
                    updateCartList(response.data.items)
                        totalAmount.value = cartList.value.length;

                        if (!localStorage.getItem('userKey')) {
                        localStorage.setItem('userKey', response.data.user.accessKey)
                        updateUserKey(response.data.user.accessKey)
                    }                            
                })                        
        } catch (error) {
            console.log('Ошибка при получении корзины', error);
        }
    }

    // Добавление товара в корзину
    const addCart = async(data) => {                     
        
        await axios.post(API_URL +`/api/baskets/products`, data, {
            params: {
            userAccessKey: userAccessKey.value,                    
            }
        }).then((res) => {                    
            if (!localStorage.getItem('userKey')) {
                localStorage.setItem('userKey', res.data.user.accessKey)
                updateUserKey(res.data.user.accessKey)
            }
            getCartList()                
            
            return res
        }).catch(error => {
            console.log('Ошибка при добавлении в корзину', error);
        })    
    }

    //  Изменение кол-ва товара
    const  updateAmountProduct = async(data) => {
       
        const item = cartList.value.find(item => item.id === data.basketItemId)
        
        if (item) {
            item.quantity = data.quantity
        }
   
        await axios.put(API_URL +`/api/baskets/products`, data, {
                params: {
                    userAccessKey: userAccessKey.value,                    
                }
        })
    }
     // Удаление товара из корзины
        const deleteProductCart = async(cartProductId) => {
            try {
                await axios.delete(API_URL +`/api/baskets/products`,   {
                    data: {basketItemId: cartProductId},
                    params: {
                        userAccessKey: userAccessKey.value,                               
                    }
                })
                cartList.value = cartList.value.filter(item => item.id !== +cartProductId);
                               
            } catch (error) {
                console.log('Ошибка при удалении товара из корзины', error);
            }
        }       

    const updateCartList = (data) => {        
        cartList.value = data;
    }

    const updateUserKey = (key) => {        
        userAccessKey.value = key;            
    }

     // Создать заказ
    const createdOrder = async(order) => {        
        try {
            const res = await axios.post(API_URL +`/api/orders`, order, {
                params: {
                userAccessKey: userAccessKey.value,                    
                }                
            })
                cartList.value = []
                               
                return res.data
        } catch (error) {
            console.log('Ошибка при создании заказа', error);  
        }
    }

    // Обновить информацию о заказе
    const updateOrderData = (order) => {
            orderData.value = order            
        }

    // Получить информацию о заказе
    const getInfoOrder = async(orderId) => {
       
            try {
                await axios.get(API_URL +`/api/orders/` + orderId, {
                    params: {
                    userAccessKey: userAccessKey.value,                                        
                    }
                }).then(response => {
                    orderData.value = response.data                    
                })
            } catch (error) {
                console.log('Ошибка при получении данных о заказе', error);  
            }
        }    
        
    // Получение способов оплаты
    const getPayList = async(deliveryTypeId = 1) => {
        try {
            const response = await axios.get(API_URL + '/api/payments', {
                params: {
                deliveryTypeId
                },
            });
            payList.value = response.data;

            return response.data            
        } catch (error) {
            console.log('Ошибка при получении способов оплаты', error);
        }
    }

    // Получение способов доставки
    const getDeliveryList = async() => {
        try {
            const response = await axios.get(API_URL + '/api/deliveries');
            deliveryList.value = response.data;
                
            return response.data
        } catch (error) {
            console.log('Ошибка при получении способов доставки', error);
        }
    }

    return {
        cartList, orderData, totalAmount, payList, deliveryList, getCartList, addCart, updateUserKey, updateAmountProduct, deleteProductCart, createdOrder, getInfoOrder, getPayList, getDeliveryList, updateOrderData,
    }
})