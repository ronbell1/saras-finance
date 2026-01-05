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
  background: var(--brand-surface);
  border: 1px solid transparent; /* Prepare for border transition */
  border-bottom: 1px solid var(--border-subtle);
  padding: 2rem 2.5rem; 
  cursor: pointer;
  transition: transform 0.1s ease-out, box-shadow 0.3s var(--ease-smooth), background 0.3s ease; /* Fast transform for tilt */
  position: relative;
  transform-style: preserve-3d; /* Enable 3D children */
}

/* Glow Effect */
.glow-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  border-radius: inherit;
  background: radial-gradient(
    800px circle at var(--mouse-x) var(--mouse-y), 
    rgba(255, 255, 255, 0.06),
    transparent 40%
  );
  opacity: 0;
  transition: opacity 0.3s ease;
  pointer-events: none;
  z-index: 1;
}

.result-item:hover .glow-overlay {
  opacity: 1;
}

.result-item.tilting {
  z-index: 20; /* Pop above siblings when tilting */
  box-shadow: 
    0 20px 40px -10px rgba(0,0,0,0.1),
    0 0 0 1px rgba(0,0,0,0.05); /* Deep shadow during tilt */
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
  background: var(--brand-surface-hover);
  border-color: var(--border-focus);
}

.item-content {
  /* No extra padding needed here since parent handles it, 
     but we can use this for internal alignment if needed */
}

.result-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 0.75rem;
  gap: 1.5rem;
}

.title {
  margin: 0;
  font-size: 1.1rem;
  font-weight: 600;
  color: var(--text-primary);
  line-height: 1.4;
  letter-spacing: -0.01em;
}

.expand-icon {
  color: var(--text-muted);
  transition: transform 0.4s var(--ease-elastic);
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background: rgba(0,0,0,0.02);
}

.snippet {
  color: var(--text-secondary);
  font-size: 0.95rem;
  line-height: 1.6;
  max-width: 90%; /* Optimize line length for reading */
}

.details-wrapper {
  transition: 
    max-height 0.5s cubic-bezier(0.2, 0.8, 0.2, 1),
    opacity 0.4s ease 0.1s;
  overflow: hidden;
}

.details {
  padding-top: 1.5rem;
  color: var(--text-muted);
  font-size: 0.9rem;
  line-height: 1.6;
  border-top: 1px solid var(--border-subtle);
  margin-top: 1.5rem;
}

/* Expansion States */
.expanded .expand-icon {
  transform: rotate(180deg);
  background: var(--brand-primary);
  color: white;
  box-shadow: 0 4px 12px rgba(0,0,0,0.15);
}

.result-item.expanded {
  background: var(--brand-surface);
  box-shadow: var(--shadow-soft);
  z-index: 5;
  border-radius: var(--radius-lg) !important;
  margin: 1rem 0; /* Add margin when expanded to separate from list */
  border: 1px solid var(--border-subtle);
}
</style>
