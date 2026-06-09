<template>
  <div class="page-shell">
    <SiteHeader />
    <main>
      <NuxtPage />
    </main>
    <SiteFooter />
    <div class="fixed bottom-4 right-4 z-[200000] flex flex-col items-end gap-3">
      <FloatingPhoneButton />
      <ChatWidget />
    </div>
  </div>
</template>
