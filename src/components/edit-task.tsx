import { putTask } from "@/actions/putTask";

import { TaskType } from "@/types/tasks";

import { Button } from "./ui/button";
import { Dialog, DialogClose, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { Input } from "./ui/input";

import { SquarePen } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

type TaskProps = {
    task: TaskType;
    handleGetTask: () => void;
}

const EditTask = ({ task, handleGetTask } : TaskProps) => {
    const [editedTask, setEditedTask] = useState<string>(task.task);

    const handleEditTask = async () => { 
        try {
            if (task.task !== editedTask) {
                toast.success('Tarefa editada com sucesso!');
            } else {
                toast.warning('Nenhuma alteração feita na tarefa.');
                return;
            }
    
            await putTask({ 
                id: task.id, 
                newTask: editedTask
            });
    
            handleGetTask();
        } catch (error) {
            toast.error('Erro ao editar a tarefa.');
        }
    }

    return (
        <Dialog>
            {/* asChild = ele vai herdar todas as coisas do botão */}
            <DialogTrigger asChild> 
            <SquarePen size={16} className="cursor-pointer" />
            </DialogTrigger>
            <DialogContent>
            <DialogHeader>
                <DialogTitle>Editar tarefa</DialogTitle>
            </DialogHeader>
            <div className="flex gap-2">
                <Input 
                    placeholder="Editar tarefa" 
                    value={editedTask}
                    onChange={(e) => setEditedTask(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleEditTask()}
                />
                <DialogClose asChild>
                    <Button 
                        className="cursor-pointer"
                        onClick={handleEditTask}
                    >Editar</Button>
                </DialogClose>
            </div>
            </DialogContent>
        </Dialog>
    )
}

export default EditTask;