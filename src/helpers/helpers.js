// Замена окончаний в зависимости от кол-ва товаров
export default function replacingEndings(quantity) {
  const words = ['товар', 'товара', 'товаров'];

  const num = quantity % 10;
  if (quantity > 10 && quantity < 20) return words[2];
  if (num > 1 && num < 5) return words[1];
  if (num == 1) return words[0];
  return words[2];
}