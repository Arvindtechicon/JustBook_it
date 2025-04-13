
import { useAppointments } from "@/hooks/use-appointments";
import { format, parseISO, isAfter, isFuture } from "date-fns";
import { Calendar, Clock } from "lucide-react";

export function RecentAppointments() {
  const { appointments } = useAppointments();
  
  // Get upcoming appointments, sorted by date
  const now = new Date();
  const upcomingAppointments = appointments
    .filter(app => {
      const appDate = parseISO(app.date + "T" + app.time);
      return isAfter(appDate, now);
    })
    .sort((a, b) => {
      return parseISO(a.date + "T" + a.time).getTime() - parseISO(b.date + "T" + b.time).getTime();
    })
    .slice(0, 3); // Get only the next 3 appointments
  
  if (upcomingAppointments.length === 0) {
    return null;
  }
  
  return (
    <div className="glass-card p-6 animate-fade-in">
      <h3 className="text-xl font-semibold mb-4">Upcoming Appointments</h3>
      
      <div className="space-y-3">
        {upcomingAppointments.map(appointment => (
          <div 
            key={appointment.id} 
            className="rounded-lg p-4 bg-gradient-to-r from-booking-light-blue/80 to-booking-light-purple/80 dark:from-booking-blue/20 dark:to-booking-purple/20"
          >
            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center text-sm font-medium">
                  <Calendar className="mr-2 h-4 w-4" />
                  {format(parseISO(appointment.date), "MMMM d, yyyy")}
                </div>
                <div className="flex items-center text-sm text-muted-foreground mt-1">
                  <Clock className="mr-2 h-4 w-4" />
                  {appointment.time}
                </div>
              </div>
              <div className="text-sm text-right">
                <p className="font-medium">{appointment.name}</p>
                <p className="text-xs text-muted-foreground">{appointment.email}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
