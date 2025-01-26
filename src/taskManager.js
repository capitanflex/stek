class TaskManager {
    constructor(maxTasks) {
        this.maxTasks = maxTasks;
        this.tasks = [];
        this.runningTasks = 0;
    }

    addTask(asyncTask, priority, dependencies) {
        const taskId = this.tasks.length + 1;
        this.tasks.push({id: 'task' + taskId, func: asyncTask, priority, dependencies, status: 'todo'})
    }

    async executeTasks() {
        while (this.getToDoTasks().length !== 0) {
            if (this.runningTasks < this.maxTasks) {
                const todoTask = this.getPriorityTask();

                if (todoTask === undefined) {
                    console.error('Нет задач, готовых к выполнению');
                    await new Promise(resolve => setTimeout(resolve, 100));
                    continue;
                }

                todoTask.status = 'running';
                this.runningTasks++;
                try {
                    await todoTask.func();
                    todoTask.status = 'complete';
                } catch (e) {
                    todoTask.status = 'failed';
                    console.error(`Ошибка в задаче ${todoTask.id}:`, e);
                } finally {
                    this.runningTasks--;
                }
            } else {
                await new Promise(resolve => setTimeout(resolve, 100));
            }
        }
    }

    getToDoTasks() {
        return this.tasks.filter(task => {
            return task.status === 'todo';
        })

    }

    getPriorityTask() {
        const todoTasks = this.getToDoTasks();
        const prioritySort = todoTasks.sort((a, b) => b.priority - a.priority);

        for (const task of prioritySort) {
            let allDependenciesCompleted = true;

            for (const dependence of task.dependencies) {
                const dependentTask = this.tasks.find(t => t.id === dependence);
                if (!dependentTask || dependentTask.status !== 'complete') {
                    allDependenciesCompleted = false;
                    break;
                }
            }

            if (allDependenciesCompleted) {
                return task;
            }
        }

        this.tasks.filter(task => {
            if (task.status === 'todo') task.status = 'cancelled';
        })
        return undefined;
    }

    getStatus() {
        return this.tasks.map(task => ({
            id: task.id,
            status: task.status
        }));
    }
}

// Создание экземпляра TaskManager
const taskManager = new TaskManager(2); // Устанавливаем максимальное количество одновременно выполняемых задач на 2
// Добавление задач
taskManager.addTask(async () => {
    console.log('Выполнение задачи 1');
    await new Promise(resolve => setTimeout(resolve, 2000));
    console.log('Задача 1 завершена');
}, 2, []);
taskManager.addTask(async () => {
    console.log('Выполнение задачи 2');
    await new Promise(resolve => setTimeout(resolve, 1000));
    console.log('Задача 2 завершена');
}, 1, ['task1']);
taskManager.addTask(async () => {
    console.log('Выполнение задачи 3');
    await new Promise(resolve => setTimeout(resolve, 500));
    console.log('Задача 3 завершена');
}, 3, []);
taskManager.addTask(async () => {
    console.log('Выполнение задачи 4');
    await new Promise(resolve => setTimeout(resolve, 3000));
    console.log('Задача 4 завершена');
}, 1, ['task2', 'task3']);
// Выполнение задач
taskManager.executeTasks().then(() => {
    console.log('Все задачи выполнены');
// Получение и вывод статуса всех задач после выполнения
    console.log('Статус задач после выполнения:', taskManager.getStatus());
}).catch(error => {
    console.error('Ошибка при выполнении задач:', error);
});
// Пример использования getStatus во время выполнения задач
const intervalId = setInterval(() => {
    const status = taskManager.getStatus();
    console.log('Текущий статус задач:', status);
// Остановка интервала, когда все задачи будут выполнены
    if (Object.values(status).every(s => s === 'completed' || s === 'failed' || s ===
        'cancelled')) {
        clearInterval(intervalId);
    }
}, 500);
// Пример добавления и выполнения дополнительных задач
taskManager.addTask(async () => {
    console.log('Выполнение задачи 5');
    await new Promise((_, reject) => setTimeout(() => reject(new Error('Ошибка в задаче 5')), 1500));
}, 2, []);
taskManager.addTask(async () => {
    console.log('Выполнение задачи 6');
    await new Promise(resolve => setTimeout(resolve, 1000));
    console.log('Задача 6 завершена');
}, 1, []);
taskManager.addTask(async () => {
    console.log('Выполнение задачи 7');
    await new Promise(resolve => setTimeout(resolve, 2500));
    console.log('Задача 7 завершена');
}, 2, ['task5']);
// Выполнение дополнительных задач
taskManager.executeTasks().then(() => {
    console.log('Все дополнительные задачи выполнены');
// Получение и вывод статуса всех задач после выполнения дополнительных задач
    console.log('Статус задач после выполнения дополнительных задач:',
        taskManager.getStatus());
}).catch(error => {
    console.error('Ошибка при выполнении дополнительных задач:', error);
});