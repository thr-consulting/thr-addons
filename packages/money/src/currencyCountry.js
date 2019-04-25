const currencyCountryMap = {
	USD: 'US',
	CAD: 'CA',
	EUR: 'DE',
	AED: 'AE',
	AFN: 'AF',
	ALL: 'AL',
	AMD: 'AM',
	ARS: 'AR',
	AUD: 'AU',
	AZN: 'AZ',
	BAM: 'BA',
	BDT: 'BD',
	BGN: 'BG',
	BHD: 'BH',
	BIF: 'BI',
	BND: 'BN',
	BOB: 'BO',
	BRL: 'BR',
	BWP: 'BW',
	BYR: 'BY',
	BZD: 'BZ',
	CDF: 'CD',
	CHF: 'CH',
	CLP: 'CL',
	CNY: 'CN',
	COP: 'CO',
	CRC: 'CR',
	CVE: 'CV',
	CZK: 'CZ',
	DJF: 'DJ',
	DKK: 'DK',
	DOP: 'DO',
	DZD: 'DZ',
	EEK: 'EE',
	EGP: 'EG',
	ERN: 'ER',
	ETB: 'ET',
	GBP: 'GB',
	GEL: 'GE',
	GHS: 'GH',
	GNF: 'GN',
	GTQ: 'GT',
	HKD: 'HK',
	HNL: 'HN',
	HRK: 'HR',
	HUF: 'HU',
	IDR: 'ID',
	ILS: 'IL',
	INR: 'IN',
	IQD: 'IQ',
	IRR: 'IR',
	ISK: 'IS',
	JMD: 'JM',
	JOD: 'JO',
	JPY: 'JP',
	KES: 'KE',
	KHR: 'KH',
	KMF: 'KM',
	KRW: 'KR',
	KWD: 'KW',
	KZT: 'KZ',
	LBP: 'LB',
	LKR: 'LK',
	LTL: 'LT',
	LVL: 'LV',
	LYD: 'LY',
	MAD: 'MA',
	MDL: 'MD',
	MGA: 'MG',
	MKD: 'MK',
	MMK: 'MM',
	MOP: 'MO',
	MUR: 'MU',
	MXN: 'MX',
	MYR: 'MY',
	MZN: 'MZ',
	NAD: 'NA',
	NGN: 'NG',
	NIO: 'NI',
	NOK: 'NO',
	NPR: 'NP',
	NZD: 'NZ',
	OMR: 'OM',
	PAB: 'PA',
	PEN: 'PE',
	PHP: 'PH',
	PKR: 'PK',
	PLN: 'PL',
	PYG: 'PY',
	QAR: 'QA',
	RON: 'RO',
	RSD: 'RS',
	RUB: 'RU',
	RWF: 'RW',
	SAR: 'SA',
	SDG: 'SD',
	SEK: 'SE',
	SGD: 'SG',
	SOS: 'SO',
	SYP: 'SY',
	THB: 'TH',
	TND: 'TN',
	TOP: 'TO',
	TRY: 'TR',
	TTD: 'TT',
	TWD: 'TW',
	TZS: 'TZ',
	UAH: 'UA',
	UGX: 'UG',
	UYU: 'UY',
	UZS: 'UZ',
	VEF: 'VE',
	VND: 'VN',
	XAF: 'CM',
	XOF: 'CF',
	YER: 'YE',
	ZAR: 'ZA',
	ZMK: 'ZM',
};

/**
 * Returns a country code from a currency. Not 100% accurate as some currencies are used in multiple countries.
 * @param {string} currency - The currency code.
 * @return {string} The country code.
 */
export default function getCountryCode(currency) {
	if (!currencyCountryMap[currency]) return '';
	return currencyCountryMap[currency].toLowerCase();
}
