<script setup lang="ts">
import StatusBadge from './StatusBadge.vue'
import AppButton from './AppButton.vue'
import { calculateAverage, getStatus, type Student } from '../types/Student'

defineProps<{
  students: Student[]
}>()

defineEmits<{
  edit: [student: Student]
  delete: [student: Student]
}>()

function formatGrade(grade: number): string {
  return grade.toFixed(1)
}
</script>

<template>
  <div class="table-wrapper">
    <div v-if="students.length === 0" class="table-empty">
      <div class="table-empty__icon">
        <svg width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round">
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
          <circle cx="9" cy="7" r="4" />
          <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
          <path d="M16 3.13a4 4 0 0 1 0 7.75" />
        </svg>
      </div>
      <h3 class="table-empty__title">Nenhum aluno encontrado</h3>
      <p class="table-empty__subtitle">Cadastre um novo aluno para começar</p>
    </div>

    <table v-else class="table">
      <thead>
        <tr>
          <th>Aluno</th>
          <th class="text-center">Nota 1</th>
          <th class="text-center">Nota 2</th>
          <th class="text-center">Média</th>
          <th class="text-center">Situação</th>
          <th class="text-center">Ações</th>
        </tr>
      </thead>
      <tbody>
        <TransitionGroup name="list">
          <tr v-for="student in students" :key="student.id">
            <td>
              <div class="student-info">
                <div class="student-info__avatar">
                  {{ student.name.charAt(0).toUpperCase() }}
                </div>
                <span class="student-info__name">{{ student.name }}</span>
              </div>
            </td>
            <td class="text-center">
              <span class="grade">{{ formatGrade(student.grade1) }}</span>
            </td>
            <td class="text-center">
              <span class="grade">{{ formatGrade(student.grade2) }}</span>
            </td>
            <td class="text-center">
              <span class="grade grade--average" :class="`grade--${getStatus(calculateAverage(student.grade1, student.grade2))}`">
                {{ formatGrade(calculateAverage(student.grade1, student.grade2)) }}
              </span>
            </td>
            <td class="text-center">
              <StatusBadge :status="getStatus(calculateAverage(student.grade1, student.grade2))" />
            </td>
            <td class="text-center">
              <div class="actions">
                <AppButton variant="edit" size="sm" icon-only @click="$emit('edit', student)" title="Editar aluno">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                  </svg>
                </AppButton>
                <AppButton variant="danger" size="sm" icon-only @click="$emit('delete', student)" title="Remover aluno">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <polyline points="3 6 5 6 21 6" />
                    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                  </svg>
                </AppButton>
              </div>
            </td>
          </tr>
        </TransitionGroup>
      </tbody>
    </table>
  </div>
</template>

<style scoped>
.table-wrapper {
  overflow-x: auto;
}

.table {
  width: 100%;
  border-collapse: separate;
  border-spacing: 0;
}

.table thead th {
  padding: 14px 20px;
  font-size: var(--font-size-xs);
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: var(--color-text-muted);
  text-align: left;
  border-bottom: 1px solid var(--color-border);
  position: sticky;
  top: 0;
  background: var(--color-bg-card);
  z-index: 1;
}

.table tbody tr {
  transition: background var(--transition-fast);
}

.table tbody tr:hover {
  background: var(--color-bg-card-hover);
}

.table tbody td {
  padding: 16px 20px;
  border-bottom: 1px solid var(--color-border-subtle);
  vertical-align: middle;
}

.table tbody tr:last-child td {
  border-bottom: none;
}

.text-center {
  text-align: center;
}

.student-info {
  display: flex;
  align-items: center;
  gap: var(--space-md);
}

.student-info__avatar {
  width: 38px;
  height: 38px;
  border-radius: var(--radius-md);
  background: linear-gradient(135deg, var(--color-accent-primary), #8b7dff);
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: var(--font-size-sm);
  color: #ffffff;
  flex-shrink: 0;
  box-shadow: 0 2px 8px var(--color-accent-primary-glow);
}

.student-info__name {
  font-weight: 500;
  color: var(--color-text-primary);
}

.grade {
  font-weight: 600;
  font-size: var(--font-size-sm);
  color: var(--color-text-primary);
  font-variant-numeric: tabular-nums;
}

.grade--average {
  padding: 4px 10px;
  border-radius: var(--radius-sm);
  font-weight: 700;
}

.grade--approved {
  color: var(--color-status-approved);
  background: var(--color-status-approved-bg);
}

.grade--exam {
  color: var(--color-status-exam);
  background: var(--color-status-exam-bg);
}

.grade--failed {
  color: var(--color-status-failed);
  background: var(--color-status-failed-bg);
}

.actions {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--space-sm);
}

.table-empty {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: var(--space-2xl) var(--space-lg);
  text-align: center;
}

.table-empty__icon {
  color: var(--color-text-muted);
  margin-bottom: var(--space-md);
  opacity: 0.5;
}

.table-empty__title {
  font-size: var(--font-size-lg);
  font-weight: 600;
  color: var(--color-text-secondary);
  margin-bottom: var(--space-xs);
}

.table-empty__subtitle {
  font-size: var(--font-size-sm);
  color: var(--color-text-muted);
}

.list-enter-active {
  animation: fadeIn var(--transition-base);
}

.list-leave-active {
  animation: fadeIn var(--transition-fast) reverse;
}

.list-move {
  transition: transform var(--transition-base);
}

@media (max-width: 768px) {
  .table thead th,
  .table tbody td {
    padding: 12px 10px;
    font-size: var(--font-size-xs);
  }

  .student-info__avatar {
    width: 30px;
    height: 30px;
    font-size: var(--font-size-xs);
  }

  .student-info {
    gap: var(--space-sm);
  }
}
</style>
