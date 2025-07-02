import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../store/authStore'

export function usePlatformAuth() {
    const router = useRouter()
    const authStore = useAuthStore()

    const checkAuthAndRedirect = async () => {
        const isAuthenticated = await authStore.checkAuth()
        if (!isAuthenticated) {
            router.push('/login')
            return false
        }
        return true
    }

    onMounted(checkAuthAndRedirect)

    return {
        authStore,
        checkAuthAndRedirect
    }
}
