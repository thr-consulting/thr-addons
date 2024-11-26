import {LocalDate} from '@js-joda/core';
import type {Currency, CurrencyString} from 'js-money';
import Money from 'js-money';
import {chunk} from 'lodash-es';
import {filler, generateAmount, generateCrossRef, generateDate, generateInstitution, generateNumber, generateString} from './generate';
import type {Originator, Receive, Returns, Send} from './types';
import {verifyCurrency, verifyInteger, verifyOriginator, verifyReceive, verifyReturns, verifySend, verifyStringExact} from './verify';

interface Standard005Constructor {
	currency: Currency | CurrencyString;
	originator: Originator;
	fileCreationNum: number; // 0 to 9999
	fileCreationDate?: LocalDate;
	dueDate: LocalDate;
	dataCentreId: number; // 5 digits
	send?: {
		returns: Returns;
	};
	receive?: {
		returns: Returns;
	};
}

export class Standard005 {
	private readonly currency: CurrencyString;
	private originator: Originator;
	private readonly fileCreationNum: number;
	private readonly fileCreationDate = LocalDate.now();
	private readonly dueDate: LocalDate;
	private readonly dataCentreId: number;
	private readonly send:
		| {
				returns: Returns;
				transactions: Send[];
		  }
		| undefined;
	private readonly receive:
		| {
				returns: Returns;
				transactions: Receive[];
		  }
		| undefined;

	constructor(opts: Standard005Constructor) {
		if (typeof opts.currency === 'string') {
			this.currency = opts.currency;
		} else {
			this.currency = opts.currency.code;
		}
		verifyCurrency(this.currency);

		this.originator = verifyOriginator(opts.originator);
		this.fileCreationNum = verifyInteger(opts.fileCreationNum, 4, 'File creation number', {max: 9999, min: 1});
		this.dataCentreId = verifyInteger(opts.dataCentreId, 5, 'Data centre ID');
		this.dueDate = opts.dueDate;

		if (opts.send) {
			this.send = {
				returns: verifyReturns(opts.send.returns),
				transactions: [],
			};
		}

		if (opts.receive) {
			this.receive = {
				returns: verifyReturns(opts.receive.returns),
				transactions: [],
			};
		}

		if (opts.fileCreationDate) {
			this.fileCreationDate = opts.fileCreationDate;
		}
	}

	public addSend(send: Send): string {
		if (!this.send) throw new Error('Sends are not configured on this instance of Standard005');
		verifySend(send, this.currency);
		const crossRef = generateCrossRef(send.id, this.fileCreationDate);
		this.send.transactions.push({
			...send,
			id: crossRef,
		});
		return crossRef;
	}

	public addReceive(receive: Receive): string {
		if (!this.receive) throw new Error('Receives are not configured on this instance of Standard005');
		verifyReceive(receive, this.currency);
		const crossRef = generateCrossRef(receive.id, this.fileCreationDate);
		this.receive.transactions.push({
			...receive,
			id: crossRef,
		});
		return crossRef;
	}

	private generateARecord() {
		const data = [
			'A',
			'000000001',
			generateNumber(this.originator.id, 10),
			generateNumber(this.fileCreationNum, 4),
			generateDate(this.fileCreationDate),
			generateNumber(this.dataCentreId, 5),
			filler(20),
			this.currency.toUpperCase(),
			filler(1406),
		];

		const a = data.join('');
		verifyStringExact(a, 1464, 'A Record');
		return a;
	}

	private generateCSegment(sendTransaction: Send) {
		if (!this.send) {
			throw new Error('Return data must be specified');
		}
		const dataCentreStr = generateNumber(this.dataCentreId, 5);

		const data = [
			generateNumber(sendTransaction.type, 3),
			generateAmount(sendTransaction.amount, 10),
			generateDate(this.dueDate),
			generateInstitution(sendTransaction.payee.institution),
			generateString(sendTransaction.payee.accountNum, 12),
			`${dataCentreStr.slice(0, 4)}${dataCentreStr}${generateNumber(this.fileCreationNum, 4)}${generateNumber(sendTransaction.sequence, 9)}`,
			'000',
			generateString(this.originator.shortName, 15),
			generateString(sendTransaction.payee.name, 30),
			generateString(this.originator.longName, 30),
			generateString(this.originator.userId, 10),
			generateString(sendTransaction.id, 19),
			generateInstitution(this.send.returns.institution),
			generateString(this.send.returns.accountNum, 12),
			filler(15), // orig sundry info
			filler(22), // filler
			filler(2), // orig direct clearer settlement code
			'00000000000',
		];

		const seg = data.join('');
		verifyStringExact(seg, 240, 'C segment');
		return seg;
	}

