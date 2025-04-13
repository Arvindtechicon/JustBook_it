
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { User, Settings, Mail, Key } from "lucide-react";

export function UserProfile() {
  const [name, setName] = useState(() => localStorage.getItem("userName") || "");
  const [email, setEmail] = useState(() => localStorage.getItem("userEmail") || "");
  const { toast } = useToast();
  
  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem("userName", name);
    localStorage.setItem("userEmail", email);
    
    toast({
      title: "Profile Updated",
      description: "Your profile information has been updated successfully.",
    });
  };
  
  return (
    <div className="glass-card p-6 animate-fade-in">
      <div className="flex items-center gap-3 mb-6">
        <Settings className="h-5 w-5 text-primary" />
        <h3 className="text-xl font-semibold">Profile Settings</h3>
      </div>
      
      <form onSubmit={handleSave} className="space-y-6">
        <div className="rounded-xl bg-accent/50 p-6 space-y-4">
          <div className="flex items-center gap-3 mb-2">
            <User className="h-5 w-5 text-primary" />
            <h4 className="text-md font-medium">Personal Information</h4>
          </div>
          
          <div className="space-y-3">
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
          </div>
        </div>
        
        <div className="rounded-xl bg-accent/50 p-6 space-y-4">
          <div className="flex items-center gap-3 mb-2">
            <Key className="h-5 w-5 text-primary" />
            <h4 className="text-md font-medium">Preferences</h4>
          </div>
          
          <div className="space-y-3">
            <div className="text-sm text-muted-foreground">
              <p>Your preferences will be used to pre-fill booking information.</p>
            </div>
          </div>
        </div>
        
        <Button type="submit" className="booking-gradient w-full">
          Save Changes
        </Button>
      </form>
    </div>
  );
}
