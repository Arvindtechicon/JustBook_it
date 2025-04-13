
import { useState, useEffect } from 'react';

export interface Appointment {
  id: string;
  date: string; // ISO date string
  time: string; // Format: "HH:MM"
  name?: string;
  email?: string;
}

export function useAppointments() {
  const [appointments, setAppointments] = useState<Appointment[]>(() => {
    const saved = localStorage.getItem('appointments');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('appointments', JSON.stringify(appointments));
  }, [appointments]);

  const addAppointment = (appointment: Omit<Appointment, 'id'>) => {
    const newAppointment = {
      ...appointment,
      id: crypto.randomUUID(),
    };
    setAppointments((prev) => [...prev, newAppointment]);
    return newAppointment;
  };

  const removeAppointment = (id: string) => {
    setAppointments((prev) => prev.filter((app) => app.id !== id));
  };

  const getAppointmentsByDate = (date: string) => {
    return appointments.filter((app) => app.date === date);
  };

  const isTimeSlotAvailable = (date: string, time: string) => {
    return !appointments.some((app) => app.date === date && app.time === time);
  };

  return {
    appointments,
    addAppointment,
    removeAppointment,
    getAppointmentsByDate,
    isTimeSlotAvailable,
  };
}
