<script setup>
import OrganizationsTable from "./components/OrganizationsTable.vue";
import PaginationControls from "./components/PaginationControls.vue";
import SearchFilter from "./components/SearchFilter.vue";
import AddOrganizationModal from "./components/AddOrganizationModal.vue";
import {ref} from "vue";

const modalRef = ref(null);
</script>

<template>
    <div class="table-controls">
        <SearchFilter/>
        <button @click="modalRef.openModal()">Добавить</button>

    </div>
    <OrganizationsTable/>
    <pagination-controls/>
    <AddOrganizationModal ref="modalRef" />
</template>

<style scoped>
    .table-controls {
        display: flex;
        gap: 60px;
        justify-content: space-between;
        margin-bottom: 20px;

        button {
            font-size: 16px;
            padding: 7px 20px;
        }
    }
</style>
