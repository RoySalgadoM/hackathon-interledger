<template>
  <div class="flex-1 overflow-y-auto grid gap-2">
    <div class="col-span-3 flex flex-col">
      <div class="text-2xl font-bold">
        <slot name="title"></slot>
      </div>
      <div class="text-sm text-gray-500">
        <slot name="description"></slot>
      </div>
    </div>
    <div class="col-span-9 bg-red-500">
      <slot name="tr-content"></slot>
    </div>
    <div class="h-full w-full col-span-12 bg-amber-100">
      <slot></slot>
    </div>
  </div>
</template>

<script setup></script>

<style></style>
