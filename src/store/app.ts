// Utilities
import { defineStore } from 'pinia'
import http from '@/plugins/axios'
import { IRoom, IItem } from '@/types'
import { compileScript } from 'vue/compiler-sfc';

let timerId: ReturnType<typeof setTimeout>;
const delay = 1000;

export const useAppStore = defineStore('app', {
  state: () => ({
		currentRoom: { id: '', name: ''},
		currentItems: [] as IItem[],
		rooms: [] as IRoom[],
  }),
	actions: {
		async getRooms(): Promise<void> {
			this.rooms = (await http.get('/rooms')).data;
			this.currentRoom = this.rooms[0];
			this.getCurrentItems();
		},
		async getCurrentItems(): Promise<void> {
			const rs = await http.get('/entities?room_id=' + this.currentRoom.id);
			// sort by creation date
			rs.data.sort((a: IItem, b: IItem) => {
				if (a.created_at < b.created_at) {
					return 1;
				} else if (a.created_at > b.created_at) {
					return -1;
				}
				return 0;
			});
			this.currentItems = rs.data;
			console.log(this.currentItems);
		},
		async postItem() {
			const rs = await http.post('/entities', {
				name: 'New light ' + Math.floor(Math.random() * 100),
				type: 'light',
				status: 'off',
				value: '0',
				room_id: this.currentRoom.id,
			});
			console.log(rs);
			this.getCurrentItems();
		},
		async deleteItem(item: IItem) {
			const rs = await http.delete('/entities/' + item.id);
			console.log(rs);
			this.getCurrentItems();
		},
		async patchItem(item: IItem) {
			clearTimeout(timerId);
				timerId = setTimeout(async () => {
				const rs = await http.patch('/entities/' + item.id, {
					status: item.status,
					value: item.value
				});
				console.log(rs);
				this.getCurrentItems();
			}, delay);
		},
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
