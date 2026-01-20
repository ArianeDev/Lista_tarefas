import { SquarePen } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { TaskType } from "@/types/tasks";
import { useState } from "react";
import { toast } from "sonner";

type TaskProps = {
    task: TaskType;
}

const EditTask = ({ task } : TaskProps) => {
    const [editedTask, setEditedTask] = useState<string>(task.task);

    const handleEditTask = async () => { 
        if (task.task !== editedTask) {
            toast.success('Tarefa editada com sucesso!');
            
        } else {
            toast.warning('Nenhuma alteração feita na tarefa.');
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
                />
                <Button 
                    className="cursor-pointer"
                    onClick={handleEditTask}
                >Editar</Button>
            </div>
            </DialogContent>
        </Dialog>
    )
}

export default EditTask;