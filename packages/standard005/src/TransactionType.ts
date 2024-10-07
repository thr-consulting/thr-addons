export enum TransactionType {
	// Payroll
	PayrollDeposit = 200,
	SpecialPayroll = 201,
	VacationPayroll = 202,
	OvertimePayroll = 203,
	AdvancePayroll = 204,
	CommissionPayroll = 205,
	BonusPayroll = 206,
	AdjustmentPayroll = 207,
	// Pension
	Pension = 230,
	FederalPension = 231,
	ProvincialPension = 232,
	PrivatePension = 233,
	// Annuity
	Annuity = 240,
	// Dividends
	Dividend = 250,
	CommonDividend = 251,
	PreferredDividend = 252,
	// Investment
	Investment = 260,
	MutualFunds = 261,
	SpousalRSPContribution = 265,
	RESPContribution = 266,
	RSPContribution = 271,
	RetirementIncomeFund = 272,
	TaxFreeSavingsAccount = 273,
	RDSPContribution = 274,
	Interest = 280,
	LotteryPrizePayment = 281,
	/*
		There are a LOT more of these
	 */
	FeesDues = 470,
}
