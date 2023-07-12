<template>
	<div class="d-flex px-4 py-4 justify-space-between align-center mb-4 app-bar">
		<div @mouseover="isHover = true" @mouseleave="isHover = false" class="h-100 w-auto">
			<Logo v-show="!isHover" :color="$vuetify.theme.current.colors.text" class="h-100"/>
			<LogoActive v-show="isHover" :color="$vuetify.theme.current.colors.text" class="h-100"/>
		</div>
		<SwitchThemeItem :height="35" @change="toggleTheme"/>
	</div>
</template>

<script lang="ts" setup>
import { ref } from "vue"
import { useRouter, useRoute } from "vue-router"
import Logo from "@/assets/images/logo/ILogoOff.vue"
import LogoActive from "@/assets/images/logo/ILogoOn.vue"
import { useTheme } from 'vuetify/lib/framework.mjs';
import SwitchThemeItem from '@/components/SwitchThemeItem.vue';

const theme = useTheme();
const router = useRouter()
const route = useRoute()

let isHover = ref(false);

function toggleTheme() {
	theme.global.name.value = theme.global.name.value === 'light' ? 'dark' : 'light';
}

const tabs = [
	{
		label: "Dashboard",
		name: "dashboard"
	},
	{
		label: "About",
		name: "about"
	}
];

function goTo(name: string) {
	router.push({ name })
}
</script>

<style scoped>
.app-bar {
	height: 100px;
}
</style>
