
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { format } from "date-fns";
import { useAppointments } from "@/hooks/use-appointments";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import { Check, Calendar, Clock } from "lucide-react";

interface BookingFormProps {
  selectedDate: Date | undefined;
  selectedTime: string | null;
  onBookingComplete: () => void;
  className?: string;
}

export function BookingForm({
  selectedDate,
  selectedTime,
  onBookingComplete,
  className,
}: BookingFormProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isConfirmed, setIsConfirmed] = useState(false);
  
  const { addAppointment } = useAppointments();
  const { toast } = useToast();
  
  // Load saved user data from profile
  useEffect(() => {
    const savedName = localStorage.getItem("userName");
    const savedEmail = localStorage.getItem("userEmail");
    
    if (savedName) setName(savedName);
    if (savedEmail) setEmail(savedEmail);
  }, []);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedDate || !selectedTime) return;
    
    setIsSubmitting(true);
    
    // Simulate API call delay
    setTimeout(() => {
      try {
        addAppointment({
          date: format(selectedDate, "yyyy-MM-dd"),
          time: selectedTime,
          name,
          email,
        });
        
        setIsConfirmed(true);
        
        // Show confirmation for a moment before resetting
        setTimeout(() => {
          setIsSubmitting(false);
          setIsConfirmed(false);
          onBookingComplete();
          
          toast({
            title: "Appointment Booked!",
            description: `Your appointment on ${format(selectedDate, "MMMM d, yyyy")} at ${selectedTime} has been confirmed.`,
          });
        }, 1500);
      } catch (error) {
        setIsSubmitting(false);
        toast({
          title: "Booking failed",
          description: "There was an error booking your appointment. Please try again.",
          variant: "destructive",
        });
      }
    }, 1000);
  };
  
  if (!selectedDate || !selectedTime) {
    return (
      <div className={cn("glass-card p-6", className)}>
        <div className="text-center py-8">
          <h3 className="text-xl font-semibold mb-2">Complete Your Booking</h3>
          <p className="text-muted-foreground">Please select a date and time first</p>
        </div>
      </div>
    );
  }
  
  return (
    <div className={cn("glass-card p-6", className, isConfirmed ? "relative overflow-hidden" : "")}>
      <h3 className="text-xl font-semibold mb-4">Complete Your Booking</h3>
      
      <div className="mb-4 p-4 booking-gradient-light rounded-lg">
        <div className="space-y-2">
          <div className="flex items-center">
            <Calendar className="h-4 w-4 mr-2 text-primary" />
            <span className="text-sm font-medium">Date</span>
          </div>
          <p className="font-semibold ml-6">{format(selectedDate, "MMMM d, yyyy")}</p>
          
          <div className="flex items-center mt-2">
            <Clock className="h-4 w-4 mr-2 text-primary" />
            <span className="text-sm font-medium">Time</span>
          </div>
          <p className="font-semibold ml-6">{selectedTime}</p>
        </div>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="name">Your Name</Label>
          <Input
            id="name"
            placeholder="John Doe"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="bg-white/50 dark:bg-gray-800/50"
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="email">Email Address</Label>
          <Input
            id="email"
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="bg-white/50 dark:bg-gray-800/50"
          />
        </div>
        
        <Button 
          type="submit" 
          className="w-full booking-gradient"
          disabled={isSubmitting || isConfirmed}
        >
          {isSubmitting ? "Confirming..." : "Confirm Booking"}
        </Button>
      </form>
      
      {isConfirmed && (
        <div className="absolute inset-0 flex items-center justify-center bg-green-600/90 backdrop-blur-sm animate-fade-in">
          <div className="text-white text-center">
            <div className="mb-2 mx-auto w-16 h-16 rounded-full bg-white flex items-center justify-center">
              <Check className="w-10 h-10 text-green-600 animate-bounce-checkmark" />
            </div>
            <h3 className="text-xl font-bold">Booking Confirmed!</h3>
          </div>
        </div>
      )}
    </div>
  );
}
