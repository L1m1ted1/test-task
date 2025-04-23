import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {useState} from "react";
import {useForm} from "react-hook-form";
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import {useAppDispatch, useAppSelector} from "@/hooks.ts";
import {todoActions} from "@/state/slice/todoSlice.ts";


const todoSchema = z.object({
    name: z.string().min(1, "Name is required"),
    description: z.string().min(1, "Description is required"),
    status: z.boolean(),
})

type TodoFormValues = z.infer<typeof todoSchema>

export function CreateTodoDialog() {

    const [isDialogOpen, setIsDialogOpen] = useState(false)

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<TodoFormValues>({
        resolver: zodResolver(todoSchema),
        defaultValues: {
            name: "name",
            description: "description",
            status: false,
        },
    })

    const dispatch = useAppDispatch()
    const invoices = useAppSelector(state => state.todo)
    const id = invoices.length +1
    const onSubmit = (data: TodoFormValues) => {

        dispatch(todoActions.addTodo({id, ...data}))
        setIsDialogOpen(false)
        reset()
    }

    return (
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
                <Button variant="outline">Add To-Do</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>New To-Do</DialogTitle>
                    <DialogDescription>
                        Create new todo
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
                        <input
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
    )
}
