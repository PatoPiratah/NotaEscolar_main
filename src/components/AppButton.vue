<script setup lang="ts">
defineProps<{
  variant?: 'primary' | 'danger' | 'ghost' | 'edit'
  size?: 'sm' | 'md' | 'lg'
  disabled?: boolean
  loading?: boolean
  iconOnly?: boolean
}>()
</script>

<template>
  <button
    class="btn"
    :class="[
      `btn--${variant ?? 'primary'}`,
      `btn--${size ?? 'md'}`,
      { 'btn--icon-only': iconOnly, 'btn--loading': loading },
    ]"
    :disabled="disabled || loading"
  >
    <span v-if="loading" class="btn__spinner" />
    <slot />
  </button>
</template>

<style scoped>
.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: var(--space-sm);
  border: none;
  border-radius: var(--radius-md);
  font-family: var(--font-family);
  font-weight: 600;
  cursor: pointer;
  transition: all var(--transition-fast);
  position: relative;
  overflow: hidden;
  white-space: nowrap;
  letter-spacing: 0.01em;
}

.btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.btn--sm {
  padding: 6px 14px;
  font-size: var(--font-size-xs);
  border-radius: var(--radius-sm);
}

.btn--md {
  padding: 10px 22px;
  font-size: var(--font-size-sm);
}

.btn--lg {
  padding: 14px 28px;
  font-size: var(--font-size-base);
  border-radius: var(--radius-lg);
}

.btn--primary {
  background: linear-gradient(135deg, var(--color-accent-primary), #8b7dff);
  color: #ffffff;
  box-shadow: var(--shadow-sm), 0 0 0 0 var(--color-accent-primary-glow);
}

.btn--primary:hover:not(:disabled) {
  background: linear-gradient(135deg, var(--color-accent-primary-hover), #7a6df0);
  box-shadow: var(--shadow-md), var(--shadow-glow-primary);
  transform: translateY(-1px);
}

.btn--primary:active:not(:disabled) {
  transform: translateY(0);
  box-shadow: var(--shadow-sm);
}

.btn--danger {
  background: transparent;
  color: var(--color-accent-danger);
  border: 1px solid rgba(255, 77, 106, 0.3);
}

.btn--danger:hover:not(:disabled) {
  background: rgba(255, 77, 106, 0.1);
  border-color: var(--color-accent-danger);
  box-shadow: var(--shadow-glow-danger);
}

.btn--edit {
  background: transparent;
  color: var(--color-edit);
  border: 1px solid rgba(96, 165, 250, 0.3);
}

.btn--edit:hover:not(:disabled) {
  background: var(--color-edit-glow);
  border-color: var(--color-edit);
  box-shadow: 0 0 20px var(--color-edit-glow);
}

.btn--ghost {
  background: transparent;
  color: var(--color-text-secondary);
  border: 1px solid var(--color-border);
}

.btn--ghost:hover:not(:disabled) {
  color: var(--color-text-primary);
  background: var(--color-bg-card-hover);
  border-color: var(--color-text-muted);
}

.btn--icon-only {
  padding: 8px;
  min-width: 36px;
  min-height: 36px;
}

.btn--icon-only.btn--sm {
  padding: 6px;
  min-width: 30px;
  min-height: 30px;
}

.btn__spinner {
  width: 16px;
  height: 16px;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-top-color: #ffffff;
  border-radius: 50%;
  animation: spin 0.6s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.btn--loading {
  pointer-events: none;
}
</style>
