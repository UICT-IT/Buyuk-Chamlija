# Development Guidelines

## 🚀 Safe Development Practices

This document outlines best practices to prevent app breakage during development.

## Common Breaking Patterns to Avoid

### ❌ Invalid JSX Comments
**DON'T:**
```jsx
return (
  // This is wrong - JSX comments break the structure
  <SafeAreaProvider>
    <App />
  </SafeAreaProvider>
  // This will cause parsing errors
);
```

**DO:**
```jsx
return (
  <SafeAreaProvider>
    {/* Use curly braces for JSX comments */}
    <App />
  </SafeAreaProvider>
);
```

### ❌ Inline require() in Navigation
**DON'T:**
```jsx
<Stack.Screen name="MyScreen" component={require('./MyScreen').default} />
```

**DO:**
```jsx
import MyScreen from './MyScreen';
// ...
<Stack.Screen name="MyScreen" component={MyScreen} />
```

### ❌ Missing Imports
Always import all dependencies at the top of the file. Don't rely on global variables or lazy loading unless explicitly needed.

## Testing Changes Before Committing

### 1. Clear Cache and Restart
```bash
# Clear Expo cache
npx expo start --clear
```

### 2. Test Hot Reload
- Make a small, non-breaking change (e.g., change text color)
- Verify the change appears without errors
- If hot reload fails, there's likely a syntax or import error

### 3. Test Navigation Flows
- Navigate through all screens
- Test back navigation
- Test deep linking if applicable
- Verify authentication flows

### 4. Test User Modes
- Test as guest user
- Test as logged-in user
- Test as seller (if applicable)

## Debugging Workflow

### When the App Crashes

1. **Check the Terminal Output**
   - Look for red error messages
   - Note the file and line number
   - Read the error message carefully

2. **Common Error Types**
   - **Syntax Errors**: Missing brackets, commas, or quotes
   - **Import Errors**: Missing or incorrect import statements
   - **Type Errors**: Accessing properties on undefined/null
   - **Navigation Errors**: Screen not registered or incorrect params

3. **Fix Priority**
   - Fix syntax errors first
   - Then fix import errors
   - Finally fix logic errors

### Hot Reload Best Practices

1. **When Hot Reload Works**
   - UI changes (styles, text, colors)
   - Component logic changes
   - State management changes

2. **When to Full Reload**
   - New dependencies added
   - Navigation structure changed
   - Context providers modified
   - Native modules updated

3. **When to Clear Cache**
   - Unexplained errors persist
   - Assets not updating
   - After pulling new code
   - After dependency updates

## Code Review Checklist

Before committing code, verify:

- [ ] No inline `require()` statements in navigation
- [ ] All imports are at the top of the file
- [ ] No invalid JSX comments (use `{/* */}` instead)
- [ ] All components are properly exported
- [ ] No unused imports or variables
- [ ] Error boundaries are in place for critical components
- [ ] Navigation screens are properly registered
- [ ] Hot reload works after changes
- [ ] App starts without errors
- [ ] All user flows tested

## File Structure Guidelines

### Component Files
```javascript
// 1. React and React Native imports
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';

// 2. Third-party library imports
import { Ionicons } from '@expo/vector-icons';

// 3. Local component imports
import MyComponent from './MyComponent';

// 4. Context and utility imports
import { useAuth } from '../context/AuthContext';
import { formatDate } from '../utils/dateUtils';

// 5. Component definition
export default function MyScreen() {
  // Component logic
}

// 6. Styles at the bottom
const styles = StyleSheet.create({
  // Styles here
});
```

## Common Pitfalls

### 1. Modifying Core Files Without Testing
Files like `App.js`, `AppNavigator.js`, and context providers are critical. Always test thoroughly after modifying these.

### 2. Removing Dependencies Without Checking Usage
Before removing a dependency:
```bash
# Search for usage in the codebase
grep -r "dependency-name" src/
```

### 3. Forgetting to Update Navigation
When adding a new screen:
1. Create the screen component
2. Import it in `AppNavigator.js`
3. Add it to the appropriate navigator (Stack/Tab)
4. Test navigation to and from the screen

### 4. Not Handling Error States
Always handle:
- Loading states
- Error states
- Empty states
- Offline states

## Performance Tips

1. **Use React.memo for Heavy Components**
2. **Avoid Inline Functions in Render**
3. **Use FlatList for Long Lists**
4. **Optimize Images** (use appropriate sizes)
5. **Lazy Load When Possible**

## Getting Help

If you're stuck:
1. Check the terminal error output
2. Read the error message carefully
3. Search for the error online
4. Check React Native/Expo documentation
5. Review recent changes (git diff)

## Emergency Recovery

If the app is completely broken:

```bash
# 1. Revert to last working commit
git log --oneline
git checkout <last-working-commit-hash>

# 2. Or reset to main/master
git reset --hard origin/main

# 3. Clear everything and reinstall
rm -rf node_modules
npm install
npx expo start --clear
```

---

**Remember**: Test early, test often, and commit working code!
