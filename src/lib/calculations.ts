export type TaxForm = 'scale' | 'linear' | 'lump'
export type ZusVariant = 'start' | 'preferential' | 'full'
export const taxForms: { value: TaxForm; label: string }[] = [
  { value: 'scale', label: 'Skala podatkowa' }, { value: 'linear', label: 'Liniowy 19%' }, { value: 'lump', label: 'Ryczałt' },
]
export const zusVariants: { value: ZusVariant; label: string }[] = [
  { value: 'start', label: 'Ulga na start' }, { value: 'preferential', label: 'Preferencyjny ZUS' }, { value: 'full', label: 'Pełny ZUS' },
]
// Orientacyjne miesięczne kwoty do modelu na 2026 r.; user can see these assumptions below each tool.
export const zusSocial = (variant: ZusVariant, sickness: boolean) => {
  if (variant === 'start') return 0
  if (variant === 'preferential') return sickness ? 456.18 : 420.86
  return sickness ? 1926.76 : 1788.29
}
export const money = (value: number) => new Intl.NumberFormat('pl-PL', { style: 'currency', currency: 'PLN', maximumFractionDigits: 0 }).format(Math.max(0, value))
export function progressiveTax(income: number) { return Math.max(0, income <= 10000 ? income * 0.12 - 300 : 900 + (income - 10000) * 0.32) }
export function calcB2b(invoice: number, costs: number, form: TaxForm, rate: number, zus: ZusVariant, sickness: boolean) {
  const social = zusSocial(zus, sickness)
  const profit = Math.max(0, invoice - costs - social)
  const annualRevenue = invoice * 12
  const health = form === 'scale' ? Math.max(432.54, profit * 0.09) : form === 'linear' ? Math.max(432.54, profit * 0.049) : annualRevenue <= 60000 ? 498.35 : annualRevenue <= 300000 ? 830.58 : 1495.04
  const taxBase = form === 'lump' ? Math.max(0, invoice - social) : Math.max(0, profit - (form === 'linear' ? Math.min(health, 12000 / 12) : 0))
  const tax = form === 'scale' ? progressiveTax(taxBase) : form === 'linear' ? taxBase * 0.19 : Math.max(0, invoice - social) * rate / 100
  return { net: Math.max(0, invoice - costs - social - health - tax), social, health, tax, costs, invoice }
}
export function calcUop(gross: number, under26: boolean, elevatedKup: boolean, ppk: boolean) {
  const pension = gross * 0.0976; const disability = gross * 0.015; const sickness = gross * 0.0245
  const social = pension + disability + sickness
  const health = (gross - social) * 0.09
  const kup = elevatedKup ? 300 : 250
  const taxBase = Math.max(0, Math.floor(gross - social - kup))
  const pit = under26 ? 0 : Math.max(0, Math.round(progressiveTax(taxBase)))
  const ppkEmployee = ppk ? gross * 0.02 : 0
  const employerCost = gross + gross * 0.0976 + gross * 0.065 + gross * 0.0167 + gross * 0.0245 + gross * 0.001 + (ppk ? gross * 0.015 : 0)
  return { net: Math.max(0, gross - social - health - pit - ppkEmployee), social, health, pit, ppkEmployee, employerCost }
}
