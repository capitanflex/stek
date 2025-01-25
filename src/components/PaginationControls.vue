<script setup>
import {useOrganizationStore} from '../../stores/OrganizationsStore';

const store = useOrganizationStore();
</script>

<template>
    <div class="pagination">
        <button
            @click="store.setPage(store.currentPage - 1)"
            :disabled="store.currentPage === 1"
        >
            ←
        </button>

        <span>Страница {{ store.currentPage }} из {{ store.totalPages }}</span>

        <button
            @click="store.setPage(store.currentPage + 1)"
            :disabled="store.currentPage === store.totalPages"
        >
            →
        </button>
    </div>
</template>

<style scoped lang="scss">
    .pagination {
        display: flex;
        align-items: center;
        gap: 10px;
        margin-top: 20px;
        justify-content: flex-end;

        button {
            padding: 5px 10px 10px 10px;
            cursor: pointer;
        }

        button:disabled {
            opacity: 0.5;
            cursor: not-allowed;
        }
    }
</style>