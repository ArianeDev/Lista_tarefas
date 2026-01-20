import { SquarePen } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

const EditTask = () => {
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
                <Input placeholder="Editar tarefa"/>
                <Button className="cursor-pointer">Editar</Button>
            </div>
            </DialogContent>
        </Dialog>
    )
}

export default EditTask;