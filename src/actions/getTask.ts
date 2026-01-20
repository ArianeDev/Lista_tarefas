export const getTasks = async () => {
    try {
        const response = await fetch('/data/tasks.json');
        const data = await response.json();
    
        return data.tasks;
    } catch (error) {
        throw error;
    }
}