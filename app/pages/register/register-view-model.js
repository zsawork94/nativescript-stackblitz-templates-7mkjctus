```javascript
import { Observable } from '@nativescript/core';
import { Frame } from '@nativescript/core';
import { CONFIG } from '../../shared/config';
import { auth, db } from '../../shared/firebase';
import { User } from '../../models/user';

export function createViewModel() {
    const viewModel = new Observable();

    viewModel.name = "";
    viewModel.email = "";
    viewModel.password = "";
    viewModel.phone = "";
    viewModel.location = "";
    viewModel.experience = "";
    viewModel.isServiceProvider = false;
    viewModel.isLoading = false;
    viewModel.errorMessage = "";
    
    viewModel.serviceCategories = CONFIG.serviceCategories.map(name => ({
        name,
        selected: false
    }));

    viewModel.onServiceSelect = (args) => {
        const index = args.index;
        const item = viewModel.serviceCategories[index];
        item.selected = !item.selected;
        viewModel.notifyPropertyChange('serviceCategories', viewModel.serviceCategories);
    };

    viewModel.onRegister = async () => {
        if (!viewModel.validateFields()) {
            return;
        }

        viewModel.set("isLoading", true);
        viewModel.set("errorMessage", "");

        try {
            // Create user in Firebase Auth
            const userCredential = await auth.signUp(viewModel.email, viewModel.password);
            
            // Create user data
            const userData = new User({
                id: userCredential.uid,
                name: viewModel.name,
                email: viewModel.email,
                phone: viewModel.phone,
                location: viewModel.location,
                experience: viewModel.experience,
                isServiceProvider: viewModel.isServiceProvider,
                services: viewModel.serviceCategories
                    .filter(cat => cat.selected)
                    .map(cat => cat.name)
            });

            // Save user data to Firestore
            await db.createUser(userCredential.uid, userData);

            Frame.topmost().navigate({
                moduleName: "pages/home/home-page",
                clearHistory: true
            });
        } catch (error) {
            viewModel.set("errorMessage", error.message);
        } finally {
            viewModel.set("isLoading", false);
        }
    };

    viewModel.validateFields = () => {
        if (!viewModel.name || !viewModel.email || !viewModel.password || !viewModel.phone || !viewModel.location) {
            viewModel.set("errorMessage", "Please fill in all required fields");
            return false;
        }

        if (viewModel.password.length < CONFIG.minPasswordLength) {
            viewModel.set("errorMessage", `Password must be at least ${CONFIG.minPasswordLength} characters long`);
            return false;
        }

        if (viewModel.isServiceProvider && !viewModel.experience) {
            viewModel.set("errorMessage", "Please enter your years of experience");
            return false;
        }

        return true;
    };

    viewModel.onBackToLogin = () => {
        Frame.topmost().goBack();
    };

    return viewModel;
}
```