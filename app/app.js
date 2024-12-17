```javascript
import { Application } from '@nativescript/core';
import { initializeFirebase } from './shared/firebase';

// Initialize Firebase before starting the app
initializeFirebase().then(() => {
    Application.run({ moduleName: 'app-root' });
}).catch(error => {
    console.error("Failed to initialize Firebase:", error);
    Application.run({ moduleName: 'app-root' });
});
```