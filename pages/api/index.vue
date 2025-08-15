<template>
  <div class="min-h-screen">
    <!-- API Documentation Header -->
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div class="text-center mb-8">
        <h1 class="text-4xl font-bold text-gray-900 mb-4">
          API Documentation
        </h1>
      </div>
    </div>

    <!-- Swagger UI Component -->
    <div class="w-full">
      <SwaggerUI spec-url="/api/api-specification.json" />
    </div>
  </div>
</template>

<script setup lang="ts">
import SwaggerUI from '../../components/SwaggerUI.vue';
</script>
