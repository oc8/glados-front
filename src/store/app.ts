// Utilities
import { defineStore } from 'pinia'
import http from '@/plugins/axios'
import { IRoom, IItem } from '@/types'
import sortEntity from '@/utils/sort_entity';

let timerId: ReturnType<typeof setTimeout>;
const delay = 100;

export const useAppStore = defineStore('app', {
  state: () => ({
		currentRoom: { id: '', name: ''},
		currentItems: [] as IItem[],
		rooms: [] as IRoom[],
  }),
	actions: {
		// api
		async getRooms(): Promise<void> {
			this.rooms = (await http.get('/rooms')).data;
			this.currentRoom = this.rooms[0];
			this.getCurrentItems();
		},
		async getCurrentItems(): Promise<void> {
			const rs = await http.get('/entities?room_id=' + this.currentRoom.id);
			this.currentItems = sortEntity(rs.data);
		},
		async postItem() {
			await http.post('/entities', {
				name: 'New light ' + Math.floor(Math.random() * 100),
				type: 'light',
				status: 'off',
				value: '0',
				room_id: this.currentRoom.id,
			});
			this.getCurrentItems();
		},
		async deleteItem(item: IItem) {
			const rs = await http.delete('/entities/' + item.id);
			this.getCurrentItems();
		},
		async patchItem(item: IItem) {
			clearTimeout(timerId);
				timerId = setTimeout(async () => {
				const rs = await http.patch('/entities/' + item.id, {
					status: item.status,
					value: item.value
				});
				this.getCurrentItems();
			}, delay);
		},
		// room navigation
		prevRoom() {
			const idx = this.rooms.findIndex((r) => r.id === this.currentRoom.id);
			if (idx > 0) {
				this.currentRoom = this.rooms[idx - 1];
			} else {
				this.currentRoom = this.rooms[this.rooms.length - 1];
			}
			this.getCurrentItems();
		},
		nextRoom() {
			const idx = this.rooms.findIndex((r) => r.id === this.currentRoom.id);
			if (idx < this.rooms.length - 1) {
				this.currentRoom = this.rooms[idx + 1];
			} else {
				this.currentRoom = this.rooms[0];
			}
			this.getCurrentItems();
		},
	}
});
