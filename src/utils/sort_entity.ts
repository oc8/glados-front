import { IItem } from '@/types';

// sort by created_at and id
export default function sortEntity(array: IItem[]): IItem[] {
	array.sort((a: IItem, b: IItem) => {
		if (a.created_at < b.created_at) {
			return -1;
		} else if (a.created_at > b.created_at) {
			return 1;
		} else {
			if (a.id > b.id) {
				return -1;
			} else if (a.id < b.id) {
				return 1;
			} else {
				return 0;
			}
		}
	});
	return array;
}
