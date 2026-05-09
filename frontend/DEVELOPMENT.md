# Development Guide

## Project Setup

### Initial Setup
```bash
npm install
npm start
```

### Environment Configuration
Create a `.env` file from `.env.example`:
```bash
cp .env.example .env
```

## Development Workflow

### Starting the Dev Server
```bash
npm start
```
- Runs on `http://localhost:3000`
- Hot reload enabled
- Automatic browser refresh

### Running Tests
```bash
npm test
```

### Building for Production
```bash
npm run build
```
- Creates optimized bundle in `/build`
- Minified and optimized assets

## Component Development

### Creating a New Page Component

1. **Create file** in `src/pages/YourPage.js`:
```jsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Layout from '../components/layouts/Layout';
import { Button, Input, Card, Alert } from '../components/common';

const YourPage = () => {
  return (
    <Layout title="Page Title" subtitle="Page description">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Your content */}
      </motion.div>
    </Layout>
  );
};

export default YourPage;
```

2. **Add route** in `src/App.js`:
```jsx
<Route path="/your-path" element={<YourPage />} />
```

### Creating a Reusable Component

Create in `src/components/common/YourComponent.js`:
```jsx
import React from 'react';
import { motion } from 'framer-motion';

const YourComponent = ({ prop1, prop2, children }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      {/* Component JSX */}
    </motion.div>
  );
};

export default YourComponent;
```

### Using Framer Motion

**Common animations:**

1. **Fade In**
```jsx
<motion.div
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={{ duration: 0.5 }}
/>
```

2. **Slide Up**
```jsx
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
/>
```

3. **Scale**
```jsx
<motion.div
  initial={{ scale: 0 }}
  animate={{ scale: 1 }}
  transition={{ type: 'spring', stiffness: 300 }}
/>
```

4. **Hover Effect**
```jsx
<motion.button
  whileHover={{ scale: 1.05 }}
  whileTap={{ scale: 0.95 }}
/>
```

5. **Stagger Children**
```jsx
<motion.div variants={containerVariants}>
  {items.map((item) => (
    <motion.div key={item.id} variants={itemVariants}>
      {item.content}
    </motion.div>
  ))}
</motion.div>
```

## Form Handling

### Form Validation Example
```jsx
import { validateForm } from '../utils/validation';

const [formData, setFormData] = useState({
  name: '',
  email: '',
});
const [errors, setErrors] = useState({});

const handleSubmit = (e) => {
  e.preventDefault();
  
  const formErrors = validateForm(formData);
  if (Object.keys(formErrors).length > 0) {
    setErrors(formErrors);
    return;
  }
  
  // Submit form
};
```

### Adding Custom Validation
```javascript
// In src/utils/validation.js
export const validateCustomField = (value) => {
  if (!value || value.trim().length === 0) {
    return 'Field is required';
  }
  if (value.length > 100) {
    return 'Field must not exceed 100 characters';
  }
  return '';
};
```

## API Integration

### Using the API Service
```jsx
import { employeeAPI } from '../utils/api';

// In component
const [loading, setLoading] = useState(false);
const [error, setError] = useState('');

const fetchData = async () => {
  setLoading(true);
  const result = await employeeAPI.getAllEmployees();
  
  if (result.success) {
    // Handle success
    console.log(result.data);
  } else {
    setError(result.error);
  }
  setLoading(false);
};
```

### Adding New API Endpoints
```javascript
// In src/utils/api.js
export const employeeAPI = {
  yourNewMethod: async (params) => {
    try {
      const response = await api.get('/your-endpoint', { params });
      return { success: true, data: response.data };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || error.message,
      };
    }
  },
};
```

## Styling with Tailwind CSS

