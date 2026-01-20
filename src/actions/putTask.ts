'use server';

import fs from "fs/promises";
import path from "path";

type EditTaskProps = {
    id: number;
    task: string;
}

export const putTask = async ({id, task} : EditTaskProps) => {
    try {

    } catch (error) {
        throw error;
    }
}