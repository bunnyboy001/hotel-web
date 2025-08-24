"use client";

import * as React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { MoreHorizontal, User, Mail, Phone, BedDouble, Calendar, Users, CheckCircle, XCircle, Clock } from "lucide-react";
import { Card, CardContent } from "../ui/card";
import { useToast } from "@/hooks/use-toast";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { getBookings, updateBookingStatus } from "@/lib/actions";
import { format } from "date-fns";

type Booking = Awaited<ReturnType<typeof getBookings>>[0];

const statusVariant: { [key: string]: "default" | "secondary" | "destructive" } = {
  Confirmed: "default",
  Pending: "secondary",
  Cancelled: "destructive",
};

const statusIcon: { [key: string]: React.ElementType } = {
    Confirmed: CheckCircle,
    Pending: Clock,
    Cancelled: XCircle,
}

export function BookingsTable() {
    const { toast } = useToast();
    const [bookings, setBookings] = React.useState<Booking[]>([]);
    const [selectedBooking, setSelectedBooking] = React.useState<Booking | null>(null);
    const [isDialogOpen, setDialogOpen] = React.useState(false);

    React.useEffect(() => {
        getBookings().then(setBookings);
    }, []);

    const handleStatusChange = async (bookingId: number, newStatus: "Confirmed" | "Cancelled") => {
        const res = await updateBookingStatus(bookingId, newStatus);
        if (res.success) {
            setBookings(bookings.map(b => b.id === bookingId ? {...b, status: newStatus} : b));
            const guestName = bookings.find(b => b.id === bookingId)?.fullName;
            toast({
                title: `Booking ${newStatus}!`,
                description: `The booking for ${guestName} has been updated.`,
            });
        } else {
             toast({
                variant: "destructive",
                title: "Update Failed",
                description: res.message,
            });
        }
    }

    const handleViewDetails = (booking: Booking) => {
        setSelectedBooking(booking);
        setDialogOpen(true);
    }

  return (
    <>
    <Card>
      <CardContent className="p-0">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Guest</TableHead>
              <TableHead>Room Type</TableHead>
              <TableHead>Dates</TableHead>
              <TableHead className="text-center">Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {bookings.map((booking) => (
              <TableRow key={booking.id}>
                <TableCell>
                  <div className="font-medium">{booking.fullName}</div>
                  <div className="text-sm text-muted-foreground">{booking.email}</div>
                </TableCell>
                <TableCell>{booking.roomType}</TableCell>
                <TableCell>
                  {format(new Date(booking.checkIn), "LLL dd, y")} to {format(new Date(booking.checkOut), "LLL dd, y")}
                </TableCell>
                <TableCell className="text-center">
                  <Badge variant={statusVariant[booking.status]}>{booking.status}</Badge>
                </TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0">
                        <span className="sr-only">Open menu</span>
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => handleViewDetails(booking)}>View Details</DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleStatusChange(booking.id, "Confirmed")} disabled={booking.status === "Confirmed"}>Mark as Confirmed</DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleStatusChange(booking.id, "Cancelled")} disabled={booking.status === "Cancelled"}>Cancel Booking</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
    {selectedBooking && (
        <Dialog open={isDialogOpen} onOpenChange={setDialogOpen}>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                <DialogTitle>Booking Details</DialogTitle>
                <DialogDescription>
                    Full details for the reservation made by {selectedBooking.fullName}.
                </DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-4">
                    <div className="flex items-center gap-4">
                        <User className="w-5 h-5 text-muted-foreground" />
                        <div>
                            <p className="font-medium">Guest</p>
                            <p className="text-muted-foreground">{selectedBooking.fullName}</p>
                        </div>
                    </div>
                     <div className="flex items-center gap-4">
                        <Mail className="w-5 h-5 text-muted-foreground" />
                        <div>
                            <p className="font-medium">Email</p>
                            <p className="text-muted-foreground">{selectedBooking.email}</p>
                        </div>
                    </div>
                    {selectedBooking.phone && <div className="flex items-center gap-4">
                        <Phone className="w-5 h-5 text-muted-foreground" />
                        <div>
                            <p className="font-medium">Phone</p>
                            <p className="text-muted-foreground">{selectedBooking.phone}</p>
                        </div>
                    </div>}
                    <div className="flex items-center gap-4">
                        <BedDouble className="w-5 h-5 text-muted-foreground" />
                        <div>
                            <p className="font-medium">Room Type</p>
                            <p className="text-muted-foreground">{selectedBooking.roomType}</p>
                        </div>
                    </div>
                     <div className="flex items-center gap-4">
                        <Users className="w-5 h-5 text-muted-foreground" />
                        <div>
                            <p className="font-medium">Guests</p>
                            <p className="text-muted-foreground">{selectedBooking.guests}</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-4">
                        <Calendar className="w-5 h-5 text-muted-foreground" />
                        <div>
                            <p className="font-medium">Check-in / Check-out</p>
                            <p className="text-muted-foreground">{format(new Date(selectedBooking.checkIn), "PPP")} to {format(new Date(selectedBooking.checkOut), "PPP")}</p>
                        </div>
                    </div>
                     <div className="flex items-center gap-4">
                        {React.createElement(statusIcon[selectedBooking.status], { className: "w-5 h-5 text-muted-foreground" })}
                        <div>
                            <p className="font-medium">Status</p>
                            <p className="text-muted-foreground">
                                <Badge variant={statusVariant[selectedBooking.status]}>{selectedBooking.status}</Badge>
                            </p>
                        </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )}
    </>
  );
}
