
import { useState, useEffect } from "react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { useAppointments } from "@/hooks/use-appointments";
import { Clock } from "lucide-react";

interface TimeSlotsProps {
  selectedDate: Date | undefined;
  onSelectTime: (time: string) => void;
  selectedTime: string | null;
  className?: string;
}

export function TimeSlots({ 
  selectedDate, 
  onSelectTime, 
  selectedTime,
  className 
}: TimeSlotsProps) {
  const { isTimeSlotAvailable } = useAppointments();
  const [timeSlots, setTimeSlots] = useState<Array<{time: string, available: boolean}>>([]);
  
  useEffect(() => {
    if (!selectedDate) {
      setTimeSlots([]);
      return;
    }
    
    const dateStr = format(selectedDate, "yyyy-MM-dd");
    
    // Generate time slots from 9 AM to 5 PM
    const slots = [];
    for (let hour = 9; hour < 17; hour++) {
      for (let minute = 0; minute < 60; minute += 30) {
        const timeStr = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
        // In a real app, you'd check against your backend for actual availability
        // Here we're simulating some random availability
        const isAvailable = isTimeSlotAvailable(dateStr, timeStr) && Math.random() > 0.3;
        slots.push({ time: timeStr, available: isAvailable });
      }
    }
    
    setTimeSlots(slots);
  }, [selectedDate, isTimeSlotAvailable]);
  
  if (!selectedDate) {
    return (
      <div className={cn("p-6 text-center glass-card animate-fade-in", className)}>
        <p className="text-muted-foreground">Please select a date to view available time slots</p>
      </div>
    );
  }
  
  return (
    <div className={cn("glass-card p-4", className)}>
      <div className="flex items-center gap-2 mb-4 text-lg font-semibold">
        <Clock size={20} />
        <h3>Available Times</h3>
      </div>
      
      {timeSlots.length > 0 ? (
        <div className="grid grid-cols-3 gap-2 md:grid-cols-4">
          {timeSlots.map((slot) => (
            <button
              key={slot.time}
              onClick={() => slot.available && onSelectTime(slot.time)}
              disabled={!slot.available}
              className={cn(
                "py-2 px-3 rounded-lg text-sm font-medium transition-all duration-200 animate-scale-in",
                slot.available 
                  ? "hover:scale-105 active:scale-95" 
                  : "opacity-50 cursor-not-allowed",
                selectedTime === slot.time
                  ? "booking-gradient"
                  : slot.available
                    ? "bg-white dark:bg-gray-800 hover:bg-booking-light-purple dark:hover:bg-booking-purple/50"
                    : "bg-gray-100 dark:bg-gray-700"
              )}
            >
              {slot.time}
            </button>
          ))}
        </div>
      ) : (
        <p className="text-center text-muted-foreground">No available time slots for the selected date</p>
      )}
    </div>
  );
}
