# ⚡ Quick Performance Reference

Quick access to performance optimization tools and patterns.

---

## 🔧 Utilities

### Debouncing (Search, Input)
```typescript
import { useDebouncedCallback } from '@/lib/performance';

const handleSearch = useDebouncedCallback((value: string) => {
  // Search logic
}, 300); // 300ms delay
```

### Throttling (Scroll, Resize)
```typescript
import { useThrottledCallback } from '@/lib/performance';

const handleScroll = useThrottledCallback(() => {
  // Scroll logic
}, 100); // Max once per 100ms
```

### Memoization (Expensive Calculations)
```typescript
import { memoize } from '@/lib/performance';

const expensiveCalc = memoize((data) => {
  // Heavy computation
  return result;
});
```

---

## 🔄 Data Fetching

### Basic Usage
```typescript
import { useFetch } from '@/lib/useFetch';

const { data, loading, error, mutate, refresh } = useFetch(
  '/api/orders',
  () => fetch('/api/orders').then(res => res.json())
);
```

### With Options
```typescript
const { data, loading } = useFetch(
  '/api/drivers',
  fetchDrivers,
  {
    revalidateOnFocus: true,      // Refresh when window focused
    revalidateInterval: 30000,    // Refresh every 30s
    initialData: [],              // Show while loading
    enabled: isLoggedIn,          // Conditional fetching
  }
);
```

### Optimistic Updates
```typescript
const { mutate } = useFetch('/api/orders', fetchOrders);

// Update UI immediately, then revalidate
await mutate(
  (currentData) => [...currentData, newOrder],
  true // revalidate after
);
```

---

## 💾 API Caching

### Apply to API Route
```typescript
import { withCache } from '@/lib/cache';

export const GET = withCache(
  async (request: Request) => {
    const data = await fetchData();
    return NextResponse.json(data);
  },
  { ttl: 60000 } // 1 minute cache
);
```

### Invalidate Cache
```typescript
import { invalidateCache } from '@/lib/cache';

// After update/delete
await updateOrder(id);
invalidateCache('/api/orders'); // Clear related cache
```

---

## 🖼️ Images

### Basic Usage
```typescript
import OptimizedImage, { imageSizes } from '@/components/OptimizedImage';

<OptimizedImage
  src="/hero.jpg"
  alt="Hero Image"
  width={1200}
  height={600}
  sizes={imageSizes.hero}
  priority // For above-fold images
/>
```

### Responsive Image
```typescript
<OptimizedImage
  src="/card-image.jpg"
  alt="Card"
  fill
  objectFit="cover"
  sizes={imageSizes.card}
/>
```

---

## 📦 Code Splitting

### Dynamic Import
```typescript
import dynamic from 'next/dynamic';

const HeavyComponent = dynamic(
  () => import('@/components/HeavyComponent'),
  { 
    loading: () => <Skeleton />,
    ssr: false // Client-side only
  }
);
```

### Lazy Load Component
```typescript
import { lazy, Suspense } from 'react';

const LazyComponent = lazy(() => import('./Component'));

<Suspense fallback={<Loading />}>
  <LazyComponent />
</Suspense>
```

---

## 🎯 Component Optimization

### Memoize Component
```typescript
import { memo } from 'react';

const Card = memo(({ title, value }) => {
  return <div>{title}: {value}</div>;
});

Card.displayName = 'Card';
```

### Memoize Value
```typescript
import { useMemo } from 'react';

const expensiveValue = useMemo(
  () => calculateExpensiveValue(data),
  [data] // Only recalculate if data changes
);
```

### Memoize Callback
```typescript
import { useCallback } from 'react';

const handleClick = useCallback(() => {
  doSomething(id);
}, [id]); // Only recreate if id changes
```

---

## 📊 Performance Monitoring

### Track Component Render
```typescript
import { useRenderPerformance } from '@/components/PerformanceMonitor';

export default function MyComponent() {
  useRenderPerformance('MyComponent');
  // ... component code
}
```

### Measure Function
```typescript
import { measurePerformance } from '@/components/PerformanceMonitor';

const optimizedFunction = measurePerformance(
  expensiveFunction,
  'ExpensiveFunctionName'
);
```

---

## 🔍 Bundle Analysis

```bash
# Analyze bundle size
npm run build:analyze

# Build for production
npm run build

# Development with Turbopack
npm run dev:turbo
```

---

## ✅ Checklist

### Before Pushing Code
- [ ] Images use OptimizedImage component
- [ ] API calls use useFetch or caching
- [ ] Heavy components are code-split
- [ ] Expensive components use React.memo
- [ ] Search inputs are debounced
- [ ] Scroll handlers are throttled
- [ ] No console.logs in production code
- [ ] Bundle size checked (if major changes)

### Before Deployment
- [ ] Run `npm run build:analyze`
- [ ] Check bundle size < 1.5 MB
- [ ] Test on mobile device
- [ ] Lighthouse score > 85
- [ ] All images optimized
- [ ] API caching implemented
- [ ] Error boundaries in place

---

## 🚨 Common Issues

### Large Bundle Size
1. Check imports: `import { Button } from 'antd'` ✅
2. Not: `import * as antd from 'antd'` ❌
3. Run bundle analyzer
4. Remove unused dependencies

### Slow API Responses
1. Add caching: `withCache(handler)`
2. Use `useFetch` for deduplication
3. Optimize database queries
4. Add pagination

### Slow Page Loads
1. Use dynamic imports for heavy components
2. Add loading skeletons
3. Optimize images (WebP, sizes)
4. Enable image priority for above-fold

### Janky Scrolling
1. Throttle scroll handlers: `useThrottledCallback(fn, 100)`
2. Use CSS transforms instead of position
3. Reduce DOM complexity
4. Use virtual scrolling for long lists

---

## 📚 More Info

- Full guide: `PERFORMANCE.md`
- Implementation: `OPTIMIZATION_SUMMARY.md`
- Next.js docs: https://nextjs.org/docs/advanced-features/measuring-performance

---

**Quick Tip:** Run `npm run build:analyze` weekly to catch bundle size regressions early! 📊
