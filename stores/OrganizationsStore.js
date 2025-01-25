import {defineStore} from "pinia";

export const useOrganizationStore = defineStore('organizations', {
    state: () => ({
        allOrganizations: [
            {id: 0, name: 'ООО "Вектор"', director: 'Иванов И.И.', phone: '+70001234567'},
            {id: 1, name: 'ИП Сидоров С.С.', director: 'Сидоров С.С.', phone: '+7000567899'},
            {id: 2, name: 'ИП Сидоров С.С.', director: 'Сидоров С.С.', phone: '+7000567899'},
            {id: 3, name: 'ИП Сидоров С.С.', director: 'Сидоров С.С.', phone: '+7000567899'},
            {id: 4, name: 'ИП Сидоров С.С.', director: 'Сидоров С.С.', phone: '+7000567899'},
            {id: 5, name: 'ИП Сидоров С.С.', director: 'Сидоров С.С.', phone: '+7000567899'},
            {id: 6, name: 'ИП Сидоров С.С.', director: 'Сидоров С.С.', phone: '+7000567899'},
            {id: 7, name: 'ИП Сидоров С.С.', director: 'Сидоров С.С.', phone: '+7000567899'},
            {id: 8, name: 'ИП Сидоров С.С.', director: 'Сидоров С.С.', phone: '+7000567899'},
        ],

        currentPage: 1,
        itemsPerPage: 5,

        sortBy: 'director',
        sortOrder: 'asc',

        searchQuery: ''
    }),

    getters: {
        filteredOrganizations(state) {
            return state.allOrganizations.filter(org =>
                org.director.toLowerCase().includes(state.searchQuery.toLowerCase())
            );
        },

        sortedOrganizations(state) {
            return [...state.filteredOrganizations].sort((a, b) => {
                const order = state.sortOrder === 'asc' ? 1 : -1;
                return a[state.sortBy].localeCompare(b[state.sortBy]) * order;
            });
        },

        paginatedOrganizations(state) {
            const start = (state.currentPage - 1) * state.itemsPerPage;
            const end = start + state.itemsPerPage;
            return state.sortedOrganizations.slice(start, end);
        },

        totalPages(state) {
            return Math.ceil(state.filteredOrganizations.length / state.itemsPerPage);
        }
    },

    actions: {
        addOrganization(org) {
            this.allOrganizations.push({ id: Date.now(), ...org });
        },

        deleteOrganization(id) {
            this.allOrganizations = this.allOrganizations.filter(org => org.id !== id);
        },

        setSort(field) {
            if (this.sortBy === field) {
                this.sortOrder = this.sortOrder === 'asc' ? 'desc' : 'asc';
            } else {
                this.sortBy = field;
                this.sortOrder = 'asc';
            }
        },

        setSearchQuery(query) {
            this.searchQuery = query;
            this.currentPage = 1;
        },

        setPage(page) {
            if (page >= 1 && page <= this.totalPages) {
                this.currentPage = page;
            }
        }
    }
})