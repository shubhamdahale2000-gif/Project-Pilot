export const ValidationMessages = {
    firstName: {
        required: 'FirstName is required.',
        minlength: 'FirstName must be at least 6 characters.'
    }, 
    lastName: {
        required: 'LastName is required.',
        minlength: 'LastName must be at least 6 characters.'
    },
    email: {
        required: 'Email is required.',
        minlength: 'Email must be at least 6 characters.'
    },
    password: {
        required: 'Password is required.',
        minlength: 'Password must be at least 8 characters.'
    },
    confirmPassword: {
        required: 'Confirm Password is required.',
        minlength: 'Confirm Password must be at least 8 characters.',
        match: 'Passwords do not match.'
    }
}