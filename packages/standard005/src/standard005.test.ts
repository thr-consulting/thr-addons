import {LocalDate} from '@js-joda/core';
import {toMoney} from '@thx/money';
import Money from 'js-money';
import {Standard005} from './Standard005';
import {TransactionType} from './TransactionType';
import type {Receive, Send} from './types';

const con1 = {
	dataCentreId: 12345,
	fileCreationNum: 7879,
	fileCreationDate: LocalDate.ofEpochDay(19000),
	currency: Money.CAD,
	originator: {
		id: 1234567890,
		longName: 'Long company name limited',
		shortName: 'Short company',
		userId: 'CPA4323',
	},
};
const con2 = {
	dataCentreId: 56789,
	fileCreationNum: 1,
	fileCreationDate: LocalDate.ofEpochDay(19000),
	currency: Money.CAD,
	originator: {
		id: 5428713698,
		longName: 'Generic Company Name',
		shortName: 'GenComp',
		userId: 'JDE92934',
	},
	send: {
		returns: {
			accountNum: '487518496458',
			institution: {
				transit: 33322,
				route: 323,
			},
		},
	},
};
const con3 = {
	dataCentreId: 54784,
	fileCreationNum: 9999,
	fileCreationDate: LocalDate.ofEpochDay(19000),
	currency: Money.CAD,
	originator: {
		id: 4521781369,
		longName: 'Another Company',
		shortName: 'Another',
		userId: 'JDL2904D',
	},
	receive: {
		returns: {
			accountNum: '784561585487',
			institution: {
				transit: 84667,
				route: 589,
			},
		},
	},
};
// const con4 = {
// 	dataCentreId: 47861,
// 	fileCreationNum: 5874,
// 	currency: Money.CAD,
// 	originator: {
// 		id: 5874196328,
// 		longName: 'Test Company',
// 		shortName: 'Test',
// 		userId: 'FJVB3483',
// 	},
// 	send: {
// 		returns: {
// 			accountNum: '487518496458',
// 			institution: {
// 				transit: 33322,
// 				route: 323,
// 			},
// 		},
// 	},
// 	receive: {
// 		returns: {
// 			accountNum: '784561585487',
// 			institution: {
// 				transit: 84667,
// 				route: 589,
// 			},
// 		},
// 	},
// };

const target1 = {
	name: 'John Doe',
	accountNum: '389347475789',
	institution: {
		transit: 73672,
		route: 327,
	},
};
const target2 = {
	name: 'Jane Doe',
	accountNum: '885789456157',
	institution: {
		transit: 54885,
		route: 815,
	},
};
const target3 = {
	name: 'Bob Doe',
	accountNum: '5788745987',
	institution: {
		transit: 45878,
		route: 113,
	},
};

const send1: Send = {
	type: TransactionType.AdjustmentPayroll,
	sequence: 1,
	id: 'c964f8c6-3928-48d9-b90c-9426fef5c9f4',
	amount: toMoney(99999999, 'CAD'),
	payee: target1,
};
const send2: Send = {
	type: TransactionType.Interest,
	sequence: 2,
	id: '4a7378d2-1bcb-4ac3-88be-e59552ec45b7',
	amount: toMoney(45785, 'CAD'),
	payee: target2,
};
const send3: Send = {
	type: TransactionType.VacationPayroll,
	sequence: 3,
	id: '06c2f113-46ec-4d22-9b18-55592e74daf5',
	amount: toMoney(508900, 'CAD'),
	payee: target3,
};

const receive1: Receive = {
	type: TransactionType.AdjustmentPayroll,
	sequence: 1,
	id: 'd0cce218-72a5-4698-8feb-d3325b0fda45',
	amount: toMoney(99999999, 'CAD'),
	payor: target1,
};
const receive2: Receive = {
	type: TransactionType.Interest,
	sequence: 2,
	id: '2355c928-91ed-4e4a-a8ec-bdbddd47c673',
	amount: toMoney(45785, 'CAD'),
	payor: target2,
};
const receive3: Receive = {
	type: TransactionType.VacationPayroll,
	sequence: 3,
	id: '2b701e10-5db5-4180-b8f0-ae3cd62aad3d',
	amount: toMoney(508900, 'CAD'),
	payor: target3,
};

describe('Standard005', () => {
	it('should construct', () => {
		const s = new Standard005(con1);
		expect(s).toBeInstanceOf(Standard005);
		expect(s.generate()).toMatchSnapshot();
	});

	it('should generate a C record', () => {
		const s = new Standard005(con2);
		s.addSend(send1);
		s.addSend(send2);
		s.addSend(send3);
		expect(s.generate()).toMatchSnapshot();
	});

	it('should generate multiple C records', () => {
		const s = new Standard005(con2);
		s.addSend(send1);
		s.addSend(send2);
		s.addSend(send3);
		s.addSend(send1);
		s.addSend(send2);
		s.addSend(send3);
		s.addSend(send1);
		s.addSend(send2);
		s.addSend(send3);
		expect(s.generate()).toMatchSnapshot();
	});

	it('should generate a D record', () => {
		const s = new Standard005(con3);
		s.addReceive(receive1);
		s.addReceive(receive2);
		s.addReceive(receive3);
		expect(s.generate()).toMatchSnapshot();
	});

	it('should generate multiple D records', () => {
		const s = new Standard005(con3);
		s.addReceive(receive1);
		s.addReceive(receive2);
		s.addReceive(receive3);
		s.addReceive(receive1);
		s.addReceive(receive2);
		s.addReceive(receive3);
		s.addReceive(receive1);
		s.addReceive(receive2);
		s.addReceive(receive3);
		expect(s.generate()).toMatchSnapshot();
	});

	it('should throw errors while constructing', () => {
		expect(() => {
			// eslint-disable-next-line no-unused-vars,@typescript-eslint/no-unused-vars
			const s = new Standard005({
				dataCentreId: 12344564565,
				fileCreationNum: 7879,
				currency: Money.CAD,
				originator: {
					id: 1234567890,
					longName: 'Long company name limited',
					shortName: 'Short company',
					userId: 'CPA4323',
				},
			});
		}).toThrowErrorMatchingSnapshot();
	});

	it('should throw when adding wrong data', () => {
		const s1 = new Standard005(con3);
		expect(() => s1.addSend(send1)).toThrowErrorMatchingSnapshot();
		const s2 = new Standard005(con2);
		expect(() => s2.addReceive(receive1)).toThrowErrorMatchingSnapshot();
	});

	it('should not accept zero amounts', () => {
		const s1 = new Standard005(con2);
		expect(() =>
			s1.addSend({
				...send1,
				amount: new Money(0, 'CAD'),
			}),
		).toThrowErrorMatchingSnapshot();
	});
});
