<template>
  <div class="h-full flex flex-col gap-2">
    <div class="flex flex-col flex-shrink-0">
      <div class="text-2xl font-bold">
        <slot name="title"></slot>
      </div>
      <div class="text-sm text-gray-500">
        <slot name="description"></slot>
      </div>
    </div>
    <div class="bg-red-500 flex-shrink-0">
      <slot name="tr-content"></slot>
    </div>
    <div class="flex-1 min-h-0 w-full bg-amber-100">
      <slot></slot>
    </div>
  </div>
</template>

<script setup></script>

<style></style>
