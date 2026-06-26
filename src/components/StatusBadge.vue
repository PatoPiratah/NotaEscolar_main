<script setup lang="ts">
import { computed } from 'vue'
import { getStatusLabel, type StudentStatus } from '../types/Student'

const props = defineProps<{
  status: StudentStatus
}>()

const label = computed(() => getStatusLabel(props.status))
</script>

<template>
  <span class="badge" :class="`badge--${status}`">
    <span class="badge__dot" />
    {{ label }}
  </span>
</template>

<style scoped>
.badge {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 4px 12px;
  border-radius: var(--radius-full);
  font-size: var(--font-size-xs);
  font-weight: 600;
  letter-spacing: 0.02em;
  border: 1px solid transparent;
  white-space: nowrap;
}

.badge__dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  flex-shrink: 0;
}

.badge--approved {
  background: var(--color-status-approved-bg);
  color: var(--color-status-approved);
  border-color: var(--color-status-approved-border);
}

.badge--approved .badge__dot {
  background: var(--color-status-approved);
  box-shadow: 0 0 6px var(--color-status-approved);
}

.badge--exam {
  background: var(--color-status-exam-bg);
  color: var(--color-status-exam);
  border-color: var(--color-status-exam-border);
}

.badge--exam .badge__dot {
  background: var(--color-status-exam);
  box-shadow: 0 0 6px var(--color-status-exam);
}

.badge--failed {
  background: var(--color-status-failed-bg);
  color: var(--color-status-failed);
  border-color: var(--color-status-failed-border);
}

.badge--failed .badge__dot {
  background: var(--color-status-failed);
  box-shadow: 0 0 6px var(--color-status-failed);
}
</style>
