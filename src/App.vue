<script setup lang="ts">
import { useHead } from '@unhead/vue'
import { RouterLink, RouterView } from 'vue-router'

useHead({ htmlAttrs: { lang: 'pl' } })
</script>

<template>
  <div class="min-h-screen bg-[#f7f8f6] text-[#19251f]">
    <header class="border-b border-[#e1e7e2] bg-white">
      <div class="mx-auto flex max-w-7xl items-center justify-between px-5 py-4">
        <RouterLink to="/" class="flex items-center gap-3 font-bold tracking-tight">
          <span class="grid size-10 place-items-center rounded-xl bg-[#174b39] text-lg text-white">P</span>
          <span>Praca<span class="text-[#25815c]">NaRękę</span></span>
        </RouterLink>
        <nav class="hidden gap-7 text-sm font-medium text-[#59675f] sm:flex" aria-label="Nawigacja główna">
          <RouterLink to="/ile-na-reke-uop" class="hover:text-[#174b39]">UoP</RouterLink>
          <RouterLink to="/ile-na-reke-b2b" class="hover:text-[#174b39]">B2B</RouterLink>
          <RouterLink to="/b2b-vs-uop" class="hover:text-[#174b39]">B2B czy UoP?</RouterLink>
        </nav>
      </div>
    </header>
    <main><RouterView /></main>
    <footer class="mt-16 border-t border-[#e1e7e2] bg-white">
      <div class="mx-auto flex max-w-7xl flex-col gap-3 px-5 py-8 text-sm text-[#66736b] sm:flex-row sm:items-center sm:justify-between">
        <span>PracaNaRękę — bezpłatne kalkulatory wynagrodzeń</span>
        <span>Wyniki mają charakter szacunkowy i nie stanowią porady podatkowej.</span>
      </div>
    </footer>
  </div>
</template>
