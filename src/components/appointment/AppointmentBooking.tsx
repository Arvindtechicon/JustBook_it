
import { useState, useEffect } from "react";
import { CalendarView } from "./Calendar";
import { TimeSlots } from "./TimeSlots";
import { BookingForm } from "./BookingForm";
import { ThemeToggle } from "@/components/ThemeToggle";
import { format } from "date-fns";
import { AppointmentHistory } from "./AppointmentHistory";
import { UserProfile } from "./UserProfile";
import { RecentAppointments } from "./RecentAppointments";
import { Button } from "@/components/ui/button";
import { 
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuLink,
  navigationMenuTriggerStyle
} from "@/components/ui/navigation-menu";
import { Calendar, Clock, History, User, Plus, LockIcon } from "lucide-react";

export function AppointmentBooking() {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [step, setStep] = useState<"date" | "time" | "form">("date");
  const [activeTab, setActiveTab] = useState<"book" | "history" | "profile" | "admin">("book");
  
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
  
  const resetBooking = () => {
    setSelectedDate(undefined);
    setSelectedTime(null);
    setStep("date");
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <header className="py-4 px-6 glass">
        <div className="container max-w-6xl mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">
            <span className="bg-clip-text text-transparent booking-gradient">Appointment Booking</span>
          </h1>
          
          <div className="flex items-center gap-4">
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuLink 
                    className={navigationMenuTriggerStyle() + (activeTab === "book" ? " bg-accent" : "")}
                    onClick={() => setActiveTab("book")}
                  >
                    <Calendar className="mr-2 h-4 w-4" />
                    Book
                  </NavigationMenuLink>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuLink 
                    className={navigationMenuTriggerStyle() + (activeTab === "history" ? " bg-accent" : "")} 
                    onClick={() => setActiveTab("history")}
                  >
                    <History className="mr-2 h-4 w-4" />
                    History
                  </NavigationMenuLink>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuLink 
                    className={navigationMenuTriggerStyle() + (activeTab === "profile" ? " bg-accent" : "")}
                    onClick={() => setActiveTab("profile")}
                  >
                    <User className="mr-2 h-4 w-4" />
                    Profile
                  </NavigationMenuLink>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuLink 
                    className={navigationMenuTriggerStyle() + (activeTab === "admin" ? " bg-accent" : "")}
                    onClick={() => setActiveTab("admin")}
                  >
                    <LockIcon className="mr-2 h-4 w-4" />
                    Admin
                  </NavigationMenuLink>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
            
            <ThemeToggle />
          </div>
        </div>
      </header>
      
      <main className="flex-1 container max-w-6xl mx-auto py-8 px-4">
        {activeTab === "book" && (
          <>
            <div className="text-center mb-8 animate-fade-in">
              <h2 className="text-3xl font-bold mb-2">Book Your Appointment</h2>
              <p className="text-muted-foreground">
                Select a date and time for your appointment below
              </p>
            </div>
            
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              <div className="lg:col-span-2 space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-semibold">Select Date & Time</h3>
                  
                  {(selectedDate || selectedTime) && (
                    <Button variant="outline" size="sm" onClick={resetBooking}>
                      <Plus className="rotate-45 h-4 w-4 mr-1" />
                      Reset
                    </Button>
                  )}
                </div>
                
                <div className="grid gap-6 md:grid-cols-2">
                  <div className="glass-card animate-slide-in">
                    <CalendarView
                      selectedDate={selectedDate}
                      onSelect={(date) => setSelectedDate(date)}
                    />
                  </div>
                  
                  <div className="space-y-6 flex flex-col animate-slide-in" style={{ animationDelay: "100ms" }}>
                    <TimeSlots
                      selectedDate={selectedDate}
                      onSelectTime={setSelectedTime}
                      selectedTime={selectedTime}
                      className="flex-1 glass-card"
                    />
                  </div>
                </div>
                
                <RecentAppointments />
              </div>
              
              <div className="animate-slide-in" style={{ animationDelay: "200ms" }}>
                <BookingForm
                  selectedDate={selectedDate}
                  selectedTime={selectedTime}
                  onBookingComplete={handleBookingComplete}
                />
              </div>
            </div>
          </>
        )}
        
        {activeTab === "history" && (
          <>
            <div className="text-center mb-8 animate-fade-in">
              <h2 className="text-3xl font-bold mb-2">Appointment History</h2>
              <p className="text-muted-foreground">
                View and manage your past and upcoming appointments
              </p>
            </div>
            
            <AppointmentHistory />
          </>
        )}
        
        {activeTab === "profile" && (
          <>
            <div className="text-center mb-8 animate-fade-in">
              <h2 className="text-3xl font-bold mb-2">Your Profile</h2>
              <p className="text-muted-foreground">
                Manage your personal information and preferences
              </p>
            </div>
            
            <div className="grid gap-8 md:grid-cols-2">
              <UserProfile />
              <div className="space-y-6">
                <RecentAppointments />
              </div>
            </div>
          </>
        )}

        {activeTab === "admin" && (
          <>
            <div className="text-center mb-8 animate-fade-in">
              <h2 className="text-3xl font-bold mb-2">Admin Panel</h2>
              <p className="text-muted-foreground">
                Manage blocked dates and view system settings
              </p>
            </div>
            
            <div className="grid gap-8 md:grid-cols-2">
              <div className="glass-card p-6 animate-fade-in">
                <h3 className="text-xl font-semibold mb-4 flex items-center">
                  <LockIcon className="mr-2 h-5 w-5" />
                  Blocked Dates Management
                </h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Click on dates in the calendar to block or unblock them for appointments.
                  Blocked dates will not be available for customers to book.
                </p>
                
                <div className="glass-card animate-slide-in">
                  <CalendarView
                    selectedDate={undefined}
                    onSelect={() => {}}
                    isAdminMode={true}
                  />
                </div>
              </div>
              
              <div className="space-y-6">
                <div className="glass-card p-6 animate-fade-in">
                  <h3 className="text-xl font-semibold mb-4">Administrator Access</h3>
                  <p className="text-sm mb-4">
                    This is a demo admin panel. In a real application, this would be protected
                    by authentication and only accessible to administrators.
                  </p>
                  <div className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300 p-3 rounded-lg text-sm">
                    <p className="font-medium">Note: Demo Mode</p>
                    <p className="text-xs mt-1">
                      All changes made here are stored in localStorage for demonstration purposes only.
                    </p>
                  </div>
                </div>
                
                <RecentAppointments />
              </div>
            </div>
          </>
        )}
      </main>
      
      <footer className="py-6 px-6 text-center text-sm text-muted-foreground">
        <p>© 2025 Appointment Booking System. All rights reserved.</p>
      </footer>
    </div>
  );
}
