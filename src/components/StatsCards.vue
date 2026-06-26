<script setup lang="ts">
defineProps<{
  total: number
  approved: number
  exam: number
  failed: number
}>()
</script>

<template>
  <div class="stats">
    <div class="stat stat--total">
      <div class="stat__icon">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
          <circle cx="9" cy="7" r="4" />
          <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
          <path d="M16 3.13a4 4 0 0 1 0 7.75" />
        </svg>
      </div>
      <div class="stat__content">
        <span class="stat__value">{{ total }}</span>
        <span class="stat__label">Total</span>
      </div>
    </div>

    <div class="stat stat--approved">
      <div class="stat__icon">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
          <polyline points="22 4 12 14.01 9 11.01" />
        </svg>
      </div>
      <div class="stat__content">
        <span class="stat__value">{{ approved }}</span>
        <span class="stat__label">Aprovados</span>
      </div>
    </div>

    <div class="stat stat--exam">
      <div class="stat__icon">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="12" cy="12" r="10" />
          <line x1="12" y1="8" x2="12" y2="12" />
          <line x1="12" y1="16" x2="12.01" y2="16" />
        </svg>
      </div>
      <div class="stat__content">
        <span class="stat__value">{{ exam }}</span>
        <span class="stat__label">Em Exame</span>
      </div>
    </div>

    <div class="stat stat--failed">
      <div class="stat__icon">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="12" cy="12" r="10" />
          <line x1="15" y1="9" x2="9" y2="15" />
          <line x1="9" y1="9" x2="15" y2="15" />
        </svg>
      </div>
      <div class="stat__content">
        <span class="stat__value">{{ failed }}</span>
        <span class="stat__label">Reprovados</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.stats {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: var(--space-md);
}

.stat {
  display: flex;
  align-items: center;
  gap: var(--space-md);
  padding: var(--space-lg);
  background: var(--color-bg-card);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  transition: all var(--transition-fast);
}

.stat:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-md);
}

.stat__icon {
  width: 44px;
  height: 44px;
  border-radius: var(--radius-md);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.stat--total .stat__icon {
  background: var(--color-accent-primary-glow);
  color: var(--color-accent-primary);
}

.stat--approved .stat__icon {
  background: var(--color-status-approved-bg);
  color: var(--color-status-approved);
}

.stat--exam .stat__icon {
  background: var(--color-status-exam-bg);
  color: var(--color-status-exam);
}

.stat--failed .stat__icon {
  background: var(--color-status-failed-bg);
  color: var(--color-status-failed);
}

.stat__content {
  display: flex;
  flex-direction: column;
}

.stat__value {
  font-size: var(--font-size-2xl);
  font-weight: 800;
  color: var(--color-text-heading);
  line-height: 1.1;
  font-variant-numeric: tabular-nums;
}

.stat__label {
  font-size: var(--font-size-xs);
  font-weight: 500;
  color: var(--color-text-muted);
  text-transform: uppercase;
  letter-spacing: 0.06em;
  margin-top: 2px;
}

@media (max-width: 900px) {
  .stats {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 480px) {
  .stats {
    grid-template-columns: 1fr;
  }

  .stat {
    padding: var(--space-md);
  }
}
</style>
