import { changeColumnAttribute, organiseEditedColumns } from './columnChooserManager.hook';

describe('changeColumnAttribute', () => {
	const key = 'myAttr';
	const changeMyAttr = changeColumnAttribute(key);
	it('should change the collection index', () => {
		// given
		const value = 'myNewValue';
		const index = 0;
		const collection = [{ myAttr: 'myOldValue' }];
		// when
		changeMyAttr(value, index)(collection);
		// then
		expect(collection).toEqual([{ myAttr: 'myNewValue' }]);
	});
	it('should change the object key', () => {
		// given
		const value = 'myNewValue';
		const object = { myAttr: 'myOldValue' };
		// when
		changeMyAttr(value)(object);
		// then
		expect(object).toEqual({ myAttr: 'myNewValue' });
	});
});

describe('organiseEditedColumns', () => {
	it('should return the collection organised with correct order', () => {
		// given
		const collection = [
			{ label: 'first', order: 18 },
			{ label: 'third', order: 105 },
			{ label: 'second', order: 27 },
		];
		// when
		organiseEditedColumns(collection);
		// then
		expect(collection).toEqual([
			{ label: 'first', order: 1 },
			{ label: 'second', order: 2 },
			{ label: 'third', order: 3 },
		]);
	});
});
