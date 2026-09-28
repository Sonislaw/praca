<script setup lang="ts">
import { computed, ref } from 'vue'
import { ArrowLeft, RotateCcw, Sparkles } from '@lucide/vue'
import { RouterLink } from 'vue-router'
import FaqSection from '@/components/FaqSection.vue'
import { calcB2b, calcUop, money, taxForms, zusVariants, type TaxForm, type ZusVariant } from '@/lib/calculations'
import { softwareSchema, usePageSeo } from '@/seo/usePageSeo'

const props = defineProps<{ mode: 'uop' | 'b2b' | 'comparison' }>()
const gross = ref(props.mode === 'comparison' ? 15000 : 12000)
const invoice = ref(props.mode === 'comparison' ? 18000 : 20000)
const costs = ref(1000)
const form = ref<TaxForm>('linear')
const rate = ref(12)
const zus = ref<ZusVariant>('full')
const sickness = ref(false)
const under26 = ref(false)
const elevatedKup = ref(false)
const ppk = ref(false)
const faqsByMode = {
  uop: [
    { question: 'Jak obliczyć wynagrodzenie netto z umowy o pracę?', answer: 'Od kwoty brutto kalkulator odejmuje składki społeczne finansowane przez pracownika, składkę zdrowotną oraz zaliczkę PIT. Wynik zależy m.in. od wieku, kosztów uzyskania przychodu, PIT-2 i PPK.' },
    { question: 'Co oznacza koszt pracodawcy?', answer: 'To wynagrodzenie brutto powiększone o składki finansowane przez pracodawcę. W kalkulatorze jest to szacunek bez szczególnych zwolnień i indywidualnej stopy wypadkowej.' },
    { question: 'Czy kalkulator uwzględnia ulgę dla młodych?', answer: 'Tak. Zaznaczenie wieku poniżej 26 lat zeruje miesięczną zaliczkę PIT w uproszczonym wyliczeniu. Limit ulgi i inne przychody mogą mieć wpływ na rozliczenie roczne.' },
    { question: 'Dlaczego wynik może różnić się od wypłaty?', answer: 'Kalkulator nie uwzględnia wszystkich sytuacji, m.in. kilku pracodawców, PPK po stronie pracodawcy, ulg indywidualnych, absencji i zmian w trakcie roku. Traktuj wynik jako orientacyjny.' },
  ],
  b2b: [
    { question: 'Ile zostaje na rękę z faktury B2B?', answer: 'To zależy od kosztów działalności, formy opodatkowania i składek. Kalkulator odejmuje od przychodu koszty, ZUS, składkę zdrowotną i szacowany podatek.' },
    { question: 'Czym różni się skala od podatku liniowego i ryczałtu?', answer: 'Skala stosuje progi podatkowe, liniowy ma stałą stawkę 19%, a ryczałt liczy podatek od przychodu według wybranej stawki. Ryczałt nie odlicza kosztów uzyskania przychodu.' },
    { question: 'Jak działa ulga na start?', answer: 'Ulga na start oznacza zwolnienie z obowiązkowych składek społecznych przez określony czas, ale składka zdrowotna nadal jest należna. Warunki ulgi trzeba sprawdzić dla swojej sytuacji.' },
    { question: 'Czy kwota z faktury zawiera VAT?', answer: 'Nie. Pole faktury oznacza kwotę netto, bez VAT. Kalkulator nie traktuje VAT jako przychodu ani kosztu.' },
  ],
  comparison: [
    { question: 'Czy faktura B2B jest porównywalna z pensją brutto?', answer: 'Nie bezpośrednio. Z faktury trzeba pokryć koszty działalności, podatki i składki, a współpraca B2B zwykle nie zapewnia płatnego urlopu ani takich samych świadczeń pracowniczych.' },
    { question: 'Jak obliczana jest różnica między ofertami?', answer: 'Kalkulator zestawia szacowane miesięczne netto z UoP i B2B, a następnie mnoży różnicę przez 12. Wynik nie uwzględnia wartości urlopu, benefitów, księgowości ani ryzyka przerw w zleceniach.' },
    { question: 'Co oznacza dodatkowy dochód w ratach i dniach wolnego?', answer: 'To proste przeliczenia różnicy rocznej: liczba rat po 1000 zł oraz liczba dni wycenionych według przykładowej stawki. Nie są to gwarantowane oszczędności ani wymiar urlopu.' },
    { question: 'Czy można zmienić formę opodatkowania?', answer: 'Tak, wybierz skalę, podatek liniowy lub ryczałt. Dostępność oraz opłacalność danej formy zależy od rodzaju działalności i indywidualnej sytuacji podatnika.' },
  ],
}
const faq = computed(() => faqsByMode[props.mode])
const title = computed(() => props.mode === 'uop' ? 'Kalkulator wynagrodzenia UoP' : props.mode === 'b2b' ? 'Kalkulator wynagrodzenia B2B' : 'B2B czy UoP — porównaj oferty')
const description = computed(() => props.mode === 'uop' ? 'Oblicz, ile wyniesie wypłata netto z umowy o pracę. Zobacz składki, podatek, koszt pracodawcy i podsumowanie roczne.' : props.mode === 'b2b' ? 'Sprawdź, ile zostaje na rękę z faktury B2B po kosztach, składkach i podatku.' : 'Porównaj ofertę UoP i B2B po składkach, podatku oraz kosztach działalności.')
const path = computed(() => props.mode === 'uop' ? '/ile-na-reke-uop' : props.mode === 'b2b' ? '/ile-na-reke-b2b' : '/b2b-vs-uop')
const seoKey = computed(() => props.mode === 'uop' ? 'uop' : props.mode === 'b2b' ? 'b2b' : 'comparison')
const uopResult = computed(() => calcUop(gross.value, under26.value, elevatedKup.value, ppk.value))
const b2bResult = computed(() => calcB2b(invoice.value, costs.value, form.value, rate.value, zus.value, sickness.value))
const alternateResults = computed(() => taxForms.map((item) => ({ label: item.label, value: calcB2b(invoice.value, costs.value, item.value, rate.value, zus.value, sickness.value).net })))
const compareUop = computed(() => calcUop(gross.value, under26.value, elevatedKup.value, ppk.value))
const diff = computed(() => b2bResult.value.net - compareUop.value.net)
const reset = () => { gross.value = props.mode === 'comparison' ? 15000 : 12000; invoice.value = props.mode === 'comparison' ? 18000 : 20000; costs.value = 1000; form.value = 'linear'; rate.value = 12; zus.value = 'full'; sickness.value = under26.value = elevatedKup.value = ppk.value = false }

