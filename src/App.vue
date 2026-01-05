<script setup>
import { ref, computed } from 'vue';
import SearchBar from './components/SearchBar.vue';
import SearchResultList from './components/SearchResultList.vue';
import AppLoader from './components/AppLoader.vue';
import ThemeToggle from './components/ThemeToggle.vue';
import { searchService } from './services/searchService';

// Data
const query = ref('');
const results = ref([]);
const isLoading = ref(false);
const showIntro = ref(true);
const page = ref(1);
const hasMore = ref(false);
const isRelatedFallback = ref(false);

const handleSearch = async (searchTerm, isNewSearch = true) => {
  if (isNewSearch) {
    query.value = searchTerm;
    page.value = 1;
    results.value = [];
    hasMore.value = false;
  }
  
  if (!query.value.trim()) {
    results.value = [];
    showIntro.value = true;
    return;
  }

  showIntro.value = false;
  isLoading.value = isNewSearch; // Full loader for new searches
  
  try {
    const data = await searchService.search(query.value, page.value);
    
    if (isNewSearch) {
      results.value = data.results;
      isRelatedFallback.value = data.isRelatedFallback;
    } else {
      results.value = [...results.value, ...data.results];
    }
    
    // Check if more results exist
    hasMore.value = data.results.length === 10; 

  } catch (error) {
    console.error(error);
  } finally {
    isLoading.value = false;
  }
};

// Infinite Scroll
const loadMore = () => {
  if (isLoading.value || !hasMore.value) return;
  page.value++;
  handleSearch(query.value, false);
};

// Infinite Scroll Observer
const scrollTrigger = ref(null);
import { onMounted, onUnmounted, watch } from 'vue';

let observer = null;

onMounted(() => {
  observer = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting) {
      loadMore();
    }
  }, { threshold: 0.5 });
});

watch(scrollTrigger, (el) => {
  if (el) observer.observe(el);
  else observer.disconnect();
});

// Mouse Tracking
const handleMouseMove = (e) => {
  document.body.style.setProperty('--mouse-x', `${e.clientX}px`);
  document.body.style.setProperty('--mouse-y', `${e.clientY}px`);
};

onMounted(() => {
  window.addEventListener('mousemove', handleMouseMove);
});

onUnmounted(() => {
  window.removeEventListener('mousemove', handleMouseMove);
});
</script>

<template>
  <!-- Main Header -->
  <header class="main-header glass">
    <div class="header-content">
      <div class="brand-group">
        <img src="/logo.jpg" alt="SarasFinance" class="brand-logo" />
        <h1 style="color: var(--brand-blue)">SarasFinance</h1>
      </div>
      <div class="header-actions">
        <a href="https://sarasfinance.com" target="_blank" rel="noopener noreferrer" class="btn-dashboard">
          Go to Dashboard
        </a>
        <ThemeToggle />
      </div>
    </div>
  </header>

  <main class="main-wrapper">
    <div class="content-container animate-enter">
      <div class="hero-section">
        <h2 class="search-title">Discover Insights</h2>
        <p class="subtitle">Search your finance. Find what’s broken. Fix it.</p>
        <SearchBar :modelValue="query" @update:modelValue="handleSearch($event, true)" />
      </div>

      <!-- Results -->
      <Transition name="fade" mode="out-in">
        <div v-if="showIntro && !isLoading" class="intro-section">
          <p>Type to search. Our smart engine will find relevant documentation or suggest related topics.</p>
        </div>

        <AppLoader v-else-if="isLoading && page === 1" />
        
        <div v-else class="results-wrapper">
           <div v-if="isRelatedFallback && results.length > 0" class="related-badge">
             <span>✨ Related Suggestions</span>
           </div>

           <SearchResultList :results="results" />
           
           <!-- Infinite Scroll Loader -->
           <div v-if="results.length > 0" ref="scrollTrigger" class="scroll-trigger">
             <div v-if="hasMore" class="mini-loader"></div>
             <p v-else class="end-of-results">No more results</p>
           </div>
        </div>
      </Transition>
    </div>
  </main>
</template>

<style scoped>
.main-header {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 100;
  padding: 0.75rem 0;
  transition: all 0.3s ease;
}

.header-content {
  max-width: var(--max-width);
  margin: 0 auto;
  padding: 0 1.5rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.brand-group {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.brand-logo {
  height: 28px;
  width: auto;
  border-radius: 6px;
}

.header-actions {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.btn-dashboard {
  text-decoration: none;
  font-size: 0.875rem;
  font-weight: 500;
  color: var(--text-primary);
  opacity: 0.8;
  padding: 0.5rem 1rem;
  border-radius: var(--radius-sm);
  transition: all 0.2s ease;
}

.btn-dashboard:hover {
  background: var(--bg-surface-hover);
  opacity: 1;
}

/* Layout Styles */
.main-wrapper {
  width: 100%;
  padding-top: 8rem;
  padding-bottom: 6rem;
  display: flex;
  justify-content: center;
}

.content-container {
  width: 100%;
  max-width: var(--max-width);
  padding: 0 1.5rem;
}

.hero-section {
  text-align: center;
  margin-bottom: 4rem;
}

.search-title {
  font-size: 2.5rem;
  font-weight: 700;
  margin: 0 0 1rem 0;
  color: var(--text-primary);
  letter-spacing: -0.03em;
  background: linear-gradient(135deg, var(--text-primary) 30%, var(--text-muted));
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.subtitle {
  color: var(--text-secondary);
  font-size: 1.125rem;
  margin-bottom: 2.5rem;
  font-weight: 400;
}

/* H1 Override for Header */
h1 {
  font-size: 1.1rem;
  font-weight: 600;
  margin: 0;
  color: var(--text-primary) !important;
  letter-spacing: -0.01em;
}

.intro-section {
  text-align: center;
  color: var(--text-muted);
  margin-top: 4rem;
  padding: 4rem 2rem;
  border: 1px dashed var(--border-subtle);
  border-radius: var(--radius-lg);
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
}

.results-wrapper {
  width: 100%;
}

.related-badge {
  text-align: center;
  margin-bottom: 2.5rem;
}

.related-badge span {
  background: var(--bg-surface);
  border: 1px solid var(--border-subtle);
  color: var(--text-secondary);
  padding: 0.4rem 1rem;
  border-radius: 99px;
  font-size: 0.85rem;
  font-weight: 500;
  box-shadow: var(--shadow-sm);
}

.scroll-trigger {
  padding: 4rem 0;
  text-align: center;
  color: var(--text-muted);
}

.mini-loader {
  width: 20px;
  height: 20px;
  border: 2px solid var(--border-subtle);
  border-left-color: var(--text-primary);
  border-radius: 50%;
  margin: 0 auto;
  animation: spin 1s linear infinite;
}

.end-of-results {
  font-size: 0.875rem;
  opacity: 0.7;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

@media (max-width: 640px) {
  .search-title {
    font-size: 2rem;
  }
}
</style>
