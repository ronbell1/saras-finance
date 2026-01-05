<script setup>
import { ref } from 'vue';

const props = defineProps({
  item: {
    type: Object,
    required: true
  }
});

const isExpanded = ref(false);

const toggleExpand = () => {
  isExpanded.value = !isExpanded.value;
};
</script>

<template>
  <div class="result-item" :class="{ expanded: isExpanded }" @click="toggleExpand">
    <div class="item-content">
      <div class="result-header">
        <h3 class="title">{{ item.title }}</h3>
        <span class="expand-icon">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="6 9 12 15 18 9"></polyline>
          </svg>
        </span>
      </div>
      <div class="snippet">{{ item.snippet }}</div>
      
      <div class="details-wrapper" :style="{ maxHeight: isExpanded ? '300px' : '0' }">
        <div class="details">
          {{ item.details }}
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.result-item {
  background: var(--bg-surface);
  border: 1px solid transparent;
  border-bottom: 1px solid var(--border-subtle);
  padding: 1.75rem 2rem;
  cursor: pointer;
  transition: all 0.2s var(--ease-out);
  position: relative;
  overflow: hidden;
}

.result-item:first-child {
  border-top-left-radius: var(--radius-lg);
  border-top-right-radius: var(--radius-lg);
  border-top: 1px solid var(--border-subtle);
}

.result-item:last-child {
  border-bottom-left-radius: var(--radius-lg);
  border-bottom-right-radius: var(--radius-lg);
}

.result-item:hover {
  background: var(--bg-surface-hover);
  z-index: 2; /* Bring above siblings */
}

/* Expanded State */
.result-item.expanded {
  background: var(--bg-surface);
  box-shadow: var(--shadow-premium);
  border-color: var(--border-subtle);
  border-radius: var(--radius-lg) !important;
  margin: 1.5rem -1rem; /* Negative margin to expand outwards slightly */
  z-index: 10;
  position: relative;
}

.item-content {
  position: relative;
  z-index: 2;
}

.result-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
}

.title {
  margin: 0;
  font-size: 1.05rem;
  font-weight: 600;
  color: var(--text-primary);
  letter-spacing: -0.015em;
  transition: color 0.2s ease;
}

.result-item:hover .title {
  color: var(--brand-blue);
}

.expand-icon {
  color: var(--text-muted);
  transition: transform 0.3s var(--ease-out), color 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  border-radius: var(--radius-full);
  background: transparent;
}

.result-item:hover .expand-icon {
  color: var(--text-primary);
  background: rgba(0,0,0,0.03);
}

.snippet {
  margin-top: 0.5rem;
  color: var(--text-secondary);
  font-size: 0.95rem;
  line-height: 1.6;
  max-width: 95%;
}

.details-wrapper {
  transition: 
    max-height 0.4s var(--ease-out),
    opacity 0.3s ease 0.1s;
  overflow: hidden;
}

.details {
  padding-top: 1.5rem;
  color: var(--text-secondary);
  font-size: 0.925rem;
  line-height: 1.7;
  border-top: 1px solid var(--border-subtle);
  margin-top: 1.5rem;
}

/* Icon Rotation */
.expanded .expand-icon {
  transform: rotate(180deg);
  background: var(--brand-blue);
  color: white;
}

.expanded:hover .expand-icon {
  background: var(--brand-blue);
  color: white;
}

@media (max-width: 640px) {
  .result-item.expanded {
    margin: 1rem 0;
  }
}
</style>
