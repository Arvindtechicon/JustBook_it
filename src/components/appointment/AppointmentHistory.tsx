
import { useState } from "react";
import { useAppointments, Appointment } from "@/hooks/use-appointments";
import { Button } from "@/components/ui/button";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import { format, parseISO, isAfter } from "date-fns";
import { Clock, Calendar, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export function AppointmentHistory() {
  const { appointments, removeAppointment } = useAppointments();
  const { toast } = useToast();
  const [filter, setFilter] = useState<"all" | "upcoming" | "past">("all");
  
  const sortedAppointments = [...appointments].sort((a, b) => {
    return parseISO(a.date + "T" + a.time).getTime() - parseISO(b.date + "T" + b.time).getTime();
  });
  
  const now = new Date();
  
  const filteredAppointments = sortedAppointments.filter((app) => {
    const appointmentDate = parseISO(app.date + "T" + app.time);
    
    if (filter === "upcoming") {
      return isAfter(appointmentDate, now);
    } else if (filter === "past") {
      return !isAfter(appointmentDate, now);
    }
    return true;
  });
  
  const handleCancel = (appointment: Appointment) => {
    removeAppointment(appointment.id);
    toast({
      title: "Appointment Cancelled",
      description: `Your appointment on ${format(parseISO(appointment.date), "MMMM d, yyyy")} at ${appointment.time} has been cancelled.`,
    });
  };
  
  return (
    <div className="glass-card p-6 animate-fade-in">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-semibold">Your Appointments</h3>
        
        <div className="flex space-x-2">
          <Button 
            variant={filter === "all" ? "default" : "outline"} 
            size="sm"
            onClick={() => setFilter("all")}
            className={filter === "all" ? "booking-gradient" : ""}
          >
            All
          </Button>
          <Button 
            variant={filter === "upcoming" ? "default" : "outline"} 
            size="sm"
            onClick={() => setFilter("upcoming")}
            className={filter === "upcoming" ? "booking-gradient" : ""}
          >
            Upcoming
          </Button>
          <Button 
            variant={filter === "past" ? "default" : "outline"} 
            size="sm"
            onClick={() => setFilter("past")}
            className={filter === "past" ? "booking-gradient" : ""}
          >
            Past
          </Button>
        </div>
      </div>
      
      {filteredAppointments.length === 0 ? (
        <div className="text-center py-10 text-muted-foreground">
          <p>No appointments found</p>
        </div>
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Date & Time</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredAppointments.map((appointment) => {
              const appointmentDate = parseISO(appointment.date + "T" + appointment.time);
              const isPast = !isAfter(appointmentDate, now);
              
              return (
                <TableRow key={appointment.id} className="hover:bg-accent/50">
                  <TableCell>
                    <div className="flex flex-col">
                      <div className="flex items-center text-sm font-medium">
                        <Calendar className="mr-2 h-4 w-4 text-muted-foreground" />
                        {format(parseISO(appointment.date), "MMM d, yyyy")}
                      </div>
                      <div className="flex items-center text-xs text-muted-foreground mt-1">
                        <Clock className="mr-2 h-3 w-3" />
                        {appointment.time}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{appointment.name}</TableCell>
                  <TableCell>{appointment.email}</TableCell>
                  <TableCell className="text-right">
                    {!isPast && (
                      <Button 
                        variant="ghost" 
                        size="icon"
                        onClick={() => handleCancel(appointment)}
                        className="h-8 w-8 text-red-500 hover:text-red-700 hover:bg-red-100 dark:hover:bg-red-900/20"
                      >
                        <X className="h-4 w-4" />
                        <span className="sr-only">Cancel appointment</span>
                      </Button>
                    )}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      )}
    </div>
  );
}
