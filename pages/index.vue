<template>
  <div class="max-w-4xl mx-auto px-6 py-12">
    <!-- Welcome Section -->
    <div class="text-center mb-12">
      <h1 class="text-4xl font-bold mb-4">
        Welcome to Documentation Platform
      </h1>
      <p class="text-lg text-gray-600 max-w-2xl mx-auto">
        A modern platform for creating and managing technical documentation, tutorials, and API references.
      </p>
    </div>

    <!-- Quick Links -->
    <div class="grid md:grid-cols-3 gap-8">
      <div class="text-center p-6 bg-white rounded-lg shadow-sm border">
        <h3 class="text-xl font-semibold mb-3">API Documentation</h3>
        <p class="text-gray-600 mb-4">
          Explore our comprehensive API documentation with interactive examples.
        </p>
        <NuxtLink to="/api" class="inline-block px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
          View API Docs
        </NuxtLink>
      </div>

      <div class="text-center p-6 bg-white rounded-lg shadow-sm border">
        <h3 class="text-xl font-semibold mb-3">Tutorials</h3>
        <p class="text-gray-600 mb-4">
          Step-by-step guides to help you get started and learn new features.
        </p>
        <NuxtLink to="/tutorials" class="inline-block px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
          Browse Tutorials
        </NuxtLink>
      </div>

      <div class="text-center p-6 bg-white rounded-lg shadow-sm border">
        <h3 class="text-xl font-semibold mb-3">Blog</h3>
        <p class="text-gray-600 mb-4">
          Latest updates, tips, and insights from our development team.
        </p>
        <NuxtLink to="/blog" class="inline-block px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
          Read Blog
        </NuxtLink>
      </div>
    </div>
  </div>
</template>
