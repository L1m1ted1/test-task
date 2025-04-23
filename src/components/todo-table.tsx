import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Trash2 } from 'lucide-react';
import {useAppDispatch, useAppSelector} from "@/hooks.ts";
import {todoActions} from "@/state/slice/todoSlice.ts";
import { Check } from 'lucide-react';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog.tsx";
import {Button} from "@/components/ui/button.tsx";
import {Label} from "@/components/ui/label.tsx";
import {Input} from "@/components/ui/input.tsx";
import {useState} from "react";
import {useForm} from "react-hook-form";


import {zodResolver} from "@hookform/resolvers/zod";
import {z} from "zod";
const todoSchema = z.object({
    name: z.string().min(1, "Name is required"),
    description: z.string().min(1, "Description is required"),
    status: z.boolean(),
})

type TodoFormValues = z.infer<typeof todoSchema>

interface ISelectedState {
    id: number;
    name: string;
    description: string;
    status: boolean;
}

export function TodoTable() {
    const dispatch = useAppDispatch()
    const invoices = useAppSelector(state => state.todo)

    const [isDialogOpen, setIsDialogOpen] = useState(false)
    const [selectedTodo, setSelectedTodo] = useState<ISelectedState>(null)

    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue,
    } = useForm<TodoFormValues>({
        resolver: zodResolver(todoSchema),
    })

    const onSubmit = (data: TodoFormValues) => {
        dispatch(todoActions.editTodo({id: selectedTodo.id, ...data}))
        setIsDialogOpen(false)
    }
    const handleRowClick = (invoice: ISelectedState) => {
        setSelectedTodo(invoice)
        setValue("name", invoice.name)
        setValue("description", invoice.description)
        setValue("status", invoice.status)
        setIsDialogOpen(true)
    }

    return (
        <>
            <Table className={'rounded-md border'}>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[100px]">Name</TableHead>
                        <TableHead>Description</TableHead>
                        <TableHead>Status</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {invoices.map((invoice) => (
                        <TableRow key={invoice.id} >
                            <TableCell className="font-medium">{invoice.name}</TableCell>
                            <TableCell>{invoice.description}</TableCell>
                            <TableCell onClick={() => dispatch(todoActions.toggleStatus(invoice.id))}>
                                <div className={'border-gray-800 border-1 w-[26px] h-[26px] rounded-md'}>
                                    {invoice.status && <Check></Check>}
                                </div>
                            </TableCell>
                            <TableCell onClick={() => handleRowClick(invoice)}>Change</TableCell>
                            <TableCell className="text-right w-10 text-gray-700"><Trash2 className={'w-5 z-10'}
                            onClick={() => dispatch(todoActions.deleteTodo(invoice.id))}/></TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>


            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Edit To-Do</DialogTitle>
                        <DialogDescription>
                            Edit todo
                        </DialogDescription>
                    </DialogHeader>
                    <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="name" className="text-right">
                                Name
                            </Label>
                            <Input
                                id="name"
                                {...register("name")}
                                className="col-span-3"
                            />
                            {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
                        </div>

                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="description" className="text-right">
                                Description
                            </Label>
                            <Input
                                id="description"
                                {...register("description")}
                                className="col-span-3"
                            />
                            {errors.description && <p className="text-red-500 text-sm">{errors.description.message}</p>}
                        </div>

                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="status" className="text-right">
                                Status
                            </Label>
                            <Input
                                id="status"
                                type="checkbox"
                                {...register("status")}
                                className="col-span-3 w-6 h-6 rounded-md border-gray-800 bg-white border-2 focus:ring-2 focus:ring-primary"
                            />
                        </div>
                        <DialogFooter>
                            <Button type="submit">Save changes</Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>
        </>
    );
}