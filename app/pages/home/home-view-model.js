import { Observable } from '@nativescript/core';
import { Frame } from '@nativescript/core';

export function createViewModel() {
    const viewModel = new Observable();

    viewModel.selectedTabIndex = 0;
    viewModel.services = [];
    
    // Mock data for demonstration
    viewModel.name = "John Doe";
    viewModel.email = "john@example.com";
    viewModel.phone = "+1234567890";
    viewModel.location = "New York, NY";
    viewModel.experience = "5";
    viewModel.isServiceProvider = true;
    viewModel.rating = 4.5;
    viewModel.ratingCount = 28;

    viewModel.onLogout = () => {
        // TODO: Implement logout logic
        Frame.topmost().navigate({
            moduleName: "pages/login/login-page",
            clearHistory: true
        });
    };

    viewModel.onEditProfile = () => {
        // TODO: Implement edit profile navigation
    };

    viewModel.onServiceTap = (args) => {
        const service = viewModel.services[args.index];
        // TODO: Navigate to service details page
    };

    // Load services
    viewModel.loadServices = async () => {
        try {
            // TODO: Implement service loading from Firebase
            viewModel.set("services", [
                {
                    name: "John's Plumbing",
                    location: "Brooklyn, NY",
                    rating: 4.5,
                    ratingCount: 28,
                    experience: "5"
                },
                // Add more mock data as needed
            ]);
        } catch (error) {
            console.error("Error loading services:", error);
        }
    };

    // Initial load
    viewModel.loadServices();

    return viewModel;
}