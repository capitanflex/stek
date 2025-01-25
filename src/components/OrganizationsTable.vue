<script setup>
import {useOrganizationStore} from "../../stores/OrganizationsStore.js";

const store = useOrganizationStore();
</script>

<template>
    <div class="table">
        <table class="table__main main">
            <thead class="main__head head">
            <tr class="head__row">
                <td @click="store.setSort('name')">Название
                    <span v-if="store.sortBy === 'name' & store.sortOrder === 'asc'">↓</span>
                    <span v-if="store.sortBy === 'name' & store.sortOrder === 'desc'">↑</span>
                </td>
                <td @click="store.setSort('director')">ФИО директора
                    <span v-if="store.sortBy === 'director' & store.sortOrder === 'asc'">↓</span>
                    <span v-if="store.sortBy === 'director' & store.sortOrder === 'desc'">↑</span>
                </td>
                <td>Номер телефона</td>
                <td></td>
            </tr>
            </thead>
            <tbody class="main__body body">
                <tr class="body__row" v-for="org in store.paginatedOrganizations" :key="org.id">
                    <td>{{ org.name }}</td>
                    <td>{{ org.director }}</td>
                    <td>{{ org.phone }}</td>
                    <td @click="store.deleteOrganization(org.id)" class="delete-row">X</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<style scoped lang="scss">
.table {
    width: 100%;

    &__main {
        width: 100%;
        border: 1px solid white;
        border-radius: 13px;
        border-collapse: collapse;

        .main__head {
            .head__row {
                td {
                    border: 1px solid white;
                    padding: 10px;
                    text-align: center;
                    background-color: transparent;
                    color: white;
                }

                td:nth-last-child(1) {
                    min-width: 30px;
                }
            }
        }

        .main__body {
            .body__row {
                td {
                    border: 1px solid white;
                    padding: 10px;
                    text-align: left;
                    color: white;
                }
                .delete-row {
                    text-align: center;
                }
                .delete-row:hover {
                    cursor: pointer;
                    color: #f38a8a;
                }
            }
        }
    }
}
</style>