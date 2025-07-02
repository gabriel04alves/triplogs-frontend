import { ref } from 'vue'

export function useNotifications() {
    const errorMessage = ref('')
    const successMessage = ref('')
    const showErrorMessage = ref(false)
    const showSuccessMessage = ref(false)

    const showSuccess = (message, timeout = 3000) => {
        successMessage.value = message
        showSuccessMessage.value = true
        
        if (timeout > 0) {
            setTimeout(() => {
                showSuccessMessage.value = false
            }, timeout)
        }
    }

    const showError = (message, timeout = 5000) => {
        errorMessage.value = message
        showErrorMessage.value = true
        
        if (timeout > 0) {
            setTimeout(() => {
                showErrorMessage.value = false
            }, timeout)
        }
    }

    const clearMessages = () => {
        errorMessage.value = ''
        successMessage.value = ''
        showErrorMessage.value = false
        showSuccessMessage.value = false
    }

    return {
        // Estado
        errorMessage,
        successMessage,
        showErrorMessage,
        showSuccessMessage,
        
        // Métodos
        showSuccess,
        showError,
        clearMessages
    }
}
