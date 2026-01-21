'use server';

import { TaskType } from "@/types/tasks";
import fs from "fs/promises";
import path from "path";

export const postTask = async (task: string) => {
    try {
        if (!task) return;

        const filePath = path.join(process.cwd(), 'public', 'data', 'tasks.json');
        const fileContent = await fs.readFile(filePath, 'utf-8');
        const data = JSON.parse(fileContent);

        const newTask: TaskType = {
            id: data.tasks.length + Math.random(),
            task: task,
            done: false,
        };

        data.tasks.push(newTask);

        await fs.writeFile(filePath, JSON.stringify(data, null, 2), 'utf-8');

        return newTask;
    } catch (error) {
        throw error;
    }
}