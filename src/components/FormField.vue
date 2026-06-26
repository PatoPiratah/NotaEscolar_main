<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  modelValue: string | number
  label: string
  type?: string
  placeholder?: string
  error?: string
  min?: number
  max?: number
  step?: number
  id: string
}>()

defineEmits<{
  'update:modelValue': [value: string | number]
}>()

const hasError = computed(() => !!props.error)
</script>

<template>
  <div class="form-field" :class="{ 'form-field--error': hasError }">
    <label :for="id" class="form-field__label">{{ label }}</label>
    <div class="form-field__input-wrapper">
      <input
        :id="id"
        :type="type ?? 'text'"
        :placeholder="placeholder"
        :value="modelValue"
        :min="min"
        :max="max"
        :step="step"
        class="form-field__input"
        @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
      />
      <div v-if="hasError" class="form-field__error-icon">
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <circle cx="8" cy="8" r="7" stroke="currentColor" stroke-width="1.5" />
          <path d="M8 4.5V9" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
          <circle cx="8" cy="11.5" r="0.75" fill="currentColor" />
        </svg>
      </div>
    </div>
    <Transition name="error">
      <span v-if="hasError" class="form-field__error">{{ error }}</span>
    </Transition>
  </div>
</template>

<style scoped>
.form-field {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.form-field__label {
  font-size: var(--font-size-sm);
  font-weight: 500;
  color: var(--color-text-secondary);
  letter-spacing: 0.02em;
}

.form-field__input-wrapper {
  position: relative;
  display: flex;
  align-items: center;
}

.form-field__input {
  width: 100%;
  padding: 12px 16px;
  background: var(--color-bg-input);
  border: 1.5px solid var(--color-border);
  border-radius: var(--radius-md);
  color: var(--color-text-primary);
  font-family: var(--font-family);
  font-size: var(--font-size-base);
  transition: all var(--transition-fast);
  outline: none;
}

.form-field__input::placeholder {
  color: var(--color-text-muted);
}

.form-field__input:focus {
  border-color: var(--color-accent-primary);
  box-shadow: 0 0 0 3px var(--color-accent-primary-glow);
}

.form-field--error .form-field__input {
  border-color: var(--color-accent-danger);
  box-shadow: 0 0 0 3px var(--color-accent-danger-glow);
}

.form-field__error-icon {
  position: absolute;
  right: 12px;
  color: var(--color-accent-danger);
  display: flex;
  align-items: center;
  animation: fadeIn var(--transition-fast);
}

.form-field__error {
  font-size: var(--font-size-xs);
  color: var(--color-accent-danger);
  font-weight: 500;
  padding-left: 2px;
}

.form-field__input[type='number']::-webkit-outer-spin-button,
.form-field__input[type='number']::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

.form-field__input[type='number'] {
  -moz-appearance: textfield;
}

.error-enter-active {
  animation: slideDown var(--transition-fast);
}

.error-leave-active {
  animation: slideDown var(--transition-fast) reverse;
}
</style>
