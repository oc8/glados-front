<template>
	<div v-if="app.currentRoom.name">
		<VRow class="mb-n4">
			<VCol>
				<VBtn
					flat
					color="transparent"
					class="font-weight-black text-h6"
					@click="app.prevRoom()"
				>
					{{ "<" }}
				</VBtn>
			</VCol>
			<VCol class="d-flex justify-center">
				<h6
					class="font-weight-black text-h6"
				>
					{{ app.currentRoom.name }}
				</h6>
			</VCol>
			<VCol class="d-flex justify-end">
				<VBtn
					flat
					color="transparent"
					class="font-weight-black text-h6"
					@click="app.nextRoom()"
				>
					{{ ">" }}
				</VBtn>
			</VCol>
		</VRow>
		<VRow v-if="app.currentItems.length != 0">
			<VCol v-for="item in app.currentItems">
				<Item :item="item" />
			</VCol>
		</VRow>
		<div class="d-flex justify-center mt-6 mb-8">
			<VBtn @click="app.postItem()">
				+ add
			</VBtn>
		</div>
	</div>
	<LoaderItem v-else class="h-100 mt-n12"/>
</template>

<script lang="ts" setup>
import Item from "@/components/Item.vue";
import LoaderItem from "@/components/LoaderItem.vue";
import { useAppStore } from '@/store/app';

const app = useAppStore();

app.getRooms();
</script>
