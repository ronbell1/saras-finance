<script setup>
import { ref, watch, onMounted, onUnmounted } from 'vue';

const props = defineProps(['modelValue']);
const emit = defineEmits(['update:modelValue']);

const searchQuery = ref(props.modelValue);
const searchInput = ref(null);

watch(() => props.modelValue, (newValue) => {
  searchQuery.value = newValue;
});

let debounceTimeout = null;

const onInput = () => {
  if (debounceTimeout) clearTimeout(debounceTimeout);
  
  debounceTimeout = setTimeout(() => {
    emit('update:modelValue', searchQuery.value);
  }, 300); // 300ms debounce
};

// Keyboard Shortcuts
const handleKeydown = (e) => {
  // Ctrl+K or Cmd+K to Search
  if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
    e.preventDefault();
    searchInput.value?.focus();
  }
  
  // Esc to Blur/Clear
  if (e.key === 'Escape') {
    if (document.activeElement === searchInput.value) {
      if (searchQuery.value) {
        searchQuery.value = '';
        emit('update:modelValue', '');
      } else {
        searchInput.value?.blur();
      }
    }
  }
};

onMounted(() => {
  window.addEventListener('keydown', handleKeydown);
});

onUnmounted(() => {
  window.removeEventListener('keydown', handleKeydown);
});
</script>

<template>
  <div class="search-container">
    <div class="input-wrapper">
      <svg class="search-icon" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <circle cx="11" cy="11" r="8"></circle>
        <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
      </svg>
      <input 
        ref="searchInput"
        type="text" 
        v-model="searchQuery" 
        @input="onInput"
        placeholder="Type to search insights..." 
        aria-label="Search"
      />
      <div v-if="!searchQuery" class="shortcut-hint">
        <span class="key">Ctrl</span> <span class="key">K</span>
      </div>
      <div v-else class="shortcut-hint">Esc</div>
    </div>
  </div>
</template>

<style scoped>
.search-container {
  width: 100%;
  display: flex;
  justify-content: center;
}

.input-wrapper {
  position: relative;
  width: 100%;
  max-width: 100%; /* Align with results/container width */
  transition: all 0.4s var(--ease-elastic);
}

.input-wrapper:focus-within {
  transform: translateY(-2px); /* Subtle lift instead of width expansion */
}

.search-icon {
  position: absolute;
  left: 1.25rem;
  top: 50%;
  transform: translateY(-50%);
  color: var(--text-muted);
  opacity: 0.6;
  pointer-events: none;
  transition: color 0.2s ease;
  width: 18px;
  height: 18px;
  z-index: 2;
}

input {
  width: 100%;
  padding: 1rem 1.5rem 1rem 3rem;
  font-size: 1rem;
  color: var(--text-primary);
  background: var(--brand-surface);
  border: 1px solid var(--border-subtle);
  border-radius: 12px;
  box-shadow: var(--shadow-soft);
  transition: all 0.2s var(--ease-smooth);
  outline: none;
  font-weight: 500;
}

input::placeholder {
  color: var(--text-muted);
  font-weight: 400;
  opacity: 0.6;
}

/* Hover State */
input:hover {
  border-color: rgba(0,0,0,0.1);
  box-shadow: var(--shadow-hover);
}

[data-theme="dark"] input:hover {
  border-color: rgba(255,255,255,0.15);
}

/* Focus State */
input:focus {
  transform: translateY(-1px);
  box-shadow: 0 8px 30px rgba(0,0,0,0.08);
  border-color: var(--brand-accent);
}

input:focus + .search-icon {
  color: var(--text-primary);
  opacity: 1;
}

.shortcut-hint {
  position: absolute;
  right: 1rem;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 0.75rem;
  color: var(--text-muted);
  pointer-events: none;
  opacity: 0.6;
}

.key {
  border: 1px solid var(--border-subtle);
  padding: 0.1rem 0.3rem;
  border-radius: 4px;
  background: var(--brand-muted);
  font-family: inherit;
  font-weight: 500;
  min-width: 1.2em;
  text-align: center;
}
</style>
