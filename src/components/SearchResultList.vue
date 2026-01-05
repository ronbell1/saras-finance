<script setup>
import SearchResultItem from './SearchResultItem.vue';

defineProps({
  results: {
    type: Array,
    default: () => []
  }
});
</script>

<template>
  <div class="results-container">
    <TransitionGroup name="list" tag="div" class="list-wrapper">
      <SearchResultItem 
        v-for="(item, index) in results" 
        :key="item.id" 
        :item="item"
        :style="{ transitionDelay: `${index * 50}ms` }"
      />
    </TransitionGroup>
    
    <div v-if="results.length === 0" class="empty-state">
      <p>No results found via Postman Echo.</p>
    </div>
  </div>
</template>

<style scoped>
.results-container {
  width: 100%;
}

.list-wrapper {
  display: flex;
  flex-direction: column;
  gap: 1rem; /* Consistent animation gap */
}

/* 
  Important: The actual transition classes (list-enter-active, etc.) 
  are defined in style.css to ensure global consistent motion.
*/

.empty-state {
  text-align: center;
  color: var(--color-text-muted);
  margin-top: 3rem;
  font-style: italic;
  font-size: 0.95rem;
}
</style>
