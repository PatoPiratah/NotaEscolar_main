<script setup lang="ts">
import { ref, watch } from 'vue'
import FormField from './FormField.vue'
import AppButton from './AppButton.vue'
import type { Student } from '../types/Student'

const props = defineProps<{
  visible: boolean
  student?: Student | null
}>()

const emit = defineEmits<{
  close: []
  save: [data: { name: string; grade1: number; grade2: number }]
}>()

const name = ref('')
const grade1 = ref<string | number>('')
const grade2 = ref<string | number>('')

const errors = ref({
  name: '',
  grade1: '',
  grade2: '',
})

watch(
  () => props.visible,
  (val) => {
    if (val && props.student) {
      name.value = props.student.name
      grade1.value = props.student.grade1
      grade2.value = props.student.grade2
    } else if (val) {
      name.value = ''
      grade1.value = ''
      grade2.value = ''
    }
    errors.value = { name: '', grade1: '', grade2: '' }
  }
)

function validateGrade(value: string | number): { valid: boolean; num: number } {
  const num = Number(value)
  if (value === '' || value === null || value === undefined) {
    return { valid: false, num: 0 }
  }
  if (isNaN(num) || num < 0 || num > 10) {
    return { valid: false, num }
  }
  return { valid: true, num }
}

function handleSubmit() {
  let valid = true
  const newErrors = { name: '', grade1: '', grade2: '' }

  if (!name.value.trim()) {
    newErrors.name = 'O nome do aluno é obrigatório'
    valid = false
  }

  const g1 = validateGrade(grade1.value)
  if (!g1.valid) {
    newErrors.grade1 = grade1.value === '' ? 'Informe a primeira nota' : 'A nota deve ser entre 0 e 10'
    valid = false
  }

  const g2 = validateGrade(grade2.value)
  if (!g2.valid) {
    newErrors.grade2 = grade2.value === '' ? 'Informe a segunda nota' : 'A nota deve ser entre 0 e 10'
    valid = false
  }

  errors.value = newErrors

  if (valid) {
    emit('save', {
      name: name.value.trim(),
      grade1: g1.num,
      grade2: g2.num,
    })
  }
}

function handleOverlayClick(e: MouseEvent) {
  if ((e.target as HTMLElement).classList.contains('modal-overlay')) {
    emit('close')
  }
}
</script>

<template>
  <Teleport to="body">
    <Transition name="modal">
      <div v-if="visible" class="modal-overlay" @click="handleOverlayClick">
        <div class="modal" role="dialog" aria-modal="true">
          <div class="modal__header">
            <h2 class="modal__title">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path v-if="student" d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                <path v-if="student" d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                <path v-else d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                <circle v-if="!student" cx="8.5" cy="7" r="4" />
                <line v-if="!student" x1="20" y1="8" x2="20" y2="14" />
                <line v-if="!student" x1="23" y1="11" x2="17" y2="11" />
              </svg>
              {{ student ? 'Editar Aluno' : 'Cadastrar Aluno' }}
            </h2>
            <button class="modal__close" @click="$emit('close')" aria-label="Fechar">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>

          <form class="modal__body" @submit.prevent="handleSubmit">
            <FormField
              id="student-name"
              v-model="name"
              label="Nome do Aluno"
              placeholder="Digite o nome completo"
              :error="errors.name"
            />

            <div class="modal__grades">
              <FormField
                id="student-grade1"
                v-model="grade1"
                label="Primeira Nota"
                type="number"
                placeholder="0 a 10"
                :min="0"
                :max="10"
                :step="0.1"
                :error="errors.grade1"
              />
              <FormField
                id="student-grade2"
                v-model="grade2"
                label="Segunda Nota"
                type="number"
                placeholder="0 a 10"
                :min="0"
                :max="10"
                :step="0.1"
                :error="errors.grade2"
              />
            </div>

            <div class="modal__actions">
              <AppButton variant="ghost" type="button" @click="$emit('close')">
                Cancelar
              </AppButton>
              <AppButton type="submit">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                {{ student ? 'Salvar Alterações' : 'Cadastrar' }}
              </AppButton>
            </div>
          </form>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.modal-overlay {
  position: fixed;
  inset: 0;
  background: var(--color-bg-modal-overlay);
  backdrop-filter: blur(8px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: var(--space-md);
}

.modal {
  background: var(--color-bg-secondary);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-xl);
  width: 100%;
  max-width: 480px;
  box-shadow: var(--shadow-lg);
  overflow: hidden;
}

.modal__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: var(--space-lg) var(--space-lg) 0;
}

.modal__title {
  display: flex;
  align-items: center;
  gap: var(--space-sm);
  font-size: var(--font-size-xl);
  font-weight: 700;
  color: var(--color-text-heading);
}

.modal__title svg {
  color: var(--color-accent-primary);
}

.modal__close {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border: none;
  background: transparent;
  color: var(--color-text-muted);
  border-radius: var(--radius-sm);
  cursor: pointer;
  transition: all var(--transition-fast);
}

.modal__close:hover {
  color: var(--color-text-primary);
  background: var(--color-bg-card-hover);
}

.modal__body {
  padding: var(--space-lg);
  display: flex;
  flex-direction: column;
  gap: var(--space-md);
}

.modal__grades {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--space-md);
}

.modal__actions {
  display: flex;
  justify-content: flex-end;
  gap: var(--space-sm);
  margin-top: var(--space-sm);
}

/* Transitions */
.modal-enter-active .modal-overlay,
.modal-enter-active {
  animation: overlayFadeIn var(--transition-base);
}

.modal-enter-active .modal {
  animation: modalSlideIn var(--transition-base) cubic-bezier(0.34, 1.56, 0.64, 1);
}

.modal-leave-active {
  animation: overlayFadeIn var(--transition-fast) reverse;
}

.modal-leave-active .modal {
  animation: modalSlideIn var(--transition-fast) reverse;
}

@media (max-width: 520px) {
  .modal__grades {
    grid-template-columns: 1fr;
  }
}
</style>
