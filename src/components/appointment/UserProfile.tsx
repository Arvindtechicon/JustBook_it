
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { User, Settings, Mail, Bell, Moon, Sun, Key, Globe } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export function UserProfile() {
  const [name, setName] = useState(() => localStorage.getItem("userName") || "");
  const [email, setEmail] = useState(() => localStorage.getItem("userEmail") || "");
  const [phone, setPhone] = useState(() => localStorage.getItem("userPhone") || "");
  const { toast } = useToast();
  
  // Notification preferences
  const [emailNotifications, setEmailNotifications] = useState(() => 
    localStorage.getItem("emailNotifications") === "true"
  );
  const [reminderTime, setReminderTime] = useState(() => 
    localStorage.getItem("reminderTime") || "24h"
  );
  
  // Appearance settings
  const [compactView, setCompactView] = useState(() => 
    localStorage.getItem("compactView") === "true"
  );
  const [highContrast, setHighContrast] = useState(() => 
    localStorage.getItem("highContrast") === "true"
  );
  
  // Language preference
  const [language, setLanguage] = useState(() => 
    localStorage.getItem("language") || "english"
  );
  
  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Save personal information
    localStorage.setItem("userName", name);
    localStorage.setItem("userEmail", email);
    localStorage.setItem("userPhone", phone);
    
    // Save notification preferences
    localStorage.setItem("emailNotifications", emailNotifications.toString());
    localStorage.setItem("reminderTime", reminderTime);
    
    // Save appearance settings
    localStorage.setItem("compactView", compactView.toString());
    localStorage.setItem("highContrast", highContrast.toString());
    
    // Save language preference
    localStorage.setItem("language", language);
    
    toast({
      title: "Profile Updated",
      description: "Your profile information and preferences have been updated successfully.",
    });
  };
  
  return (
    <form onSubmit={handleSave} className="space-y-6">
      {/* Personal Information Card */}
      <Card className="shadow-md bg-accent/50">
        <CardHeader className="pb-3">
          <div className="flex items-center gap-3">
            <User className="h-5 w-5 text-primary" />
            <CardTitle>Personal Information</CardTitle>
          </div>
          <CardDescription>
            Update your personal details and contact information
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Your Name</Label>
            <Input
              id="name"
              placeholder="John Doe"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="bg-white/50 dark:bg-gray-800/50"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="email">Email Address</Label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-white/50 dark:bg-gray-800/50 pl-10"
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="phone">Phone Number</Label>
            <Input
              id="phone"
              type="tel"
              placeholder="(123) 456-7890"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="bg-white/50 dark:bg-gray-800/50"
            />
          </div>
        </CardContent>
      </Card>
      
      {/* Notification Preferences Card */}
      <Card className="shadow-md bg-accent/50">
        <CardHeader className="pb-3">
          <div className="flex items-center gap-3">
            <Bell className="h-5 w-5 text-primary" />
            <CardTitle>Notification Preferences</CardTitle>
          </div>
          <CardDescription>
            Choose how and when you want to be notified about your appointments
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="email-notifications">Email Notifications</Label>
              <p className="text-sm text-muted-foreground">Receive email reminders about upcoming appointments</p>
            </div>
            <Switch 
              id="email-notifications"
              checked={emailNotifications}
              onCheckedChange={setEmailNotifications}
            />
          </div>
          
          <div className="space-y-2">
            <Label>Reminder Time</Label>
            <RadioGroup 
              value={reminderTime} 
              onValueChange={setReminderTime}
              className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-2"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="24h" id="r1" />
                <Label htmlFor="r1" className="cursor-pointer">24 hours before</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="3h" id="r2" />
                <Label htmlFor="r2" className="cursor-pointer">3 hours before</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="1h" id="r3" />
                <Label htmlFor="r3" className="cursor-pointer">1 hour before</Label>
              </div>
            </RadioGroup>
          </div>
        </CardContent>
      </Card>
      
      {/* Appearance Settings Card */}
      <Card className="shadow-md bg-accent/50">
        <CardHeader className="pb-3">
          <div className="flex items-center gap-3">
            <Settings className="h-5 w-5 text-primary" />
            <CardTitle>Appearance & Preferences</CardTitle>
          </div>
          <CardDescription>
            Customize your booking experience and interface preferences
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="compact-view">Compact View</Label>
              <p className="text-sm text-muted-foreground">Use a more compact layout for appointment lists</p>
            </div>
            <Switch 
              id="compact-view"
              checked={compactView}
              onCheckedChange={setCompactView}
            />
          </div>
          
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="high-contrast">High Contrast</Label>
              <p className="text-sm text-muted-foreground">Increase contrast for better readability</p>
            </div>
            <Switch 
              id="high-contrast"
              checked={highContrast}
              onCheckedChange={setHighContrast}
            />
          </div>
          
          <div className="space-y-2 pt-2">
            <Label>Language Preference</Label>
            <RadioGroup 
              value={language} 
              onValueChange={setLanguage}
              className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="english" id="l1" />
                <Label htmlFor="l1" className="cursor-pointer flex items-center">
                  <Globe className="h-4 w-4 mr-2" />
                  English
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="spanish" id="l2" />
                <Label htmlFor="l2" className="cursor-pointer flex items-center">
                  <Globe className="h-4 w-4 mr-2" />
                  Spanish
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="french" id="l3" />
                <Label htmlFor="l3" className="cursor-pointer flex items-center">
                  <Globe className="h-4 w-4 mr-2" />
                  French
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="german" id="l4" />
                <Label htmlFor="l4" className="cursor-pointer flex items-center">
                  <Globe className="h-4 w-4 mr-2" />
                  German
                </Label>
              </div>
            </RadioGroup>
          </div>
        </CardContent>
      </Card>
      
      <Button type="submit" className="booking-gradient w-full">
        Save All Changes
      </Button>
    </form>
  );
}
