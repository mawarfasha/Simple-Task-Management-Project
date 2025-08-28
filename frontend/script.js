class TaskManager {
    constructor() {
        this.tasks = this.loadTasks();
        this.currentFilter = 'all';
        this.init();
    }

    init() {
        this.bindEvents();
        this.updateStats();
        this.renderTasks();
        this.setMinDate();
    }

    bindEvents() {
        document.getElementById('taskForm').addEventListener('submit', (e) => {
            e.preventDefault();
            this.addTask();
        });

        document.querySelectorAll('.filter-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.setFilter(e.target.dataset.filter);
            });
        });
    }

    setMinDate() {
        const today = new Date().toISOString().split('T')[0];
        document.getElementById('taskDueDate').setAttribute('min', today);
    }

    addTask() {
        const title = document.getElementById('taskTitle').value.trim();
        const description = document.getElementById('taskDescription').value.trim();
        const priority = document.getElementById('taskPriority').value;
        const dueDate = document.getElementById('taskDueDate').value;

        if (!title) return;

        const task = {
            id: Date.now(),
            title,
            description,
            priority,
            dueDate,
            completed: false,
            createdAt: new Date().toISOString()
        };

        this.tasks.unshift(task);
        this.saveTasks();
        this.updateStats();
        this.renderTasks();
        this.resetForm();
        this.showNotification('Task created successfully');
    }

    toggleComplete(id) {
        const task = this.tasks.find(t => t.id === id);
        if (task) {
            task.completed = !task.completed;
            task.completedAt = task.completed ? new Date().toISOString() : null;
            this.saveTasks();
            this.updateStats();
            this.renderTasks();
            
            const message = task.completed ? 'Task completed' : 'Task reopened';
            this.showNotification(message);
        }
    }

    deleteTask(id) {
        const taskElement = document.querySelector(`[data-task-id="${id}"]`);
        if (taskElement) {
            taskElement.classList.add('slide-out');
            setTimeout(() => {
                this.tasks = this.tasks.filter(t => t.id !== id);
                this.saveTasks();
                this.updateStats();
                this.renderTasks();
                this.showNotification('Task deleted');
            }, 400);
        }
    }

    setFilter(filter) {
        this.currentFilter = filter;
        document.querySelectorAll('.filter-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        document.querySelector(`[data-filter="${filter}"]`).classList.add('active');
        this.renderTasks();
    }

    getFilteredTasks() {
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        switch (this.currentFilter) {
            case 'pending':
                return this.tasks.filter(t => !t.completed);
            case 'completed':
                return this.tasks.filter(t => t.completed);
            case 'high':
                return this.tasks.filter(t => t.priority === 'high');
            case 'overdue':
                return this.tasks.filter(t => {
                    if (!t.dueDate || t.completed) return false;
                    const dueDate = new Date(t.dueDate);
                    return dueDate < today;
                });
            default:
                return this.tasks;
        }
    }

    renderTasks() {
        const container = document.getElementById('tasksContainer');
        const filteredTasks = this.getFilteredTasks();

        if (filteredTasks.length === 0) {
            container.innerHTML = `
                <div class="empty-state">
                    <div class="empty-icon">📝</div>
                    <div class="empty-text">No tasks found for the current filter.</div>
                </div>
            `;
            return;
        }

        container.innerHTML = filteredTasks.map(task => this.createTaskHTML(task)).join('');
    }

    createTaskHTML(task) {
        const isOverdue = task.dueDate && new Date(task.dueDate) < new Date() && !task.completed;
        const dueDateFormatted = task.dueDate ? new Date(task.dueDate).toLocaleDateString('en-US', { 
            month: 'short', 
            day: 'numeric',
            year: 'numeric'
        }) : 'No due date';
        
        return `
            <article class="task-card ${task.completed ? 'completed' : ''} fade-in" data-task-id="${task.id}">
                <header class="task-header">
                    <h3 class="task-title">${this.escapeHtml(task.title)}</h3>
                    <div class="task-meta">
                        <span class="priority-badge priority-${task.priority}">${task.priority}</span>
                        <span class="task-date" style="${isOverdue ? 'color: var(--error-red); font-weight: 600;' : ''}">
                            ${isOverdue ? 'Overdue • ' : ''}${dueDateFormatted}
                        </span>
                    </div>
                </header>
                ${task.description ? `<p class="task-description">${this.escapeHtml(task.description)}</p>` : ''}
                <footer class="task-actions">
                    <button class="task-btn complete-btn" onclick="taskManager.toggleComplete(${task.id})">
                        ${task.completed ? 'Reopen' : 'Complete'}
                    </button>
                    <button class="task-btn delete-btn" onclick="taskManager.deleteTask(${task.id})">
                        Delete
                    </button>
                </footer>
            </article>
        `;
    }

    updateStats() {
        const total = this.tasks.length;
        const completed = this.tasks.filter(t => t.completed).length;
        const pending = total - completed;
        const completionRate = total > 0 ? Math.round((completed / total) * 100) : 0;

        this.animateNumber('totalTasks', total);
        this.animateNumber('completedTasks', completed);
        this.animateNumber('pendingTasks', pending);
        this.animateNumber('completionRate', completionRate, '%');
    }

    animateNumber(elementId, targetValue, suffix = '') {
        const element = document.getElementById(elementId);
        // Clear any existing animation
        if (element.animationTimer) {
            clearInterval(element.animationTimer);
        }
        
        // Just set the value directly for now to avoid animation bugs
        element.textContent = targetValue + suffix;
    }

    resetForm() {
        document.getElementById('taskForm').reset();
        document.getElementById('taskPriority').value = 'medium';
    }

    saveTasks() {
        // Simulate API call
        console.log('💾 Saving tasks to database...');
    }

    loadTasks() {
        // Sample data with Apple-style messaging
        return [
            {
                id: 1,
                title: "Welcome to TaskFlow",
                description: "This is your first task. TaskFlow helps you stay organized and focused on what matters most.",
                priority: "medium",
                dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
                completed: false,
                createdAt: new Date().toISOString()
            },
            {
                id: 2,
                title: "Review quarterly goals",
                description: "Take time to reflect on progress and adjust objectives for the upcoming quarter.",
                priority: "high",
                dueDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
                completed: false,
                createdAt: new Date().toISOString()
            }
        ];
    }

    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    showNotification(message) {
        // Remove existing notifications
        const existing = document.querySelector('.notification');
        if (existing) {
            existing.remove();
        }

        const notification = document.createElement('div');
        notification.className = 'notification';
        notification.textContent = message;
        document.body.appendChild(notification);

        // Trigger show animation
        setTimeout(() => notification.classList.add('show'), 100);
        
        // Auto hide
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => notification.remove(), 400);
        }, 3000);
    }
}

// Initialize the app
const taskManager = new TaskManager();

// Apple-style console logging
console.log('🍎 TaskFlow initialized');
console.log('Built with Apple design principles');
console.log('Showcasing modern web development skills');
