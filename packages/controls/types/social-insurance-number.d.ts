declare module 'social-insurance-number' {
	class social_insurance_number {
		constructor(sin: string);

		isBusinessNumber(): boolean;

		isTemporary(): boolean;

		isValid(): boolean;

		normalizedValue(): string;

		provinces(): string[];

		// static SocialInsuranceNumber: any;
		static generate(options: {province?: string; startsWith?: string; doesNotStartWith?: string | string[]}): string;
	}

	export = social_insurance_number;
}
