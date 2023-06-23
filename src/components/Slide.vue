<template>
	<label class="slider">
      <input type="range" class="level" v-model="percent.val.value" />
  </label>
</template>

<script setup lang="ts">
const props = defineProps({
	percent: {
		type: Object,
		required: true
	}
});
</script>

<style scoped>
.slider {
  --slider-width: 100%;
  --slider-height: 20px;
  --slider-bg: v-bind("$vuetify.theme.global.name === 'dark' ? 'rgb(82, 82, 82)' : 'rgb(230, 230, 230)'");
  --slider-border-radius: 999px;

  --level-color: v-bind("$vuetify.theme.current.colors.primary");
  --level-transition-duration: .1s;
}

.slider {
  cursor: pointer;
  display: -webkit-inline-box;
  display: -ms-inline-flexbox;
  display: inline-flex;
  -webkit-box-orient: horizontal;
  -webkit-box-direction: reverse;
  -ms-flex-direction: row-reverse;
  flex-direction: row-reverse;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
}

.slider .volume {
  display: inline-block;
  vertical-align: top;
  height: auto;
}

.slider .level {
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  width: var(--slider-width);
  height: var(--slider-height);
  background: var(--slider-bg);
  overflow: hidden;
  border-radius: var(--slider-border-radius);
  -webkit-transition: height var(--level-transition-duration);
  -o-transition: height var(--level-transition-duration);
  transition: height var(--level-transition-duration);
  cursor: inherit;
}

.slider .level::-webkit-slider-thumb {
  -webkit-appearance: none;
  width: 0;
  height: 0;
  -webkit-box-shadow: -1500px 0 0 1500px var(--level-color);
  box-shadow: -1500px 0 0 1500px var(--level-color);
}

.slider:hover .level {
  height: calc(var(--slider-height) * 1.2);
}
</style>
