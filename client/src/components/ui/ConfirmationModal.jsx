import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import { useRef } from "react"
import { Trash2 } from "lucide-react"

const ConfirmationModal = ({ type, handleFunction, className="", iconOnly=false }) => {
    const closeRef = useRef(null)

    const handleClick = async () => {
        await handleFunction() // Execute the function (save/delete)
        closeRef.current?.click() // Manually click the Cancel button
    }

  return (
    <AlertDialog>
        <AlertDialogTrigger asChild>
        {iconOnly ? (
            <Button variant="ghost" size="icon" className={className}>
                <Trash2 className="size-6 " />
            </Button>
        ) : (
            <Button className={className}>{type}</Button>
        )}
        </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
            <AlertDialogTitle>Delete this plan?</AlertDialogTitle>
            <AlertDialogDescription>
                This action cannot be undone. This will permanently delete your plan and all associated expenses, and details.
            </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel ref={closeRef}>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleClick}>Continue</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export default ConfirmationModal