### Common Classes
```jsx
// Padding: p-{size} (0-96, 4 = 1rem)
<div className="p-4">Padding</div>

// Margin: m-{size}
<div className="m-4">Margin</div>

// Flexbox
<div className="flex items-center justify-between gap-4">
  Flex container
</div>

// Grid
<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
  Grid layout
</div>

// Colors: text-{color}-{shade}
<p className="text-blue-500">Blue text</p>

// Background: bg-{color}-{shade}
<div className="bg-slate-900">Dark background</div>

// Responsive: sm: md: lg: xl: 2xl:
<div className="text-sm md:text-lg lg:text-xl">
  Responsive text
</div>
```

### Custom Classes (in index.css)
```css
.glass {
  @apply bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl;
}

.gradient-text {
  @apply bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent;
}

.transition-smooth {
  @apply transition-all duration-300 ease-out;
}
```

## State Management

### Using React Hooks

**useState:**
```jsx
const [count, setCount] = useState(0);
```

**useEffect:**
```jsx
useEffect(() => {
  // Run on component mount and when dependencies change
  fetchData();
}, [dependencyArray]);
```

**useRef:**
```jsx
const inputRef = useRef(null);
```

## Debugging

### React DevTools
- Install React DevTools browser extension
- Inspect component props and state
- Track component re-renders

### Framer Motion DevTools
- Use `initial`, `animate`, `exit` props to debug animations
- Check transition timing

### Console Debugging
```javascript
console.log('Variable:', variable);
console.error('Error message:', error);
console.table(dataArray);
```

## Performance Optimization

### Code Splitting
```jsx
import React, { lazy, Suspense } from 'react';

const HeavyComponent = lazy(() => import('./HeavyComponent'));

<Suspense fallback={<Loading />}>
  <HeavyComponent />
</Suspense>
```

### Memoization
```jsx
import React, { memo, useMemo, useCallback } from 'react';

const MemoComponent = memo(({ data }) => {
  return <div>{data}</div>;
});

const MemoValue = useMemo(() => computeExpensiveValue(), [deps]);
const MemoFunction = useCallback(() => {}, [deps]);
```

## Common Issues & Solutions

### Issue: Styles not applying
**Solution:** Clear browser cache, restart dev server, check CSS file imports

### Issue: API calls failing
**Solution:** 
- Check backend is running
- Verify API URL in `.env`
- Check CORS settings
- Review browser console for errors

### Issue: Animations not smooth
**Solution:**
- Use `transform` and `opacity` for better performance
- Avoid animating layouts
- Check animation duration

### Issue: Components re-rendering too much
**Solution:**
- Use `React.memo()` for props comparison
- Use `useCallback` for functions passed as props
- Check useEffect dependencies

## Code Quality

### Naming Conventions
- **Components:** PascalCase (e.g., `Button`, `UserProfile`)
- **Functions/Variables:** camelCase (e.g., `handleClick`, `userData`)
- **Constants:** UPPER_SNAKE_CASE (e.g., `API_URL`, `MAX_ITEMS`)

### File Organization
- One main component per file
- Helper components in same file only if small
- Keep related files together

### Code Comments
```jsx
// Use comments for complex logic
// Explain WHY, not WHAT

// Bad:
setData(newData); // Set the data

// Good:
// Filter out inactive employees before displaying
setData(newData.filter(emp => emp.active));
```

## Deployment

### Build Optimization
```bash
npm run build
```

### Environment Variables for Production
Create `.env.production`:
```
REACT_APP_API_BASE_URL=https://your-production-api.com
```

### Deploy to Vercel
```bash
npm install -g vercel
vercel
```

## Resources

- [React Documentation](https://react.dev)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [Framer Motion Docs](https://www.framer.com/motion/)
- [React Router Docs](https://reactrouter.com/)

## Tips for Success

1. **Start Simple** - Build basic functionality first
2. **Component Reuse** - Create small, reusable components
3. **Test Often** - Test in browser frequently
4. **Read Errors** - Browser console errors are your friend
5. **Performance First** - Optimize as you go
6. **Clean Code** - Refactor regularly
7. **Document Well** - Comment complex logic

---

Happy coding! 🚀
