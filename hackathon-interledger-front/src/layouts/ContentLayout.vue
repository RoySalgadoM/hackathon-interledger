<template>
  <div class="h-full flex flex-col gap-2">
    <div class="flex gap-2 items-center">
      <div class="flex flex-col gap-2">
        <div class="text-2xl font-bold">
          <slot name="title"></slot>
        </div>
        <div class="text-sm text-gray-500">
          <slot name="description"></slot>
        </div>
      </div>

      <div class="w-full flex items-center">
        <slot name="tr-content"></slot>
      </div>
    </div>

    <div class="flex-1 min-h-0 w-full">
      <slot></slot>
    </div>
  </div>
</template>

<script setup></script>

<style></style>
