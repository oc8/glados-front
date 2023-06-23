import { Ref } from 'vue';

export interface IRoom {
	id: string;
	name: string;
}

export interface IItem {
	id: number;
	name: string;
	type: string;
	status: string;
	value: string;
	room_id: string;
	created_at: string;
}
