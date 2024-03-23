<script setup>
import IconFacebook from '@/assets/images/icons/IconFacebook.vue';
import IconInst from '@/assets/images/icons/IconInst.vue';
import IconVK from '@/assets/images/icons/IconVK.vue';
import IconTwitter from '@/assets/images/icons/IconTwitter.vue';
import IconTelegram from '@/assets/images/icons/IconTelegram.vue';
</script>

<template>
  <footer class="footer container">
    <div class="footer__wrapper">
      <ul class="footer__links">
        <li>
          <router-link class="footer__link" to="/"> Каталог </router-link>
        </li>
        <li>
          <a class="footer__link" href="tel:88006009009"> 8 800 600 90 09 </a>
        </li>
        <li>
          <a class="footer__link" href="mailto:hi@technozavrrr.com"> hi@technozavrrr.com </a>
        </li>
        <li>
          <a class="footer__link" href="#"> Распродажа </a>
        </li>
        <li>
          <a class="footer__link footer__link--medium" href="#"> Заказать звонок </a>
        </li>
      </ul>

      <ul class="footer__social social">
        <li class="social__item">
          <a class="social__link" href="#" aria-label="Вконтакте">
            <IconVK class="social__icon"></IconVK>
          </a>
        </li>
        <li class="social__item">
          <a class="social__link" href="#" aria-label="Инстаграм">
            <IconInst class="social__icon"></IconInst>
          </a>
        </li>
        <li class="social__item">
          <a class="social__link" href="#" aria-label="Facebook">
            <IconFacebook class="social__icon"></IconFacebook>
          </a>
        </li>
        <li class="social__item">
          <a class="social__link" href="#" aria-label="Twitter">
            <IconTwitter class="social__icon"></IconTwitter>
          </a>
        </li>
        <li class="social__item">
          <a class="social__link" href="#" aria-label="Telegram">
            <IconTelegram class="social__icon"></IconTelegram>
          </a>
        </li>
      </ul>

      <p class="footer__desc">
        Все права на&nbsp;материалы, находящиеся на&nbsp;сайте, охраняются в&nbsp;соответствии
        с&nbsp;законодательством&nbsp;РФ, в&nbsp;том числе об&nbsp;авторском праве и&nbsp;смежных
        правах.
      </p>

      <ul class="footer__data">
        <li>
          <a class="footer__link" href="#" target="_blank" rel="noopener" type="application/pdf">
            Политика конфиденциальности
          </a>
        </li>
        <li>
          <a class="footer__link" href="#" target="_blank" rel="noopener" type="application/pdf">
            Публичная оферта
          </a>
        </li>
      </ul>

      <span class="footer__copyright"> © 2020 Moire </span>
    </div>
  </footer>
</template>

<style lang="scss" scoped>
@import '@/assets/scss/_variable.scss';

.footer {
  &__wrapper {
    display: grid;
    grid-template-columns: 58% 40%;
    gap: 20px;
    justify-content: space-between;
    padding-top: 60px;
    padding-bottom: 60px;
    border-top: 1px solid $color_border;
  }

  &__links {
    margin: 0;
    padding: 0;
    list-style: none;
    display: grid;
    grid-template-columns: repeat(3, auto);
    grid-gap: 20px 30px;
  }

  &__link {
    font-size: 14px;
    line-height: 24px;
    color: $color_text;
    border-bottom: 2px solid transparent;
    transition: all 0.3s ease-in-out;

    &:hover,
    &:focus {
      border-color: $color_primery;
    }

    &--medium {
      font-weight: 500;
    }
  }

  &__desc {
    margin: 30px 0 37px;
    font-size: 14px;
    line-height: 24px;
    color: $color_grey;
  }

  &__social {
    margin-left: auto;
    align-self: flex-start;
  }

  &__copyright {
    grid-row: 3/4;
    align-self: flex-end;
    font-size: 12px;
  }

  &__data {
    margin: 0;
    padding: 0;
    list-style: none;
    display: grid;
    grid-template-columns: repeat(2, auto);
    grid-gap: 10px;
    justify-content: space-between;
    grid-column: 2/3;
    grid-row: 3/4;
  }
}

.social {
  margin: 0;
  padding: 0;
  list-style: none;
  display: flex;
  align-items: center;
  flex-wrap: wrap;

  &__item + &__item {
    margin-left: 30px;
  }

  &__link:hover &__icon {
    fill: $color_primery;
  }

  &__icon {
    fill: #d9d9d9;
    transition: fill 0.3s ease-in-out;
  }
}

@media (max-width: 1024px) {
  .footer {
    &__data {
      grid-template-columns: 1fr;
    }
  }
}

@media (max-width: 992px) {
  .footer {
    &__links {
      grid-template-columns: repeat(2, 1fr);
    }
  }
}

@media (max-width: 768px) {
  .footer {
    &__wrapper {
      display: flex;
      flex-direction: column;
    }

    &__desc {
      margin: 0;
    }
  }
}
</style>
