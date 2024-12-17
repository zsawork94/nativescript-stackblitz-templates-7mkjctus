```javascript
import { Observable } from '@nativescript/core';
import { Frame } from '@nativescript/core';
import { auth } from '../../shared/firebase';

export function createViewModel() {
    const viewModel = new Observable();

    viewModel.email = "";
    viewModel.password = "";
    viewModel.isLoading = false;
    viewModel.errorMessage = "";

    viewModel.onLogin = async () => {
        if (!viewModel.email || !viewModel.password) {
            viewModel.set("errorMessage", "Please fill in all fields");
            return;
        }

        viewModel.set("isLoading", true);
        viewModel.set("errorMessage", "");

        try {
            await auth.signIn(viewModel.email, viewModel.password);
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

    viewModel.onRegisterTap = () => {
        Frame.topmost().navigate("pages/register/register-page");
    };

    return viewModel;
}
```