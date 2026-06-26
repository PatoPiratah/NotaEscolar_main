<script setup lang="ts">
import { ref, computed } from 'vue'
import type { Student } from './types/Student'
import { calculateAverage, getStatus } from './types/Student'
import StatsCards from './components/StatsCards.vue'
import StudentTable from './components/StudentTable.vue'
import StudentFormModal from './components/StudentFormModal.vue'
import ConfirmDialog from './components/ConfirmDialog.vue'
import AppButton from './components/AppButton.vue'

// State
const students = ref<Student[]>([
  { id: 1, name: 'Maria Silva', grade1: 8.5, grade2: 9.0 },
  { id: 2, name: 'João Santos', grade1: 6.0, grade2: 5.5 },
  { id: 3, name: 'Ana Oliveira', grade1: 3.5, grade2: 4.0 },
  { id: 4, name: 'Pedro Costa', grade1: 7.0, grade2: 8.0 },
  { id: 5, name: 'Lucas Ferreira', grade1: 9.5, grade2: 10.0 },
])

const searchQuery = ref('')
const nextId = ref(6)

// Modal state
const showFormModal = ref(false)
const editingStudent = ref<Student | null>(null)

// Confirm dialog state
const showConfirmDialog = ref(false)
const deletingStudent = ref<Student | null>(null)

// Toast notification
const toastMessage = ref('')
const toastVisible = ref(false)
const toastType = ref<'success' | 'info' | 'error'>('success')
let toastTimeout: ReturnType<typeof setTimeout> | null = null

function showToast(message: string, type: 'success' | 'info' | 'error' = 'success') {
  if (toastTimeout) clearTimeout(toastTimeout)
  toastMessage.value = message
  toastType.value = type
  toastVisible.value = true
  toastTimeout = setTimeout(() => {
    toastVisible.value = false
  }, 3000)
}

// Computed
const filteredStudents = computed(() => {
  if (!searchQuery.value.trim()) return students.value
  const query = searchQuery.value.toLowerCase().trim()
  return students.value.filter((s) => s.name.toLowerCase().includes(query))
})

const stats = computed(() => {
  const total = students.value.length
  let approved = 0
  let exam = 0
  let failed = 0

  students.value.forEach((s) => {
    const avg = calculateAverage(s.grade1, s.grade2)
    const status = getStatus(avg)
    if (status === 'approved') approved++
    else if (status === 'exam') exam++
    else failed++
  })

  return { total, approved, exam, failed }
})

// Actions
function openCreateModal() {
  editingStudent.value = null
  showFormModal.value = true
}

function openEditModal(student: Student) {
  editingStudent.value = { ...student }
  showFormModal.value = true
}

function handleSave(data: { name: string; grade1: number; grade2: number }) {
  if (editingStudent.value) {
    const index = students.value.findIndex((s) => s.id === editingStudent.value!.id)
    if (index !== -1) {
      students.value[index] = {
        ...students.value[index],
        name: data.name,
        grade1: data.grade1,
        grade2: data.grade2,
      }
      showToast(`Dados de "${data.name}" atualizados com sucesso!`, 'info')
    }
  } else {
    students.value.push({
      id: nextId.value++,
      name: data.name,
      grade1: data.grade1,
      grade2: data.grade2,
    })
    showToast(`"${data.name}" cadastrado(a) com sucesso!`, 'success')
  }
  showFormModal.value = false
}

function openDeleteConfirm(student: Student) {
  deletingStudent.value = student
  showConfirmDialog.value = true
}

function confirmDelete() {
  if (deletingStudent.value) {
    const name = deletingStudent.value.name
    students.value = students.value.filter((s) => s.id !== deletingStudent.value!.id)
    showToast(`"${name}" removido(a) com sucesso!`, 'error')
  }
  showConfirmDialog.value = false
  deletingStudent.value = null
}
</script>

