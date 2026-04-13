"use client";

import { useState, useEffect } from "react";
import { useShakeSOS } from "@/hooks/useShakeSOS";
import { useGeolocation } from "@/hooks/useGeolocation";
import { useBuzzer } from "@/hooks/useBuzzer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { MapPin, Phone, AlertTriangle, Plus, Trash2, Shield, Bell } from "lucide-react";

interface Contact {
  id: string;
  name: string;
  phone: string;
}

export default function HomePage() {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [newName, setNewName] = useState("");
  const [newPhone, setNewPhone] = useState("");
  const [isAlertActive, setIsAlertActive] = useState(false);
  const [userName, setUserName] = useState("User");

  const { location, error: geoError, fetchLocation } = useGeolocation();
  const { playBuzzer } = useBuzzer();

  const handleSOS = () => {
    setIsAlertActive(true);
    playBuzzer(2000, 880); // High pitch alarm

    // In a real app, this would send SMS/Notifications to contacts with the location
    console.log(`SOS ALERT TRIGGERED!\nLocation: ${location ? `${location.latitude}, ${location.longitude}` : "Unknown"}\nNotifying ${contacts.length} contacts.`);

    // Auto-reset alert after 5 seconds
    setTimeout(() => setIsAlertActive(false), 5000);
  };

  useShakeSOS(handleSOS);

  useEffect(() => {
    // Load contacts from localStorage
    const savedContacts = localStorage.getItem("resqnet_contacts");
    if (savedContacts) {
      setContacts(JSON.parse(savedContacts));
    }

    // Load user data
    const savedUser = localStorage.getItem("resqnet_user");
    if (savedUser) {
      const user = JSON.parse(savedUser);
      setUserName(user.email?.split('@')[0] || "User");
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("resqnet_contacts", JSON.stringify(contacts));
  }, [contacts]);

  const addContact = (e: React.FormEvent) => {
    e.preventDefault();
    if (newName && newPhone) {
      const newContact: Contact = {
        id: Date.now().toString(),
        name: newName,
        phone: newPhone,
      };
      setContacts([...contacts, newContact]);
      setNewName("");
      setNewPhone("");
    }
  };

  const removeContact = (id: string) => {
    setContacts(contacts.filter(c => c.id !== id));
  };

  return (
    <div className="flex-1 w-full flex flex-col gap-8 p-4 md:p-8 bg-background">
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-brand-red flex items-center gap-2">
            <Shield className="w-8 h-8" /> ResQNet Dashboard
          </h1>
          <p className="text-muted-foreground">Welcome back, {userName}. Stay safe.</p>
        </div>

        <div className="flex items-center gap-4 bg-card p-3 rounded-lg border border-brand-aqua/20">
          <MapPin className="text-brand-aqua" />
          <div>
            <p className="text-xs text-muted-foreground uppercase">Current Location</p>
            <p className="text-sm font-mono text-brand-aqua">
              {location ? `${location.latitude.toFixed(4)}, ${location.longitude.toFixed(4)}` : geoError || "Locating..."}
            </p>
          </div>
          <Button size="sm" variant="ghost" onClick={fetchLocation} className="text-brand-aqua hover:text-brand-aqua hover:bg-brand-aqua/10">
            Refresh
          </Button>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <Card className="lg:col-span-2 border-brand-red/50 bg-brand-red/5 overflow-hidden shadow-[0_0_20px_rgba(255,0,0,0.1)]">
          <CardHeader className="bg-brand-red/10 border-b border-brand-red/20">
            <CardTitle className="text-brand-red flex items-center gap-2 uppercase tracking-tighter">
              <AlertTriangle className="w-5 h-5" /> Emergency SOS Trigger
            </CardTitle>
            <CardDescription className="text-brand-red/70 font-medium">
              In case of emergency, use the button below or shake your device.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center justify-center py-16">
            <button
              onClick={handleSOS}
              className={`w-56 h-56 rounded-full border-8 transition-all duration-300 flex flex-col items-center justify-center gap-2 shadow-[0_0_40px_rgba(255,0,0,0.3)] hover:shadow-[0_0_60px_rgba(255,0,0,0.5)] active:scale-95 ${
                isAlertActive
                  ? "bg-brand-red border-white animate-pulse scale-110 shadow-[0_0_80px_rgba(255,0,0,0.8)]"
                  : "bg-background border-brand-red hover:bg-brand-red/10"
              }`}
            >
              <Bell className={`w-12 h-12 ${isAlertActive ? "text-white" : "text-brand-red"}`} />
              <span className={`text-5xl font-black ${isAlertActive ? "text-white" : "text-brand-red"}`}>SOS</span>
              <span className={`text-xs font-bold uppercase ${isAlertActive ? "text-white" : "text-muted-foreground"}`}>
                {isAlertActive ? "Alert Active!" : "Press or Shake"}
              </span>
            </button>
          </CardContent>
        </Card>

        <div className="flex flex-col gap-8">
          <Card className="border-brand-aqua/30 bg-card/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-brand-aqua text-xl flex items-center gap-2">
                <Plus className="w-5 h-5" /> Add Contact
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={addContact} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="c-name">Name</Label>
                  <Input
                    id="c-name"
                    placeholder="Contact Name"
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                    className="bg-background/50 border-brand-aqua/20 focus-visible:ring-brand-aqua"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="c-phone">Phone</Label>
                  <Input
                    id="c-phone"
                    placeholder="+1 (555) 000-0000"
                    value={newPhone}
                    onChange={(e) => setNewPhone(e.target.value)}
                    className="bg-background/50 border-brand-aqua/20 focus-visible:ring-brand-aqua"
                  />
                </div>
                <Button type="submit" className="w-full bg-brand-aqua text-background hover:bg-brand-aqua/90 font-bold uppercase">
                  Add Emergency Contact
                </Button>
              </form>
            </CardContent>
          </Card>

          <Card className="border-brand-aqua/20 bg-card shadow-sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center gap-2">
                <Phone className="w-4 h-4 text-brand-aqua" /> Emergency Contacts
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 max-h-[300px] overflow-y-auto pr-2">
                {contacts.length === 0 ? (
                  <p className="text-sm text-muted-foreground italic text-center py-4">No contacts added yet.</p>
                ) : (
                  contacts.map((contact) => (
                    <div key={contact.id} className="flex justify-between items-center p-3 rounded-md bg-background/50 border border-brand-aqua/10 group hover:border-brand-aqua/30 transition-colors">
                      <div>
                        <p className="font-bold">{contact.name}</p>
                        <p className="text-xs text-brand-aqua">{contact.phone}</p>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => removeContact(contact.id)}
                        className="text-muted-foreground hover:text-brand-red hover:bg-brand-red/10"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  ))
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
