<script setup lang="ts">
import AppButton from './AppButton.vue'

defineProps<{
  visible: boolean
  studentName: string
}>()

defineEmits<{
  confirm: []
  cancel: []
}>()
</script>

<template>
  <Teleport to="body">
    <Transition name="modal">
      <div v-if="visible" class="confirm-overlay" @click.self="$emit('cancel')">
        <div class="confirm-dialog" role="alertdialog" aria-modal="true">
          <div class="confirm-dialog__icon">
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="8" x2="12" y2="12" />
              <line x1="12" y1="16" x2="12.01" y2="16" />
            </svg>
          </div>
          <h3 class="confirm-dialog__title">Confirmar Exclusão</h3>
          <p class="confirm-dialog__message">
            Tem certeza que deseja remover o aluno
            <strong>{{ studentName }}</strong>?
            Esta ação não pode ser desfeita.
          </p>
          <div class="confirm-dialog__actions">
            <AppButton variant="ghost" @click="$emit('cancel')">Cancelar</AppButton>
            <AppButton variant="danger" @click="$emit('confirm')">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <polyline points="3 6 5 6 21 6" />
                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
              </svg>
              Remover
            </AppButton>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.confirm-overlay {
  position: fixed;
  inset: 0;
  background: var(--color-bg-modal-overlay);
  backdrop-filter: blur(8px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1100;
  padding: var(--space-md);
}

.confirm-dialog {
  background: var(--color-bg-secondary);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-xl);
  padding: var(--space-xl);
  max-width: 400px;
  width: 100%;
  text-align: center;
  box-shadow: var(--shadow-lg);
}

.confirm-dialog__icon {
  display: flex;
  justify-content: center;
  margin-bottom: var(--space-md);
  color: var(--color-accent-danger);
  animation: pulse 2s infinite;
}

.confirm-dialog__title {
  font-size: var(--font-size-xl);
  font-weight: 700;
  color: var(--color-text-heading);
  margin-bottom: var(--space-sm);
}

.confirm-dialog__message {
  font-size: var(--font-size-sm);
  color: var(--color-text-secondary);
  line-height: 1.6;
  margin-bottom: var(--space-lg);
}

.confirm-dialog__message strong {
  color: var(--color-text-primary);
}

.confirm-dialog__actions {
  display: flex;
  justify-content: center;
  gap: var(--space-sm);
}

.modal-enter-active {
  animation: overlayFadeIn var(--transition-base);
}

.modal-enter-active .confirm-dialog {
  animation: modalSlideIn var(--transition-base) cubic-bezier(0.34, 1.56, 0.64, 1);
}

.modal-leave-active {
  animation: overlayFadeIn var(--transition-fast) reverse;
}
</style>
