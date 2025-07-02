<template>
    <div v-if="showSearch" class="px-15 mt-6">
        <v-text-field 
            class="search-field text-white" 
            v-model="searchQuery"
            label="Buscar por título ou localização..." 
            prepend-inner-icon="mdi-magnify" 
            variant="plain" 
            clearable
            hide-details 
            color="lime" 
            style="max-width: 400px;"
            @update:model-value="$emit('update:search', $event)">
        </v-text-field>

        <div v-if="showResultCount" class="mt-2">
            <v-chip size="small" color="lime" variant="outlined">
                {{ filteredCount }} de {{ totalCount }} viagens encontradas
            </v-chip>
        </div>
    </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
    modelValue: {
        type: String,
        default: ''
    },
    totalCount: {
        type: Number,
        default: 0
    },
    filteredCount: {
        type: Number,
        default: 0
    },
    showSearch: {
        type: Boolean,
        default: true
    }
})

const emit = defineEmits(['update:search'])

const searchQuery = computed({
    get: () => props.modelValue,
    set: (value) => emit('update:search', value)
})

const showResultCount = computed(() => {
    return props.modelValue && props.filteredCount !== props.totalCount
})
</script>
