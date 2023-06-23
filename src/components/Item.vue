<template>
	<VCard
		:height="150"
		:min-width="300"
		class="d-flex align-center justify-center rounded-lg elevation-0 px-6"
		:color="$vuetify.theme.current.colors.trinary"
		:disabled="item.status == 'unavailable'"
	>
		<VRow>
			<VCol
				v-if="item.type == 'light'"
				class="mt-n3 ml-n2 d-flex align-center justify-center"
				cols="4"
			>
				<ILightOff
					v-if="percent.val.value == 0"
					:width="100"
					:height="100"
					class="pointer"
					:color="$vuetify.theme.current.colors.text"
					@click="percent.val.value = 50"
				/>
				<ILightOn
					v-else-if="percent.val.value > 0"
					:width="100"
					:height="100"
					class="on pointer"
					:color="$vuetify.theme.current.colors.primary"
					@click="percent.val.value = 0"
				/>
			</VCol>
			<VCol class="pr-4">
				<div class="d-flex justify-space-between">
					<h3>
						{{ item.name }}
					</h3>
					<div>
						<VBtn
							flat
							density="compact"
							icon="mdi-volume-high"
							@click="speak(item.name + item.status)"
						/>
						<VBtn
							flat
							density="compact"
							icon="mdi-close"
							@click="app.deleteItem(item)"
						/>
					</div>
				</div>
				<h5>
					{{ item.type }}
				</h5>
				<Slide
					v-if="isNbr"
					class="w-100 mt-6" :percent="percent"
				/>
				<p v-else class="mt-6 text-h6">
					{{ item.value }}
				</p>
			</VCol>
		</VRow>
	</VCard>
</template>

<script setup lang="ts">
import { ref, watch, onMounted, PropType } from "vue";
import ILightOff from "@/assets/icons/ILightOff.vue";
import ILightOn from "@/assets/icons/ILightOn.vue";
import Slide from "@/components/Slide.vue";
import { IItem } from '@/types';
import { useAppStore } from '@/store/app';
import { onUpdated } from 'vue';

const app = useAppStore();

let percent = {val: ref(0)};
let isNbr = ref(true);

const props = defineProps({
	item: {
		type: Object as PropType<IItem>,
		required: true
	}
});
function init() {
	if (Number.isInteger(Number(props.item.value))) {
		percent.val.value = Number(props.item.value);
		if (percent.val.value > 100) {
			percent.val.value = 100;
		} else if (percent.val.value < 0) {
			percent.val.value = 0;
		}
		isNbr.value = true;
	} else {
		isNbr.value = false;
	}
}
onMounted(init);
onUpdated(init);

watch(percent.val, (newVal, oldVal) => {
	if (isNbr.value) {
		props.item.value = newVal.toString();
	}
	if (newVal == 0) {
		props.item.status = 'off';
	} else {
		props.item.status = 'on';
	}
	app.patchItem(props.item);
});

let synth = window.speechSynthesis;
let utterance = new SpeechSynthesisUtterance();

function speak(text: string) {
	if (synth.speaking) {
		synth.cancel();
	}

	return new Promise((resolve, reject) => {
		if (!text)
			text = '';
		utterance.text = text;
		synth.speak(utterance);
		utterance.onend = resolve;
		utterance.onerror = reject;
	});
}
</script>

<style scoped>
.on {
	filter: drop-shadow(0px 0px v-bind("Number(percent.val.value) / 10 + 'px'") v-bind("$vuetify.theme.current.colors.primary"));
}
</style>
