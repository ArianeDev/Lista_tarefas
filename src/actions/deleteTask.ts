'use server'; // Garante que essa função roda apenas no servidor

import fs from "fs/promises";
import path from "path";

export const deleteTask = async (id: number) => {
    try {
        // Validação: se não tiver ID, não faz nada
        if (!id) return;

        // Caminho do arquivo JSON onde as tarefas estão armazenadas
        const filePath = path.join(process.cwd(), 'public', 'data', 'tasks.json');
        
        // Lê o conteúdo do arquivo JSON
        const fileContent = await fs.readFile(filePath, 'utf-8');
        
        // Converte o JSON string para objeto JavaScript
        const data = JSON.parse(fileContent);

        // Filtra as tarefas, removendo a tarefa com o ID especificado
        // Mantém apenas as tarefas cujo ID é DIFERENTE do ID que queremos deletar
        const updatedTasks = data.tasks.filter((task: { id: number }) => task.id !== id);

        // Substitui o array de tarefas pelo array filtrado (sem a tarefa deletada)
        data.tasks = updatedTasks;
        
        // Salva o arquivo JSON atualizado de volta no disco
        // JSON.stringify com null, 2 deixa o arquivo formatado e legível
        await fs.writeFile(filePath, JSON.stringify(data, null, 2), 'utf-8');
        
        // Retorna as tarefas atualizadas (sem a tarefa deletada)
        return updatedTasks;
        
    } catch (error) {
        throw error;
    }
}