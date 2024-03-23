import {ref} from 'vue'
import { useCartStore } from "@/store/cartStore";

export async function useCartList() {
    const cartStore = useCartStore()
    const cartList = ref([])

    await cartStore.getCartList()
    cartList.value = cartStore.cartList       
  
    return cartList
}

export function updateUserAccessKey() {
    const cartStore = useCartStore()
    const userAccessKey = ref('');

    userAccessKey.value = localStorage.getItem('userKey');
   
    if (userAccessKey.value) {
            cartStore.userAccessKey = userAccessKey.value;
            cartStore.updateUserKey(userAccessKey.value);
        }  
}