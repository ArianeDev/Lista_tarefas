// Diretiva que indica que esta função será executada no servidor (Next.js Server Action)
'use server';

// Importa o módulo de sistema de arquivos (versão com Promises) e o módulo de manipulação de caminhos
import fs from "fs/promises";
import path from "path";

// Define o tipo de dados que a função receberá como parâmetro
type EditTaskProps = {
    id: number;        // ID da tarefa que será editada
    newTask: string;   // Novo texto para atualizar a tarefa
}

/**
 * Função assíncrona que atualiza uma tarefa existente no arquivo JSON
 * @param id - ID da tarefa a ser editada
 * @param newTask - Novo conteúdo/texto da tarefa
 * @returns A tarefa atualizada
 */
export const putTask = async ({id, newTask} : EditTaskProps) => {
    try {
        // Constrói o caminho completo para o arquivo tasks.json
        // process.cwd() retorna o diretório raiz do projeto
        const filePath = path.join(process.cwd(), 'public', 'data', 'tasks.json');
        
        // Lê o conteúdo do arquivo JSON como texto (utf-8)
        const data = await fs.readFile(filePath, 'utf-8');
        
        // Converte o texto JSON em um objeto JavaScript
        const tasksList = JSON.parse(data);
        
        // Busca o índice da tarefa no array usando o ID fornecido
        // Retorna -1 se não encontrar nenhuma tarefa com esse ID
        const taskIndex = tasksList.tasks.findIndex((item: { id: number; }) => item.id === id);

        // Verifica se a tarefa foi encontrada
        if (taskIndex === -1) {
            throw new Error('Tarefa não encontrada');
        }

        // Atualiza o texto da tarefa encontrada com o novo valor
        tasksList.tasks[taskIndex].task = newTask;
        
        // Salva o objeto atualizado de volta no arquivo JSON
        // JSON.stringify com (null, 2) formata o JSON com indentação de 2 espaços
        await fs.writeFile(filePath, JSON.stringify(tasksList, null, 2), 'utf-8');
        
        // Retorna a tarefa que foi atualizada
        return tasksList.tasks[taskIndex];
    } catch (error) {
        // Propaga qualquer erro que ocorrer durante o processo
        throw error;
    }
}