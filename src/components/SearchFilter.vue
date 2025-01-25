<script setup>
import { ref } from 'vue';
import { useOrganizationStore } from '../../stores/OrganizationsStore';

const store = useOrganizationStore();
const searchQuery = ref('');

let timeoutId;
const handleInput = () => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
        store.setSearchQuery(searchQuery.value);
    }, 300);
};

const clearSearch = () => {
    searchQuery.value = '';
    store.setSearchQuery('');
};
</script>

<template>
    <div class="search-filter">
        <input
            v-model="searchQuery"
            type="text"
            placeholder="Найти по ФИО директора"
            @input="handleInput"
        />
        <button v-if="searchQuery" @click="clearSearch">×</button>
    </div>
</template>

<style scoped lang="scss">
    .search-filter {
        display: flex;
        align-items: center;
    }

    input {
        padding: 5px 10px;
        width: 300px;
    }

    button {
        background: none;
        border: none;
        cursor: pointer;
        font-size: 20px;
        color: #888;
        padding: 8px 10px 15px;
    }

    button:hover {
        cursor: pointer;
        color: #f38a8a;
    }
</style>