<template>
  <div class="app">
    <!-- Background decoration -->
    <div class="app__bg">
      <div class="app__bg-orb app__bg-orb--1" />
      <div class="app__bg-orb app__bg-orb--2" />
      <div class="app__bg-orb app__bg-orb--3" />
    </div>

    <div class="app__container">
      <!-- Header -->
      <header class="header">
        <div class="header__brand">
          <div class="header__logo">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
              <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
            </svg>
          </div>
          <div>
            <h1 class="header__title">Nota Escolar</h1>
            <p class="header__subtitle">Gerenciamento de notas e desempenho</p>
          </div>
        </div>
      </header>

      <!-- Stats -->
      <section class="section" aria-label="Estatísticas">
        <StatsCards
          :total="stats.total"
          :approved="stats.approved"
          :exam="stats.exam"
          :failed="stats.failed"
        />
      </section>

      <!-- Main Content -->
      <section class="section">
        <div class="content-card">
          <div class="content-card__header">
            <div class="content-card__title-area">
              <h2 class="content-card__title">Lista de Alunos</h2>
              <span class="content-card__count">{{ filteredStudents.length }} aluno(s)</span>
            </div>
            <div class="content-card__actions">
              <div class="search-box">
                <svg class="search-box__icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <circle cx="11" cy="11" r="8" />
                  <line x1="21" y1="21" x2="16.65" y2="16.65" />
                </svg>
                <input
                  id="search-students"
                  v-model="searchQuery"
                  type="text"
                  class="search-box__input"
                  placeholder="Filtrar por nome..."
                />
                <button
                  v-if="searchQuery"
                  class="search-box__clear"
                  @click="searchQuery = ''"
                  aria-label="Limpar busca"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                </button>
              </div>
              <AppButton @click="openCreateModal">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                  <line x1="12" y1="5" x2="12" y2="19" />
                  <line x1="5" y1="12" x2="19" y2="12" />
                </svg>
                Novo Aluno
              </AppButton>
            </div>
          </div>

          <StudentTable
            :students="filteredStudents"
            @edit="openEditModal"
            @delete="openDeleteConfirm"
          />
        </div>
      </section>
    </div>

    <!-- Modals -->
    <StudentFormModal
      :visible="showFormModal"
      :student="editingStudent"
      @close="showFormModal = false"
      @save="handleSave"
    />

    <ConfirmDialog
      :visible="showConfirmDialog"
      :student-name="deletingStudent?.name ?? ''"
      @confirm="confirmDelete"
      @cancel="showConfirmDialog = false"
    />

    <!-- Toast Notification -->
    <Transition name="toast">
      <div v-if="toastVisible" class="toast" :class="`toast--${toastType}`">
        <svg v-if="toastType === 'success'" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
          <polyline points="20 6 9 17 4 12" />
        </svg>
        <svg v-else-if="toastType === 'info'" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="12" cy="12" r="10" />
          <line x1="12" y1="16" x2="12" y2="12" />
          <line x1="12" y1="8" x2="12.01" y2="8" />
        </svg>
        <svg v-else width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
          <polyline points="3 6 5 6 21 6" />
          <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
        </svg>
        <span>{{ toastMessage }}</span>
      </div>
    </Transition>
  </div>
</template>

<style scoped>
.app {
  position: relative;
  min-height: 100vh;
  overflow: hidden;
}

/* Background decoration */
.app__bg {
  position: fixed;
  inset: 0;
  pointer-events: none;
  z-index: 0;
  overflow: hidden;
}

.app__bg-orb {
  position: absolute;
  border-radius: 50%;
  filter: blur(120px);
  opacity: 0.07;
}

.app__bg-orb--1 {
  width: 600px;
  height: 600px;
  background: var(--color-accent-primary);
  top: -200px;
  right: -100px;
}

.app__bg-orb--2 {
  width: 500px;
  height: 500px;
  background: #ff6b9d;
  bottom: -150px;
  left: -150px;
}

.app__bg-orb--3 {
  width: 400px;
  height: 400px;
  background: #4ecdc4;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.app__container {
  position: relative;
  z-index: 1;
  max-width: 1100px;
  margin: 0 auto;
  padding: var(--space-xl) var(--space-lg);
}

/* Header */
.header {
  margin-bottom: var(--space-xl);
  animation: fadeIn var(--transition-slow);
}

.header__brand {
  display: flex;
  align-items: center;
  gap: var(--space-md);
}

