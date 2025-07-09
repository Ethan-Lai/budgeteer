import { useEffect, useState } from "react"
import { CalendarIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Input } from "@/components/ui/input"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { formatDate, isValidDate } from "@/lib/utils"

export function DatePicker({ date, onDateChange, placeholder = "Select date...", required, className="", disabled=false }) {
  const [open, setOpen] = useState(false)
  const [month, setMonth] = useState(date || new Date())
  const [value, setValue] = useState(formatDate(date))

  // This was added since PlanCardEdit wouldn't load the dates
  // This allows us to see the actual dates instead of just "select date..."
  useEffect(() => {
    setValue(formatDate(date))
  }, [date])

  return (
    <div className="flex flex-col gap-3">
      <div className="relative flex gap-2">
        <Input
          value={value}
          placeholder={placeholder}
          className={`bg-background pr-10 ${className}`}
          onChange={(e) => {
            const newDate = new Date(e.target.value)
            setValue(e.target.value)
            if (isValidDate(newDate)) {
              onDateChange(newDate) // Send date back to parent
              setMonth(newDate)
            }
          }}
          onKeyDown={(e) => {
            if (e.key === "ArrowDown") {
              e.preventDefault()
              setOpen(true)
            }
          }}
          required={required}
          disabled={disabled}
        />
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="ghost"
              className="absolute top-1/2 right-2 size-6 -translate-y-1/2"
            >
              <CalendarIcon className="size-3.5" />
              <span className="sr-only">Select date</span>
            </Button>
          </PopoverTrigger>
          <PopoverContent
            className="w-auto overflow-hidden p-0"
            align="end"
            alignOffset={-8}
            sideOffset={10}
          >
            <Calendar
              mode="single"
              selected={date}
              captionLayout="dropdown"
              month={month}
              onMonthChange={setMonth}
              onSelect={(selectedDate) => {
                onDateChange(selectedDate) // Send date back to parent
                setValue(formatDate(selectedDate))
                setOpen(false)
              }}
              disabled={disabled}
            />
          </PopoverContent>
        </Popover>
      </div>
    </div>
  )
}

export default DatePicker