	private generateCRecord(recordCount: number, sendTransactionsChunk: Send[]) {
		if (sendTransactionsChunk.length < 1 || sendTransactionsChunk.length > 6) {
			throw new Error('Can only generate C records on 1 to 6 records');
		}

		const segments = sendTransactionsChunk
			.map(transaction => this.generateCSegment(transaction))
			.join('')
			.padEnd(1440, ' ');

		const data = [
			'C',
			generateNumber(recordCount, 9),
			`${generateNumber(this.originator.id, 10)}${generateNumber(this.fileCreationNum, 4)}`,
			segments,
		];

		const c = data.join('');
		verifyStringExact(c, 1464, 'C Record');
		return c;
	}

	private generateDSegment(recvTransaction: Receive) {
		if (!this.receive) {
			throw new Error('Return data must be specified');
		}
		const dataCentreStr = generateNumber(this.dataCentreId, 5);

		const data = [
			generateNumber(recvTransaction.type, 3),
			generateAmount(recvTransaction.amount, 10),
			generateDate(this.dueDate),
			generateInstitution(recvTransaction.payor.institution),
			generateString(recvTransaction.payor.accountNum, 12),
			`${dataCentreStr.slice(0, 4)}${dataCentreStr}${generateNumber(this.fileCreationNum, 4)}${generateNumber(recvTransaction.sequence, 9)}`,
			'000',
			generateString(this.originator.shortName, 15),
			generateString(recvTransaction.payor.name, 30),
			generateString(this.originator.longName, 30),
			generateString(this.originator.userId, 10),
			generateString(recvTransaction.id, 19),
			generateInstitution(this.receive.returns.institution),
			generateString(this.receive.returns.accountNum, 12),
			filler(15), // orig sundry info
			filler(22), // filler
			filler(2), // orig direct clearer settlement code
			'00000000000',
		];

		const seg = data.join('');
		verifyStringExact(seg, 240, 'D segment');
		return seg;
	}

	private generateDRecord(recordCount: number, recvTransactionsChunk: Receive[]) {
		if (recvTransactionsChunk.length < 1 || recvTransactionsChunk.length > 6) {
			throw new Error('Can only generate D records on 1 to 6 records');
		}

		const segments = recvTransactionsChunk
			.map(transaction => this.generateDSegment(transaction))
			.join('')
			.padEnd(1440, ' ');

		const data = [
			'D',
			generateNumber(recordCount, 9),
			`${generateNumber(this.originator.id, 10)}${generateNumber(this.fileCreationNum, 4)}`,
			segments,
		];

		const d = data.join('');
		verifyStringExact(d, 1464, 'D Record');
		return d;
	}

	private generateZRecord(recordCount: number) {
		const cAmount = this.send
			? generateAmount(
					this.send.transactions.reduce((memo, v) => {
						return memo.add(v.amount);
					}, new Money(0, this.currency)),
					14,
			  )
			: generateNumber(0, 14);

		const dAmount = this.receive
			? generateAmount(
					this.receive.transactions.reduce((memo, v) => {
						return memo.add(v.amount);
					}, new Money(0, this.currency)),
					14,
			  )
			: generateNumber(0, 14);

		const data = [
			'Z',
			generateNumber(recordCount, 9),
			`${generateNumber(this.originator.id, 10)}${generateNumber(this.fileCreationNum, 4)}`,
			dAmount,
			generateNumber(this.receive ? this.receive.transactions.length : 0, 8),
			cAmount,
			generateNumber(this.send ? this.send.transactions.length : 0, 8),
			generateAmount(new Money(0, this.currency), 14),
			generateNumber(0, 8),
			generateAmount(new Money(0, this.currency), 14),
			generateNumber(0, 8),
			filler(1352),
		];

		const z = data.join('');
		verifyStringExact(z, 1464, 'Z Record');
		return z;
	}

	public generate() {
		const data = [this.generateARecord()];
		let recordCount = 1;
		if (this.send && this.send.transactions.length > 0) {
			const chunks = chunk(this.send.transactions, 6);
			chunks.forEach(chk => {
				recordCount += 1;
				data.push(this.generateCRecord(recordCount, chk));
			});
		}
		if (this.receive && this.receive.transactions.length > 0) {
			const chunks = chunk(this.receive.transactions, 6);
			chunks.forEach(chk => {
				recordCount += 1;
				data.push(this.generateDRecord(recordCount, chk));
			});
		}
		recordCount += 1;
		data.push(this.generateZRecord(recordCount));

		return `${data.join('\r\n')}\r\n`;
	}
}
