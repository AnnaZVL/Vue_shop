<script>
export default {};
</script>

<template>
  <div class="loader">
    <svg class="icon" viewBox="0 0 128 128" width="128px" height="128px">
      <defs>
        <linearGradient id="pl-grad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stop-color="#000" />
          <stop offset="100%" stop-color="#fff" />
        </linearGradient>
        <mask id="pl-mask">
          <rect x="0" y="0" width="128" height="128" fill="#e02e72" />
        </mask>
      </defs>
      <g fill="#e02e72">
        <g class="icon__g">
          <g transform="translate(20,20) rotate(0,44,44)">
            <g class="icon__rect-g">
              <rect class="icon__rect" rx="8" ry="8" width="40" height="40" />
              <rect
                class="icon__rect"
                rx="8"
                ry="8"
                width="40"
                height="40"
                transform="translate(0,48)"
              />
            </g>
            <g class="icon__rect-g" transform="rotate(180,44,44)">
              <rect class="icon__rect" rx="8" ry="8" width="40" height="40" />
              <rect
                class="icon__rect"
                rx="8"
                ry="8"
                width="40"
                height="40"
                transform="translate(0,48)"
              />
            </g>
          </g>
        </g>
      </g>
      <g fill="hsl(337,90%,50%)" mask="#c02e72">
        <g class="icon__g">
          <g transform="translate(20,20) rotate(0,44,44)">
            <g class="icon__rect-g">
              <rect class="icon__rect" rx="8" ry="8" width="40" height="40" />
              <rect
                class="icon__rect"
                rx="8"
                ry="8"
                width="40"
                height="40"
                transform="translate(0,48)"
              />
            </g>
            <g class="icon__rect-g" transform="rotate(180,44,44)">
              <rect class="icon__rect" rx="8" ry="8" width="40" height="40" />
              <rect
                class="icon__rect"
                rx="8"
                ry="8"
                width="40"
                height="40"
                transform="translate(0,48)"
              />
            </g>
          </g>
        </g>
      </g>
    </svg>
  </div>
</template>

<style lang="scss" scoped>
@import '@/assets/scss/_variable.scss';

* {
  border: 0;
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}
// :root {
// 	--hue: 223;
// 	--bg: hsl(var(--hue),90%,90%);
// 	--fg: hsl(var(--hue),90%,10%);
// 	--primary: hsl(var(--hue),90%,50%);
// 	--trans-dur: 0.3s;
// 	font-size: calc(16px + (24 - 16) * (100vw - 320px) / (2560 - 320));
// }
// body {
// 	background-color: var(--bg);
// 	color: var(--fg);
// 	display: flex;
// 	font: 1em/1.5 sans-serif;
// 	height: 100vh;
// 	transition:
// 		background-color var(--trans-dur),
// 		color $trans-dur;
// }
.loader {
  display: flex;
  padding: 1.5em;
  gap: 3em;
  flex-wrap: wrap;
  justify-content: center;
  margin: auto;
  width: 200px;
  height: 300px;

  .icon {
    display: block;
    width: 8em;
    height: 8em;

    &__g,
    &__rect {
      animation: loader-a 1.5s cubic-bezier(0.65, 0, 0.35, 1) infinite;
    }
    &__g {
      transform-origin: 64px 64px;
    }
    &__rect:first-child {
      animation-name: loader-b;
    }
    &__rect:nth-child(2) {
      animation-name: loader-c;
    }
  }

  /* Animations */
  @keyframes loader-a {
    from {
      transform: rotate(0);
    }
    80%,
    to {
      animation-timing-function: steps(1, start);
      transform: rotate(90deg);
    }
  }
  @keyframes loader-b {
    from {
      animation-timing-function: cubic-bezier(0.33, 0, 0.67, 0);
      width: 40px;
      height: 40px;
    }
    20% {
      animation-timing-function: steps(1, start);
      width: 40px;
      height: 0;
    }
    60% {
      animation-timing-function: cubic-bezier(0.65, 0, 0.35, 1);
      width: 0;
      height: 40px;
    }
    80%,
    to {
      width: 40px;
      height: 40px;
    }
  }
  @keyframes loader-c {
    from {
      animation-timing-function: cubic-bezier(0.33, 0, 0.67, 0);
      width: 40px;
      height: 40px;
      transform: translate(0, 48px);
    }
    20% {
      animation-timing-function: cubic-bezier(0.33, 1, 0.67, 1);
      width: 40px;
      height: 88px;
      transform: translate(0, 0);
    }
    40% {
      animation-timing-function: cubic-bezier(0.33, 0, 0.67, 0);
      width: 40px;
      height: 40px;
      transform: translate(0, 0);
    }
    60% {
      animation-timing-function: cubic-bezier(0.33, 1, 0.67, 1);
      width: 88px;
      height: 40px;
      transform: translate(0, 0);
    }
    80%,
    to {
      width: 40px;
      height: 40px;
      transform: translate(48px, 0);
    }
  }
}
</style>