.header__logo {
  width: 52px;
  height: 52px;
  border-radius: var(--radius-lg);
  background: linear-gradient(135deg, var(--color-accent-primary), #8b7dff);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #ffffff;
  box-shadow: 0 4px 20px var(--color-accent-primary-glow);
}

.header__title {
  font-size: var(--font-size-2xl);
  font-weight: 800;
  color: var(--color-text-heading);
  letter-spacing: -0.02em;
}

.header__subtitle {
  font-size: var(--font-size-sm);
  color: var(--color-text-muted);
  margin-top: 2px;
}

/* Section */
.section {
  margin-bottom: var(--space-xl);
  animation: fadeIn var(--transition-slow) 100ms both;
}

/* Content Card */
.content-card {
  background: var(--color-bg-card);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-xl);
  overflow: hidden;
  box-shadow: var(--shadow-sm);
}

.content-card__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: var(--space-lg) var(--space-lg);
  border-bottom: 1px solid var(--color-border);
  gap: var(--space-md);
  flex-wrap: wrap;
}

.content-card__title-area {
  display: flex;
  align-items: center;
  gap: var(--space-md);
}

.content-card__title {
  font-size: var(--font-size-lg);
  font-weight: 700;
  color: var(--color-text-heading);
}

.content-card__count {
  font-size: var(--font-size-xs);
  color: var(--color-text-muted);
  padding: 4px 10px;
  background: var(--color-bg-input);
  border-radius: var(--radius-full);
  font-weight: 500;
}

.content-card__actions {
  display: flex;
  align-items: center;
  gap: var(--space-md);
}

/* Search */
.search-box {
  position: relative;
  display: flex;
  align-items: center;
}

.search-box__icon {
  position: absolute;
  left: 12px;
  color: var(--color-text-muted);
  pointer-events: none;
}

.search-box__input {
  padding: 10px 36px 10px 38px;
  background: var(--color-bg-input);
  border: 1.5px solid var(--color-border);
  border-radius: var(--radius-md);
  color: var(--color-text-primary);
  font-family: var(--font-family);
  font-size: var(--font-size-sm);
  width: 260px;
  transition: all var(--transition-fast);
  outline: none;
}

.search-box__input::placeholder {
  color: var(--color-text-muted);
}

.search-box__input:focus {
  border-color: var(--color-accent-primary);
  box-shadow: 0 0 0 3px var(--color-accent-primary-glow);
  width: 300px;
}

.search-box__clear {
  position: absolute;
  right: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  border: none;
  background: var(--color-bg-card-hover);
  color: var(--color-text-muted);
  border-radius: var(--radius-sm);
  cursor: pointer;
  transition: all var(--transition-fast);
}

.search-box__clear:hover {
  color: var(--color-text-primary);
  background: var(--color-border);
}

/* Toast */
.toast {
  position: fixed;
  bottom: var(--space-xl);
  right: var(--space-xl);
  display: flex;
  align-items: center;
  gap: var(--space-sm);
  padding: 14px 22px;
  border-radius: var(--radius-lg);
  font-size: var(--font-size-sm);
  font-weight: 500;
  z-index: 2000;
  box-shadow: var(--shadow-lg);
  border: 1px solid transparent;
}

.toast--success {
  background: rgba(52, 211, 153, 0.15);
  color: var(--color-status-approved);
  border-color: var(--color-status-approved-border);
  backdrop-filter: blur(12px);
}

.toast--info {
  background: rgba(96, 165, 250, 0.15);
  color: var(--color-edit);
  border-color: rgba(96, 165, 250, 0.3);
  backdrop-filter: blur(12px);
}

.toast--error {
  background: rgba(248, 113, 113, 0.15);
  color: var(--color-status-failed);
  border-color: var(--color-status-failed-border);
  backdrop-filter: blur(12px);
}

.toast-enter-active {
  animation: fadeInScale var(--transition-base) cubic-bezier(0.34, 1.56, 0.64, 1);
}

.toast-leave-active {
  animation: fadeInScale var(--transition-fast) reverse;
}

/* Responsive */
@media (max-width: 768px) {
  .app__container {
    padding: var(--space-md);
  }

  .content-card__header {
    flex-direction: column;
    align-items: stretch;
  }

  .content-card__actions {
    flex-direction: column;
  }

  .search-box__input {
    width: 100%;
  }

  .search-box__input:focus {
    width: 100%;
  }

  .search-box {
    width: 100%;
  }

  .toast {
    left: var(--space-md);
    right: var(--space-md);
    bottom: var(--space-md);
  }
}
</style>
