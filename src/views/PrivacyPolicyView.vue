<script setup lang="ts">
import { ArrowLeft } from '@lucide/vue'
import { RouterLink } from 'vue-router'
import { siteName, siteUrl, usePageSeo } from '@/seo/usePageSeo'

usePageSeo('privacy', {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  name: 'Polityka prywatności',
  description: 'Informacje o danych technicznych, kalkulatorach, PWA, plikach cookie i prywatności w serwisie PracaNaRękę.',
  url: `${siteUrl}/polityka-prywatnosci`,
  inLanguage: 'pl-PL',
  isPartOf: { '@type': 'WebSite', name: siteName, url: siteUrl },
})
</script>

<template>
  <article class="mx-auto max-w-4xl px-5 py-8 sm:py-12 lg:px-8">
    <RouterLink to="/" class="mb-8 inline-flex items-center gap-2 text-sm font-medium text-[#66736b] hover:text-[#19251f]">
      <ArrowLeft class="size-4" aria-hidden="true" /> Strona główna
    </RouterLink>

    <header class="border-b border-[#e1e7e2] pb-8">
      <p class="text-sm font-semibold text-[#25815c]">{{ siteName }}</p>
      <h1 class="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">Polityka prywatności</h1>
      <p class="mt-3 text-sm text-[#66736b]">Data obowiązywania: <time datetime="2026-09-28">28 września 2026 r.</time></p>
    </header>

    <div class="divide-y divide-[#e1e7e2]">
      <section class="py-7">
        <h2 class="text-xl font-bold">1. Informacje ogólne i administrator</h2>
        <p class="mt-3 text-sm leading-7 text-[#66736b]">Polityka opisuje zasady prywatności na stronie <a :href="siteUrl" class="text-[#17613f] underline underline-offset-4">{{ siteUrl }}</a>. Administratorem danych związanych z korzystaniem z serwisu jest podmiot prowadzący PracaNaRękę. W sprawach dotyczących prywatności można napisać na <a href="mailto:kontakt@zgrana.pl" class="font-medium text-[#17613f] underline underline-offset-4">kontakt@zgrana.pl</a>.</p>
      </section>

      <section class="py-7">
        <h2 class="text-xl font-bold">2. Dane wpisywane do kalkulatorów</h2>
        <p class="mt-3 text-sm leading-7 text-[#66736b]">Kwoty wynagrodzeń, koszty, wybory podatkowe i pozostałe wartości wprowadzone do kalkulatorów są obliczane w przeglądarce. Serwis nie wysyła ich do administratora i nie zapisuje ich na serwerze ani w pamięci lokalnej przeglądarki. Po odświeżeniu lub zamknięciu strony wpisane wartości nie są zachowywane.</p>
      </section>

      <section class="py-7">
        <h2 class="text-xl font-bold">3. Dane techniczne i cele ich wykorzystania</h2>
        <p class="mt-3 text-sm leading-7 text-[#66736b]">Podczas wyświetlania strony dostawca hostingu i infrastruktury może przetwarzać typowe dane techniczne połączenia, na przykład adres IP, datę i godzinę żądania, adres odwiedzanej strony oraz informacje o przeglądarce. Dane te mogą być wykorzystywane do dostarczenia strony, zapewnienia bezpieczeństwa i diagnozowania błędów.</p>
        <p class="mt-3 text-sm leading-7 text-[#66736b]">Serwis nie korzysta obecnie z narzędzi analitycznych ani reklamowych i nie tworzy profili użytkowników.</p>
      </section>

      <section class="py-7">
        <h2 class="text-xl font-bold">4. Kontakt e-mail</h2>
        <p class="mt-3 text-sm leading-7 text-[#66736b]">Jeśli napiszesz na adres kontaktowy, administrator otrzyma adres e-mail oraz informacje zawarte w wiadomości. Dane będą wykorzystywane do udzielenia odpowiedzi i obsługi sprawy, a następnie mogą być przechowywane przez czas potrzebny do ustalenia, dochodzenia lub obrony ewentualnych roszczeń. Podanie tych danych jest dobrowolne, ale bez nich administrator może nie móc odpowiedzieć.</p>
      </section>

      <section class="py-7">
        <h2 class="text-xl font-bold">5. PWA i pamięć urządzenia</h2>
        <p class="mt-3 text-sm leading-7 text-[#66736b]">Po zainstalowaniu aplikacji PWA przeglądarka może przechowywać na urządzeniu pliki aplikacji, takie jak ikony i zasoby potrzebne do jej działania. Są one obsługiwane przez mechanizmy przeglądarki i nie zawierają wpisanych do kalkulatorów kwot. Możesz usunąć te pliki, odinstalowując aplikację lub czyszcząc dane strony w ustawieniach przeglądarki.</p>
      </section>

      <section class="py-7">
        <h2 class="text-xl font-bold">6. Pliki cookie i zewnętrzne zasoby</h2>
        <p class="mt-3 text-sm leading-7 text-[#66736b]">Serwis nie ustawia własnych plików cookie do analityki ani reklamy. Dostawcy hostingu lub infrastruktury mogą stosować pliki techniczne potrzebne do bezpieczeństwa i prawidłowego dostarczania strony.</p>
        <p class="mt-3 text-sm leading-7 text-[#66736b]">Strona pobiera kroje pisma Google Fonts. W związku z takim żądaniem przeglądarka łączy się z serwerami Google; Google może przetwarzać dane żądania zgodnie ze swoją <a href="https://policies.google.com/privacy" target="_blank" rel="noreferrer" class="text-[#17613f] underline underline-offset-4">polityką prywatności</a>. Szczegóły działania usługi opisuje <a href="https://developers.google.com/fonts/docs/technical_considerations" target="_blank" rel="noreferrer" class="text-[#17613f] underline underline-offset-4">dokumentacja Google Fonts</a>.</p>
      </section>

      <section class="py-7">
        <h2 class="text-xl font-bold">7. Odbiorcy danych i okres przechowywania</h2>
        <p class="mt-3 text-sm leading-7 text-[#66736b]">Odbiorcami danych technicznych mogą być dostawcy hostingu i infrastruktury, a w przypadku pobierania fontów — Google. Dane są przechowywane przez okres niezbędny do realizacji wskazanych celów, zgodnie z ustawieniami dostawców i obowiązującymi przepisami. Administrator nie sprzedaje danych użytkowników.</p>
      </section>

      <section class="py-7">
        <h2 class="text-xl font-bold">8. Prawa związane z danymi osobowymi</h2>
        <p class="mt-3 text-sm leading-7 text-[#66736b]">W zakresie przewidzianym przez RODO możesz zwrócić się o dostęp do danych, ich sprostowanie, usunięcie lub ograniczenie przetwarzania, a także wnieść sprzeciw. Gdy przetwarzanie odbywa się na podstawie zgody, możesz ją wycofać. Masz również prawo złożyć skargę do Prezesa Urzędu Ochrony Danych Osobowych. Wnioski można kierować na <a href="mailto:kontakt@zgrana.pl" class="font-medium text-[#17613f] underline underline-offset-4">kontakt@zgrana.pl</a>. Szczegóły praw opisuje <a href="https://uodo.gov.pl/pl/493/2254" target="_blank" rel="noreferrer" class="text-[#17613f] underline underline-offset-4">Urząd Ochrony Danych Osobowych</a>.</p>
      </section>

      <section class="py-7">
        <h2 class="text-xl font-bold">9. Bezpieczeństwo i zmiany polityki</h2>
        <p class="mt-3 text-sm leading-7 text-[#66736b]">Połączenie z serwisem jest szyfrowane za pomocą HTTPS. Polityka może być aktualizowana, gdy zmieni się sposób działania strony, wykorzystywane usługi lub przepisy. Aktualna wersja jest publikowana pod adresem <a :href="`${siteUrl}/polityka-prywatnosci`" class="break-all text-[#17613f] underline underline-offset-4">{{ siteUrl }}/polityka-prywatnosci</a>.</p>
      </section>
    </div>
  </article>
</template>
