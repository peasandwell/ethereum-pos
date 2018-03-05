import transactionsReducer from './transactions.js';
import * as types from '../../constants/actionTypes';
import env from '../../utils/environment';

// check if user defined variables exist
// if not, use dummy ones for now
env.REACT_APP_DEFAULT_SYMBOL = env.REACT_APP_DEFAULT_SYMBOL ? env.REACT_APP_DEFAULT_SYMBOL : 'TST';
env.REACT_APP_DEFAULT_DECIMALS = env.REACT_APP_DEFAULT_DECIMALS ? env.REACT_APP_DEFAULT_DECIMALS : '2';

// all values are inserted as hexadecimal values
// which are then converted in the reducer
const newTransaction = {
	transactionHash: '0x00000000',
	timeStamp: '0x5a8edf01',
	topics: [ '', '0x0000000000000000001111111111111111111111', '0x00000000000000000022222222222222222' ],
	data: '0xe1',
	address: '0x123456789',
	blockNumber: '0x123456789',
	gasPrice: '0x123456789',
	gasUsed: '0x123456789',
	logIndex: '0x123456789',
	transactionIndex: '0x123456789',
};

describe('transactions reducer', () => {
	it('should return the initial state', () => {
		const initialState = undefined;
		const action = {};
		const expectedState = {};

		expect(transactionsReducer(initialState, action)).toEqual(expectedState);
	});

	it('should add a new transaction', () => {
		const initialState = {};
		const action = {
			type: types.ADD_TRANSACTION,
			payload: newTransaction,
		};
		const expectedState = {
			'0x00000000': {
				amount: '2.25',
				timestamp: 1519312641,
				from: '0x1111111111111111',
				to: '0x22222222222',
				symbol: env.REACT_APP_DEFAULT_SYMBOL,
			},
		};

		expect(transactionsReducer(initialState, action)).toEqual(expectedState);
	});

	it('should disregard new transactions with similar transactionHash', () => {
		const initialState = {
			'0x00000000': {
				amount: '2.25',
				timestamp: 1519312612,
				from: '0x1111111111111111',
				to: '0x22222222222',
				symbol: env.REACT_APP_DEFAULT_SYMBOL,
			},
		};
		const action = {
			type: types.ADD_TRANSACTION,
			payload: newTransaction,
		};
		const expectedState = {
			'0x00000000': {
				amount: '2.25',
				timestamp: 1519312612,
				from: '0x1111111111111111',
				to: '0x22222222222',
				symbol: env.REACT_APP_DEFAULT_SYMBOL,
			},
		};

		expect(transactionsReducer(initialState, action)).toEqual(expectedState);
	});
});
