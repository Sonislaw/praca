<script setup lang="ts">
import { ArrowUpRight, BriefcaseBusiness, Calculator, Scale, Wallet } from '@lucide/vue'
import { RouterLink } from 'vue-router'
import { siteName, siteUrl, usePageSeo } from '@/seo/usePageSeo'

const tools = [
  { to: '/ile-na-reke-uop', icon: BriefcaseBusiness, tag: 'Umowa o pracę', title: 'Ile na rękę z UoP?', text: 'Przelicz brutto na netto, zobacz składki, roczne wynagrodzenie i koszt pracodawcy.' },
  { to: '/ile-na-reke-b2b', icon: Wallet, tag: 'Działalność gospodarcza', title: 'Ile zostaje z faktury B2B?', text: 'Uwzględnij podatek, koszty firmy i wariant ZUS. Porównaj dostępne formy opodatkowania.' },
  { to: '/b2b-vs-uop', icon: Scale, tag: 'Porównanie ofert', title: 'B2B czy UoP — co się opłaca?', text: 'Zestaw dwie propozycje i zobacz różnicę w miesięcznym oraz rocznym dochodzie.' },
]
usePageSeo('home', { '@context': 'https://schema.org', '@graph': [
  { '@type': 'Organization', '@id': `${siteUrl}/#organization`, name: siteName, url: siteUrl },
  { '@type': 'WebSite', '@id': `${siteUrl}/#website`, name: siteName, url: siteUrl, inLanguage: 'pl-PL', publisher: { '@id': `${siteUrl}/#organization` } },
] })
</script>

<template>
  <div>
    <section class="overflow-hidden bg-[#123b2d] text-white">
      <div class="mx-auto grid max-w-7xl items-center gap-12 px-5 py-16 sm:py-24 lg:grid-cols-[1.05fr_.95fr] lg:px-8">
        <div>
          <p class="inline-flex items-center gap-2 rounded-full border border-white/20 px-3 py-1.5 text-sm text-emerald-100"><Calculator class="size-4"/> Kalkulatory wynagrodzeń</p>
          <h1 class="mt-6 max-w-2xl text-4xl font-bold leading-tight tracking-tight sm:text-6xl">Zobacz, ile naprawdę dostaniesz <span class="text-[#9fe1b8]">na rękę</span></h1>
          <p class="mt-5 max-w-xl text-lg leading-8 text-white/75">Przelicz wynagrodzenie UoP i B2B, poznaj składki oraz porównaj oferty pracy na konkretnych liczbach.</p>
          <RouterLink to="/b2b-vs-uop" class="mt-8 inline-flex items-center gap-2 rounded-lg bg-[#a9e4bd] px-5 py-3 font-semibold text-[#123b2d] hover:bg-white">Porównaj B2B i UoP <ArrowUpRight class="size-4"/></RouterLink>
        </div>
        <div class="rounded-3xl border border-white/15 bg-white/[.07] p-6 shadow-2xl sm:p-8">
          <p class="text-sm text-emerald-100">Twoja pensja, w prostym podziale</p>
          <div class="mt-6 flex items-end justify-between border-b border-white/15 pb-5"><div><p class="text-sm text-white/65">Kwota brutto</p><p class="mt-1 text-2xl font-semibold">12 000 zł</p></div><span class="text-white/50">UoP</span></div>
          <div class="space-y-3 py-5 text-sm"><div class="flex justify-between text-white/75"><span>Składki ZUS</span><span>− 1 645 zł</span></div><div class="flex justify-between text-white/75"><span>Składka zdrowotna</span><span>− 932 zł</span></div><div class="flex justify-between text-white/75"><span>Zaliczka PIT</span><span>− 778 zł</span></div></div>
          <div class="flex items-center justify-between rounded-2xl bg-[#a9e4bd] p-5 text-[#123b2d]"><span class="font-medium">Na rękę</span><strong class="text-3xl">sprawdź wynik</strong></div>
          <p class="mt-4 text-xs leading-5 text-white/55">Przykładowy podział wynagrodzenia. Ostateczny wynik zależy od indywidualnych ulg i ustawień.</p>
        </div>
      </div>
    </section>
    <section id="narzedzia" class="mx-auto max-w-7xl px-5 py-16 sm:py-20 lg:px-8">
      <div class="mb-8 max-w-2xl"><p class="text-sm font-bold uppercase tracking-[.16em] text-[#25815c]">Narzędzia</p><h2 class="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">Wybierz kalkulator</h2><p class="mt-3 leading-7 text-[#66736b]">Każdy kalkulator pokazuje przejrzyste rozliczenie i wyjaśnia, jakie założenia przyjęliśmy.</p></div>
      <div class="grid gap-5 md:grid-cols-3">
        <RouterLink v-for="tool in tools" :key="tool.to" :to="tool.to" class="group flex min-h-72 flex-col rounded-2xl border border-[#e1e7e2] bg-white p-6 transition hover:-translate-y-1 hover:border-[#83b99a] hover:shadow-xl">
          <div class="flex items-center justify-between"><span class="grid size-12 place-items-center rounded-xl bg-[#e9f4ec] text-[#17613f]"><component :is="tool.icon" class="size-5"/></span><ArrowUpRight class="size-5 text-[#839087] transition group-hover:text-[#17613f]"/></div>
          <p class="mt-6 text-xs font-bold uppercase tracking-wider text-[#25815c]">{{ tool.tag }}</p><h3 class="mt-2 text-xl font-bold">{{ tool.title }}</h3><p class="mt-3 flex-1 text-sm leading-6 text-[#66736b]">{{ tool.text }}</p><span class="mt-5 font-semibold text-[#17613f]">Otwórz kalkulator →</span>
        </RouterLink>
      </div>
    </section>
    <section class="border-y border-[#e1e7e2] bg-white"><div class="mx-auto grid max-w-7xl gap-8 px-5 py-14 md:grid-cols-3 lg:px-8"><article><h2 class="font-bold">Brutto a netto — jaka jest różnica?</h2><p class="mt-3 text-sm leading-6 text-[#66736b]">Kwota brutto to wynagrodzenie przed potrąceniem składek i podatku. Kwota netto trafia na konto. Na UoP znaczenie mają między innymi składki pracownika, koszty uzyskania przychodu i ulgi.</p></article><article><h2 class="font-bold">B2B i UoP porównuj całościowo</h2><p class="mt-3 text-sm leading-6 text-[#66736b]">Kwota z faktury nie jest odpowiednikiem pensji brutto. Z przychodu firmy trzeba opłacić składki, podatek i koszty działalności. Weź też pod uwagę płatny urlop i świadczenia.</p></article><article><h2 class="font-bold">Sprawdź kilka wariantów</h2><p class="mt-3 text-sm leading-6 text-[#66736b]">Zmiana formy opodatkowania, kosztów, ulg lub składek może zmienić wynik. Kalkulator daje szacunek pomocny przy planowaniu i rozmowie o ofercie.</p></article></div></section>
  </div>
</template>
