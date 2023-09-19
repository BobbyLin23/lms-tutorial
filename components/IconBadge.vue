<script setup lang="ts">
import { cva } from 'class-variance-authority'
import { twMerge } from 'tailwind-merge'

defineProps<{
  icon: string
  variant?: 'default' | 'success'
  size?: 'default' | 'sm'
}>()

const backgroundVariants = cva(
  'rounded-full flex items-center justify-center',
  {
    variants: {
      variant: {
        default: 'bg-sky-100',
        success: 'bg-emerald-100'
      },
      size: {
        default: 'p-2',
        sm: 'p-1'
      }
    },
    defaultVariants: {
      variant: 'default',
      size: 'default'
    }
  }
)

const iconVariants = cva(
  '',
  {
    variants: {
      variant: {
        default: 'text-sky-700',
        success: 'text-emerald-700'
      },
      size: {
        default: 'h-8 w-8',
        sm: 'h-4 w-4'
      }
    },
    defaultVariants: {
      variant: 'default',
      size: 'default'
    }
  }
)
</script>

<template>
  <div :class="twMerge(backgroundVariants({ variant, size }))">
    <UIcon :name="icon" :class="twMerge(iconVariants({ variant, size }))" />
  </div>
</template>
