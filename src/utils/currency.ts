export const USD_TO_INR_EXCHANGE_RATE = 83; // Update periodically as needed

export function usdToInr(amountUsd: number): number {
  return amountUsd * USD_TO_INR_EXCHANGE_RATE;
}

export function formatINR(amountInInr: number, options?: Intl.NumberFormatOptions): string {
  const formatter = new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
    ...options,
  });
  return formatter.format(amountInInr);
}

export function formatUsdAsInr(amountUsd: number, options?: Intl.NumberFormatOptions): string {
  return formatINR(usdToInr(amountUsd), options);
}


