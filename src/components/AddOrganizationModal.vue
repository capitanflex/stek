<script setup>
import {ref} from 'vue';
import {useOrganizationStore} from '../../stores/OrganizationsStore';

const store = useOrganizationStore();
const isModalOpen = ref(false);
const newOrg = ref({name: '', director: '', phone: ''});

const openModal = () => {
    isModalOpen.value = true;
};

const closeModal = () => {
    isModalOpen.value = false;
    newOrg.value = {name: '', director: '', phone: ''}; // Сброс формы
};

const handleSubmit = () => {
    store.addOrganization(newOrg.value);
    closeModal();
};

defineExpose({openModal});
</script>

<template>
    <div v-if="isModalOpen" class="modal-overlay">
        <div class="modal">
            <h2>Добавить организацию</h2>
            <form @submit.prevent="handleSubmit">
                <div class="form-group">
                    <input placeholder="Название организации" v-model="newOrg.name" id="name" required/>
                </div>

                <div class="form-group">
                    <input placeholder="ФИО директора" v-model="newOrg.director" id="director" required/>
                </div>

                <div class="form-group">
                    <input placeholder="Телефон" v-model="newOrg.phone" id="phone" required/>
                </div>

                <div class="modal-actions">
                    <button type="button" @click="closeModal">Отмена</button>
                    <button type="submit">Ок</button>
                </div>
            </form>
        </div>
    </div>
</template>


<style scoped lang="scss">
.modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;

    .modal {
        padding: 20px;
        border-radius: 8px;
        width: 400px;
        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
        background: #242424;
        text-align: left;

        h2 {
            margin-top: 0;
            text-align: center;
        }

        .form-group {
            margin-bottom: 15px;

            label {
                display: block;
                margin-bottom: 5px;
            }

            input {
                width: 100%;
                padding: 8px;
                box-sizing: border-box;
            }
        }

        .modal-actions {
            display: flex;
            justify-content: flex-end;
            gap: 10px;

            button {
                padding: 8px 16px;
                cursor: pointer;
                border: none;
                border-radius: 4px;
                background: #007bff;
                color: white;
            }

            button[type="button"] {
                background: #6c757d;
            }

            button:hover {
                opacity: 0.9;
            }
        }
    }
}


</style>