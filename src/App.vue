<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import { useHead } from '@unhead/vue'
import { RouterLink, RouterView } from 'vue-router'
import { Download, Share2, X } from '@lucide/vue'

useHead({ htmlAttrs: { lang: 'pl' } })

interface InstallPromptEvent extends Event {
  prompt: () => Promise<void>
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed'; platform: string }>
}

const installPrompt = ref<InstallPromptEvent | null>(null)
const isInstalled = ref(false)
const isIos = ref(false)
const showIosInstructions = ref(false)
const canOfferInstall = computed(() => !isInstalled.value && (!!installPrompt.value || isIos.value))

const onBeforeInstallPrompt = (event: Event) => {
  event.preventDefault()
  installPrompt.value = event as InstallPromptEvent
}

const onAppInstalled = () => {
  isInstalled.value = true
  installPrompt.value = null
}

const installApp = async () => {
  if (!installPrompt.value) {
    showIosInstructions.value = !showIosInstructions.value
    return
  }

  const prompt = installPrompt.value
  await prompt.prompt()
  const choice = await prompt.userChoice
  if (choice.outcome === 'accepted') installPrompt.value = null
}

onMounted(() => {
  const standaloneNavigator = navigator as Navigator & { standalone?: boolean }
  isInstalled.value = window.matchMedia('(display-mode: standalone)').matches || standaloneNavigator.standalone === true
  isIos.value = /iphone|ipad|ipod/i.test(navigator.userAgent) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1)
  window.addEventListener('beforeinstallprompt', onBeforeInstallPrompt)
  window.addEventListener('appinstalled', onAppInstalled)
})

onBeforeUnmount(() => {
  window.removeEventListener('beforeinstallprompt', onBeforeInstallPrompt)
  window.removeEventListener('appinstalled', onAppInstalled)
})
</script>

<template>
  <div class="min-h-screen bg-[#f7f8f6] text-[#19251f]">
    <header class="border-b border-[#e1e7e2] bg-white">
      <div class="mx-auto flex max-w-7xl items-center justify-between px-5 py-4">
        <RouterLink to="/" class="flex items-center gap-3 font-bold tracking-tight">
          <img src="/favicon.svg" alt="" class="size-10 rounded-xl" />
          <span>Praca<span class="text-[#25815c]">NaRękę</span></span>
        </RouterLink>
        <div class="relative">
          <button
            v-if="canOfferInstall"
            type="button"
            class="inline-flex h-10 items-center gap-2 rounded-lg border border-[#d9e1db] px-3 text-sm font-semibold text-[#405348] transition hover:border-[#83b99a] hover:bg-[#f7f8f6]"
            aria-label="Dodaj do ekranu głównego"
            title="Dodaj do ekranu głównego"
            @click="installApp"
          >
            <Download class="size-4" aria-hidden="true" />
            <span class="hidden sm:inline">Dodaj do ekranu głównego</span>
          </button>
          <div
            v-if="showIosInstructions"
            role="status"
            class="absolute right-0 top-[calc(100%+0.5rem)] z-50 flex w-[min(20rem,calc(100vw-2rem))] items-start gap-3 rounded-xl border border-[#e1e7e2] bg-white p-4 text-sm leading-6 shadow-xl"
          >
            <p>
              W Safari wybierz <Share2 class="inline size-4 align-text-bottom" aria-hidden="true" />
              <strong>Udostępnij</strong>, a następnie <strong>Dodaj do ekranu początkowego</strong>.
            </p>
            <button
              type="button"
              class="grid size-8 shrink-0 place-items-center rounded-md text-[#66736b] hover:bg-[#f7f8f6]"
              aria-label="Zamknij instrukcję instalacji"
              @click="showIosInstructions = false"
            >
              <X class="size-4" aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>
    </header>
    <main><RouterView /></main>
    <footer class="mt-16 border-t border-[#e1e7e2] bg-white">
      <div class="mx-auto grid max-w-7xl gap-6 px-5 py-8 sm:grid-cols-2 sm:items-end lg:px-8">
        <div>
          <RouterLink to="/" class="font-bold tracking-tight">Praca<span class="text-[#25815c]">NaRękę</span></RouterLink>
          <p class="mt-2 max-w-lg text-sm leading-6 text-[#66736b]">Bezpłatne kalkulatory wynagrodzeń, które pomagają zrozumieć różnicę między kwotą brutto a tym, co trafia na konto.</p>
          <p class="mt-2 text-xs leading-5 text-[#78857c]">Wyniki mają charakter szacunkowy i nie stanowią porady podatkowej.</p>
        </div>
        <nav aria-label="Linki w stopce" class="flex flex-wrap gap-x-6 gap-y-3 text-sm sm:justify-end">
          <a href="mailto:kontakt@zgrana.pl" class="text-[#66736b] hover:text-[#19251f]">Kontakt</a>
          <RouterLink to="/polityka-prywatnosci" class="text-[#66736b] hover:text-[#19251f]">Polityka prywatności</RouterLink>
        </nav>
      </div>
      <div class="border-t border-[#e1e7e2]">
        <p class="mx-auto max-w-7xl px-5 py-4 text-xs text-[#78857c] lg:px-8">© {{ new Date().getFullYear() }} PracaNaRękę</p>
      </div>
    </footer>
  </div>
</template>