usePageSeo(seoKey.value, softwareSchema(title.value, description.value, path.value, faq.value))
</script>

<template>
  <div class="mx-auto max-w-7xl px-5 py-8 sm:py-12 lg:px-8">
    <RouterLink to="/" class="inline-flex items-center gap-2 text-sm font-medium text-[#66736b] hover:text-[#17613f]"><ArrowLeft class="size-4"/> Wszystkie kalkulatory</RouterLink>
    <div class="mt-7 max-w-3xl"><p class="text-sm font-bold uppercase tracking-[.16em] text-[#25815c]">{{ mode === 'comparison' ? 'Sprawdź, która oferta bardziej się opłaca' : 'Przelicz wynagrodzenie' }}</p><h1 class="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">{{ title }}</h1><p class="mt-3 text-base leading-7 text-[#66736b]">{{ description }}</p></div>
    <div class="mt-9 grid items-start gap-6 lg:grid-cols-[minmax(0,1.1fr)_minmax(340px,.9fr)]">
      <section class="rounded-2xl border border-[#e1e7e2] bg-white p-5 shadow-sm sm:p-7" aria-labelledby="calculator-form-heading">
        <div class="flex items-center justify-between gap-3"><div><h2 id="calculator-form-heading" class="text-xl font-bold">Dane do obliczeń</h2><p class="mt-1 text-sm text-[#66736b]">Zmień wartości, aby zobaczyć aktualny szacunek.</p></div><button class="grid size-10 shrink-0 place-items-center rounded-lg border border-[#e1e7e2] text-[#66736b] hover:bg-[#f7f8f6]" aria-label="Przywróć wartości początkowe" @click="reset"><RotateCcw class="size-4"/></button></div>
        <div class="mt-7 space-y-5">
          <label v-if="mode === 'uop' || mode === 'comparison'" class="block"><span class="text-sm font-semibold">{{ mode === 'comparison' ? 'Brutto UoP miesięcznie' : 'Wynagrodzenie brutto miesięcznie' }}</span><div class="relative mt-2"><input v-model.number="gross" type="number" min="0" step="100" class="h-12 w-full rounded-lg border border-[#d9e1db] bg-white px-4 pr-14 text-lg font-semibold outline-none focus:border-[#25815c] focus:ring-2 focus:ring-[#25815c]/15"><span class="absolute inset-y-0 right-4 flex items-center text-sm text-[#66736b]">zł</span></div></label>
          <label v-if="mode === 'b2b' || mode === 'comparison'" class="block"><span class="text-sm font-semibold">{{ mode === 'comparison' ? 'Faktura B2B netto / miesiąc' : 'Miesięczna faktura netto' }}</span><div class="relative mt-2"><input v-model.number="invoice" type="number" min="0" step="100" class="h-12 w-full rounded-lg border border-[#d9e1db] bg-white px-4 pr-14 text-lg font-semibold outline-none focus:border-[#25815c] focus:ring-2 focus:ring-[#25815c]/15"><span class="absolute inset-y-0 right-4 flex items-center text-sm text-[#66736b]">zł</span></div></label>
          <template v-if="mode !== 'uop'">
            <label class="block"><span class="text-sm font-semibold">Forma opodatkowania</span><select v-model="form" class="mt-2 h-12 w-full rounded-lg border border-[#d9e1db] bg-white px-3 outline-none focus:border-[#25815c]"> <option v-for="item in taxForms" :key="item.value" :value="item.value">{{ item.label }}</option></select></label>
            <label v-if="form === 'lump'" class="block"><span class="text-sm font-semibold">Stawka ryczałtu</span><select v-model.number="rate" class="mt-2 h-12 w-full rounded-lg border border-[#d9e1db] bg-white px-3 outline-none focus:border-[#25815c]"><option :value="8.5">8,5%</option><option :value="12">12%</option><option :value="15">15%</option><option :value="17">17%</option></select></label>
            <label class="block"><span class="text-sm font-semibold">Koszty działalności miesięcznie</span><div class="relative mt-2"><input v-model.number="costs" type="number" min="0" step="100" class="h-12 w-full rounded-lg border border-[#d9e1db] bg-white px-4 pr-14 outline-none focus:border-[#25815c]"><span class="absolute inset-y-0 right-4 flex items-center text-sm text-[#66736b]">zł</span></div><span class="mt-1 block text-xs text-[#78857c]">Ryczałt nie odlicza kosztów od podstawy podatku.</span></label>
            <label class="block"><span class="text-sm font-semibold">Składki społeczne ZUS</span><select v-model="zus" class="mt-2 h-12 w-full rounded-lg border border-[#d9e1db] bg-white px-3 outline-none focus:border-[#25815c]"><option v-for="item in zusVariants" :key="item.value" :value="item.value">{{ item.label }}</option></select></label>
            <label class="flex cursor-pointer items-start gap-3 rounded-lg border border-[#e1e7e2] p-3"><input v-model="sickness" type="checkbox" class="mt-1 size-4 accent-[#17613f]"><span><span class="block text-sm font-semibold">Opłacam dobrowolne chorobowe</span><span class="mt-1 block text-xs leading-5 text-[#78857c]">Uwzględnij składkę chorobową przy preferencyjnym lub pełnym ZUS.</span></span></label>
          </template>
          <template v-if="mode === 'uop' || mode === 'comparison'">
            <p v-if="mode === 'comparison'" class="border-t border-[#e1e7e2] pt-5 text-sm font-bold">Ustawienia umowy o pracę</p>
            <label class="flex cursor-pointer items-start gap-3 rounded-lg border border-[#e1e7e2] p-3"><input v-model="under26" type="checkbox" class="mt-1 size-4 accent-[#17613f]"><span class="text-sm font-semibold">Mam mniej niż 26 lat (ulga dla młodych)</span></label>
            <label class="flex cursor-pointer items-start gap-3 rounded-lg border border-[#e1e7e2] p-3"><input v-model="elevatedKup" type="checkbox" class="mt-1 size-4 accent-[#17613f]"><span class="text-sm font-semibold">Podwyższone koszty uzyskania przychodu</span></label>
            <label class="flex cursor-pointer items-start gap-3 rounded-lg border border-[#e1e7e2] p-3"><input v-model="ppk" type="checkbox" class="mt-1 size-4 accent-[#17613f]"><span class="text-sm font-semibold">Uczestniczę w PPK (wpłata pracownika 2%)</span></label>
          </template>
        </div>
      </section>
      <section class="rounded-2xl bg-[#123b2d] p-5 text-white shadow-lg sm:p-7" aria-live="polite" aria-label="Wynik kalkulatora">
        <template v-if="mode === 'uop'"><p class="text-sm font-medium text-emerald-100">Szacunkowe wynagrodzenie netto</p><p class="mt-2 text-4xl font-bold tracking-tight sm:text-5xl">{{ money(uopResult.net) }}</p><p class="mt-1 text-sm text-white/65">na rękę miesięcznie</p><div class="mt-7 space-y-3 border-t border-white/15 pt-5 text-sm"><div class="flex justify-between"><span class="text-white/75">Brutto</span><strong>{{ money(gross) }}</strong></div><div class="flex justify-between"><span class="text-white/75">Składki społeczne</span><span>− {{ money(uopResult.social) }}</span></div><div class="flex justify-between"><span class="text-white/75">Składka zdrowotna</span><span>− {{ money(uopResult.health) }}</span></div><div class="flex justify-between"><span class="text-white/75">Zaliczka PIT</span><span>− {{ money(uopResult.pit) }}</span></div><div v-if="ppk" class="flex justify-between"><span class="text-white/75">Wpłata pracownika do PPK</span><span>− {{ money(uopResult.ppkEmployee) }}</span></div><div class="flex justify-between border-t border-white/15 pt-3 font-bold"><span>Na rękę rocznie</span><span>{{ money(uopResult.net * 12) }}</span></div><div class="flex justify-between rounded-lg bg-white/10 p-3"><span>Koszt pracodawcy / miesiąc</span><strong>{{ money(uopResult.employerCost) }}</strong></div></div></template>
        <template v-else-if="mode === 'b2b'"><p class="text-sm font-medium text-emerald-100">Szacunkowo zostaje</p><p class="mt-2 text-4xl font-bold tracking-tight sm:text-5xl">{{ money(b2bResult.net) }}</p><p class="mt-1 text-sm text-white/65">po kosztach, składkach i podatku</p><div class="mt-7 space-y-3 border-t border-white/15 pt-5 text-sm"><div class="flex justify-between"><span class="text-white/75">Przychód netto</span><strong>{{ money(invoice) }}</strong></div><div class="flex justify-between"><span class="text-white/75">Koszty działalności</span><span>− {{ money(costs) }}</span></div><div class="flex justify-between"><span class="text-white/75">Składki społeczne</span><span>− {{ money(b2bResult.social) }}</span></div><div class="flex justify-between"><span class="text-white/75">Składka zdrowotna</span><span>− {{ money(b2bResult.health) }}</span></div><div class="flex justify-between"><span class="text-white/75">Szacowany podatek</span><span>− {{ money(b2bResult.tax) }}</span></div><div class="flex justify-between border-t border-white/15 pt-3 font-bold"><span>Na rękę rocznie</span><span>{{ money(b2bResult.net * 12) }}</span></div></div><div class="mt-6 border-t border-white/15 pt-4"><p class="text-sm font-semibold">Zobacz wynik na innych formach</p><div class="mt-3 grid grid-cols-3 gap-2"><div v-for="item in alternateResults" :key="item.label" class="rounded-lg bg-white/10 p-3"><span class="block text-xs leading-4 text-white/65">{{ item.label }}</span><strong class="mt-1 block text-sm">{{ money(item.value) }}</strong></div></div></div></template>
        <template v-else><p class="text-sm font-medium text-emerald-100">Porównanie miesięcznego netto</p><div class="mt-5 grid grid-cols-2 gap-3"><div class="rounded-xl bg-white/10 p-4"><p class="text-sm text-white/70">UoP</p><strong class="mt-1 block text-2xl">{{ money(compareUop.net) }}</strong></div><div class="rounded-xl bg-[#a9e4bd] p-4 text-[#123b2d]"><p class="text-sm opacity-75">B2B</p><strong class="mt-1 block text-2xl">{{ money(b2bResult.net) }}</strong></div></div><div class="mt-5 rounded-xl border border-white/15 p-4"><p class="text-sm text-white/70">Różnica miesięczna na B2B</p><strong class="mt-1 block text-3xl">{{ diff >= 0 ? '+' : '−' }}{{ money(Math.abs(diff)) }}</strong><p class="mt-1 text-sm text-white/70">{{ diff >= 0 ? 'więcej' : 'mniej' }} · {{ diff >= 0 ? '+' : '−' }}{{ money(Math.abs(diff) * 12) }} rocznie</p></div><div class="mt-4 rounded-xl bg-white/10 p-4"><div class="flex items-center gap-2 font-semibold"><Sparkles class="size-4 text-emerald-200"/> Co może sfinansować różnica roczna?</div><ul class="mt-3 space-y-2 text-sm text-white/85"><li>• {{ Math.floor(Math.max(0, diff * 12) / 1000) }} rat po 1 000 zł</li><li>• {{ Math.floor(Math.max(0, diff * 12) / 800) }} dni wycenionych po 800 zł</li><li>• {{ Math.floor(Math.max(0, diff * 12) / 8000) }} wyjazdów z budżetem 8 000 zł</li></ul></div><p class="mt-4 text-xs leading-5 text-white/55">Porównanie nie wycenia płatnego urlopu, benefitów, księgowości ani przerw w pracy. Zestawiaj cały pakiet, nie tylko wypłatę.</p></template>
        <div class="mt-6 border-t border-white/15 pt-4 text-xs leading-5 text-white/60"><strong class="text-white/80">Założenia:</strong> kalkulacja uproszczona na 2026 r.; zakłada PIT-2 przy UoP oraz brak dodatkowych ulg i innych źródeł dochodu. ZUS, próg podatkowy, stawka wypadkowa i składka zdrowotna zależą od Twojej sytuacji. Ryczałt liczy podatek od przychodu.</div>
      </section>
    </div>
    <section class="mt-9 rounded-2xl border border-[#e1e7e2] bg-white p-5 sm:p-7"><h2 class="text-xl font-bold">Jak czytać wynik?</h2><p class="mt-3 max-w-4xl text-sm leading-7 text-[#66736b]">To przybliżenie, które pomaga zaplanować budżet i porównać scenariusze. Nie uwzględnia każdej ulgi, limitu rocznego, zbiegu tytułów ubezpieczenia, dodatkowych składników pensji ani zmian przepisów w trakcie roku. Przy decyzji o formie opodatkowania sprawdź aktualne warunki i skonsultuj indywidualne rozliczenie.</p></section>
    <FaqSection :items="faq" />
    <section class="mt-10 rounded-2xl bg-[#e9f4ec] p-6 sm:p-8"><h2 class="text-xl font-bold">Sprawdź też pozostałe narzędzia</h2><div class="mt-4 flex flex-wrap gap-3"><RouterLink v-if="mode !== 'uop'" to="/ile-na-reke-uop" class="rounded-lg bg-white px-4 py-2.5 text-sm font-semibold text-[#17613f]">Kalkulator UoP →</RouterLink><RouterLink v-if="mode !== 'b2b'" to="/ile-na-reke-b2b" class="rounded-lg bg-white px-4 py-2.5 text-sm font-semibold text-[#17613f]">Kalkulator B2B →</RouterLink><RouterLink v-if="mode !== 'comparison'" to="/b2b-vs-uop" class="rounded-lg bg-white px-4 py-2.5 text-sm font-semibold text-[#17613f]">Porównaj B2B i UoP →</RouterLink></div></section>
  </div>
</template>
