
import { useState } from "react";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { format, isToday, isSameMonth, isBefore, startOfDay } from "date-fns";
import { useAppointments } from "@/hooks/use-appointments";

interface CalendarViewProps {
  selectedDate: Date | undefined;
  onSelect: (date: Date | undefined) => void;
  className?: string;
}

export function CalendarView({ selectedDate, onSelect, className }: CalendarViewProps) {
  const [month, setMonth] = useState<Date>(new Date());
  const { getAppointmentsByDate } = useAppointments();
  
  // Disable dates in the past and those with no available appointments
  const disabledDays = (date: Date) => {
    const today = startOfDay(new Date());
    return isBefore(date, today);
  };

  // Check if a date has available appointments
  const hasAppointments = (date: Date) => {
    const dateString = format(date, "yyyy-MM-dd");
    const appointments = getAppointmentsByDate(dateString);
    // We're mocking availability - in a real app, you'd check against available slots
    return true; // For demo, we'll assume all future dates have available appointments
  };

  return (
    <div className={cn("rounded-xl overflow-hidden", className)}>
      <div className="flex justify-between items-center py-3 px-3 booking-gradient">
        <button 
          onClick={() => {
            const newMonth = new Date(month);
            newMonth.setMonth(newMonth.getMonth() - 1);
            setMonth(newMonth);
          }}
          className="p-1 rounded-full hover:bg-white/20 transition-colors"
        >
          <ChevronLeft size={20} />
        </button>
        <h2 className="text-lg font-semibold">
          {format(month, "MMMM yyyy")}
        </h2>
        <button 
          onClick={() => {
            const newMonth = new Date(month);
            newMonth.setMonth(newMonth.getMonth() + 1);
            setMonth(newMonth);
          }}
          className="p-1 rounded-full hover:bg-white/20 transition-colors"
        >
          <ChevronRight size={20} />
        </button>
      </div>
      
      <CalendarComponent
        mode="single"
        selected={selectedDate}
        onSelect={onSelect}
        month={month}
        onMonthChange={setMonth}
        disabled={disabledDays}
        className="p-3 pointer-events-auto bg-white dark:bg-gray-900 border-none"
        classNames={{
          day_today: "bg-booking-light-blue dark:bg-booking-blue/30 text-primary-foreground",
          day_selected: "bg-booking-purple !text-primary-foreground hover:bg-booking-purple hover:text-primary-foreground focus:bg-booking-purple focus:text-primary-foreground",
        }}
        modifiers={{
          available: (date) => !disabledDays(date) && hasAppointments(date)
        }}
        modifiersClassNames={{
          available: "border-2 border-transparent hover:border-booking-blue rounded-md"
        }}
      />
    </div>
  );
}
