<template>
  <v-app class="px-6 app">
		<default-bar />

		<default-view />
  </v-app>
</template>

<script lang="ts" setup>
import DefaultBar from './AppBar.vue'
import DefaultView from './View.vue'
import { useTheme } from 'vuetify/lib/framework.mjs';
import vuetify from '@/plugins/vuetify';

const theme = useTheme();
console.log(theme.current.value);
console.log(vuetify.theme.current.value);
</script>

<style scoped>
.app {
	background-color: v-bind("$vuetify.theme.current.colors.background");
}
</style>
