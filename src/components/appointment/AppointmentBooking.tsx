
import { useState, useEffect } from "react";
import { CalendarView } from "./Calendar";
import { TimeSlots } from "./TimeSlots";
import { BookingForm } from "./BookingForm";
import { ThemeToggle } from "@/components/ThemeToggle";
import { format } from "date-fns";

export function AppointmentBooking() {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [step, setStep] = useState<"date" | "time" | "form">("date");
  
  // Reset selections when changing steps
  useEffect(() => {
    if (step === "date") {
      setSelectedTime(null);
    }
  }, [step]);
  
  useEffect(() => {
    if (selectedDate) {
      setStep("time");
    }
  }, [selectedDate]);
  
  useEffect(() => {
    if (selectedTime) {
      setStep("form");
    }
  }, [selectedTime]);
  
  const handleBookingComplete = () => {
    setSelectedDate(undefined);
    setSelectedTime(null);
    setStep("date");
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <header className="py-4 px-6 flex justify-between items-center">
        <h1 className="text-2xl font-bold">
          <span className="bg-clip-text text-transparent booking-gradient">Appointment Booking</span>
        </h1>
        <ThemeToggle />
      </header>
      
      <main className="flex-1 container max-w-6xl mx-auto py-8 px-4">
        <div className="text-center mb-8 animate-fade-in">
          <h2 className="text-3xl font-bold mb-2">Book Your Appointment</h2>
          <p className="text-muted-foreground">
            Select a date and time for your appointment below
          </p>
        </div>
        
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          <div className="glass-card animate-slide-in md:col-span-1">
            <CalendarView
              selectedDate={selectedDate}
              onSelect={(date) => setSelectedDate(date)}
            />
          </div>
          
          <div className="md:col-span-1 space-y-6 flex flex-col animate-slide-in" style={{ animationDelay: "100ms" }}>
            <TimeSlots
              selectedDate={selectedDate}
              onSelectTime={setSelectedTime}
              selectedTime={selectedTime}
              className="flex-1"
            />
          </div>
          
          <div className="md:col-span-1 animate-slide-in" style={{ animationDelay: "200ms" }}>
            <BookingForm
              selectedDate={selectedDate}
              selectedTime={selectedTime}
              onBookingComplete={handleBookingComplete}
            />
          </div>
        </div>
      </main>
      
      <footer className="py-6 px-6 text-center text-sm text-muted-foreground">
        <p>© 2025 Appointment Booking System. All rights reserved.</p>
      </footer>
    </div>
  );
}
