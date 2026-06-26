export interface Student {
  id: number
  name: string
  grade1: number
  grade2: number
}

export type StudentStatus = 'approved' | 'exam' | 'failed'

export interface StudentWithAverage extends Student {
  average: number
  status: StudentStatus
}

export function calculateAverage(grade1: number, grade2: number): number {
  return (grade1 + grade2) / 2
}

export function getStatus(average: number): StudentStatus {
  if (average >= 7) return 'approved'
  if (average >= 5) return 'exam'
  return 'failed'
}

export function getStatusLabel(status: StudentStatus): string {
  const labels: Record<StudentStatus, string> = {
    approved: 'Aprovado(a)',
    exam: 'Em Exame',
    failed: 'Reprovado(a)',
  }
  return labels[status]
}
