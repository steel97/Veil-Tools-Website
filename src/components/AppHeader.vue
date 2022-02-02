<template>
  <header class="w-100">
    <nav class="custom-nav-color shadow-lg">
      <div
        class="
          container
          flex flex-wrap
          justify-between
          items-center
          mx-auto
          max-w-5xl
          py-2
          mb-3
        "
      >
        <NuxtLink to="/" aria-label="Veil Tools">
          <img src="/assets/images/logo.png" width="96" alt="Veil Tools" />
        </NuxtLink>

        <ul class="hidden md:flex space-x-4 justify-right">
          <li>
            <a href="/" class="font-medium hover:text-gray-50 text-gray-300"
              >Project website</a
            >
          </li>
          <li>
            <a href="/" class="font-medium hover:text-gray-50 text-gray-300"
              >Support portal</a
            >
          </li>
          <li>
            <a href="/" class="font-medium hover:text-gray-50 text-gray-300"
              >English</a
            >
          </li>
        </ul>
      </div>
    </nav>
  </header>
</template>
