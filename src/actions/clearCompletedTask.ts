'use server'; // Garante que essa função roda apenas no servidor

import fs from "fs/promises";
import path from "path";

export const deleteCompletedTask = async () => {
    try {
        // Caminho do arquivo JSON onde as tarefas estão armazenadas
        const filePath = path.join(process.cwd(), 'public', 'data', 'tasks.json');
        
        // Lê o conteúdo do arquivo JSON
        const fileContent = await fs.readFile(filePath, 'utf-8');
        
        // Converte o JSON string para objeto JavaScript
        const data = JSON.parse(fileContent);

        // Filtra as tarefas, removendo as tarefas que estão marcadas como concluídas (done: true)
        const updatedTasks = data.tasks.filter((task: { done: boolean }) => !task.done);

        // Substitui o array de tarefas pelo array filtrado (sem as tarefas concluídas)
        data.tasks = updatedTasks;

        // Salva o arquivo JSON atualizado de volta no disco
        await fs.writeFile(filePath, JSON.stringify(data, null, 2), 'utf-8');
        
        // Retorna as tarefas atualizadas (sem as tarefas concluídas)
        return updatedTasks;
    } catch (error) {
        throw error;
    }
}