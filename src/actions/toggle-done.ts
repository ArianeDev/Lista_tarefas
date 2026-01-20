'use server'; // Garante que essa função roda apenas no servidor

import fs from "fs/promises";
import path from "path";

export const toggleDone = async (id: number) => {
    try {
        // Validação: se não tiver ID, não faz nada
        if (!id) return;

        // Caminho do arquivo JSON onde as tarefas estão armazenadas
        const filePath = path.join(process.cwd(), 'public', 'data', 'tasks.json');
        
        // Lê o conteúdo do arquivo JSON
        const fileContent = await fs.readFile(filePath, 'utf-8');
        
        // Converte o JSON string para objeto JavaScript
        const data = JSON.parse(fileContent);

        // Percorre todas as tarefas e inverte o status 'done' da tarefa com o ID especificado
        const updatedTasks = data.tasks.map((task: { id: number; done: boolean }) => {
            // Se encontrar a tarefa com o ID correto
            if (task.id === id) {
                // Retorna a tarefa com o status 'done' invertido (true vira false, false vira true)
                return {
                    ...task, // Mantém todas as outras propriedades da tarefa
                    done: !task.done, // Inverte o valor de 'done'
                };
            }
            // Se não for a tarefa procurada, retorna ela sem modificar
            return task;
        });

        // Substitui o array de tarefas pelo array atualizado
        data.tasks = updatedTasks;
        
        // Salva o arquivo JSON atualizado de volta no disco
        // JSON.stringify com null, 2 deixa o arquivo formatado e legível
        await fs.writeFile(filePath, JSON.stringify(data, null, 2), 'utf-8');
        
        // Retorna as tarefas atualizadas
        return updatedTasks;
        
    } catch (error) {
        throw error;
    }
}