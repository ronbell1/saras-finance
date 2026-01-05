<template>
  <div class="skeleton-container">
    <div v-for="n in 3" :key="n" class="skeleton-card">
      <div class="skeleton-header">
        <div class="skeleton-title"></div>
        <div class="skeleton-icon"></div>
      </div>
      <div class="skeleton-line full"></div>
      <div class="skeleton-line three-quarter"></div>
    </div>
  </div>
</template>

<style scoped>
.skeleton-container {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 100%;
}

.skeleton-card {
  background: var(--brand-surface);
  border: 1px solid var(--border-subtle);
  border-radius: var(--radius-md);
  padding: 2rem 2.5rem;
  position: relative;
  overflow: hidden;
}

/* Shimmer Animation */
.skeleton-card::after {
  content: "";
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background: linear-gradient(
    90deg,
    transparent 0%,
    rgba(255, 255, 255, 0.4) 50%,
    transparent 100%
  );
  transform: translateX(-100%);
  animation: shimmer 1.5s infinite;
}

[data-theme="dark"] .skeleton-card::after {
  background: linear-gradient(
    90deg,
    transparent 0%,
    rgba(255, 255, 255, 0.05) 50%,
    transparent 100%
  );
}

@keyframes shimmer {
  100% {
    transform: translateX(100%);
  }
}

.skeleton-header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 1rem;
}

.skeleton-title {
  height: 24px;
  width: 40%;
  background: var(--border-subtle);
  border-radius: 4px;
}

.skeleton-icon {
  height: 24px;
  width: 24px;
  border-radius: 50%;
  background: var(--border-subtle);
}

.skeleton-line {
  height: 16px;
  background: var(--border-subtle);
  border-radius: 4px;
  margin-bottom: 0.75rem;
}

.full { width: 100%; }
.three-quarter { width: 75%; }
</style>
