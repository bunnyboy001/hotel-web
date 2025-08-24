"use client";

import * as React from "react";
import { useFormStatus } from "react-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { format } from "date-fns";
import { Calendar as CalendarIcon, Users, CreditCard, Mail, User, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { cn } from "@/lib/utils";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { createBooking, type FormState } from "@/lib/actions";
import { Label } from "@/components/ui/label";

const bookingFormSchema = z.object({
  dateRange: z.object({
    from: z.date(),
    to: z.date(),
  }),
  guests: z.coerce.number().min(1, "At least one guest is required."),
  roomType: z.string().min(1, "Please select a room type."),
  fullName: z.string().min(2, "Full name is required."),
  email: z.string().email("Invalid email address."),
  phone: z.string().optional(),
  cardNumber: z.string().length(16, "Card number must be 16 digits.").optional().or(z.literal('')),
  expiryDate: z.string().regex(/^(0[1-9]|1[0-2])\/\d{2}$/, "Invalid expiry date (MM/YY).").optional().or(z.literal('')),
  cvc: z.string().length(3, "CVC must be 3 digits.").optional().or(z.literal('')),
});

// A wrapper for the Input component to include an icon
const InputWithIcon = React.forwardRef<
  HTMLInputElement,
  React.ComponentProps<typeof Input> & { icon: React.ElementType }
>(({ icon: Icon, ...props }, ref) => {
  return (
    <div className="relative">
      <Icon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
      <Input {...props} ref={ref} className="pl-9" />
    </div>
  );
});
InputWithIcon.displayName = "InputWithIcon";


function SubmitButton() {
    const { pending } = useFormStatus();
    return (
        <Button type="submit" size="lg" className="w-full" disabled={pending}>
            {pending ? "Confirming..." : "Confirm Reservation"}
        </Button>
    )
}

export default function BookingPage() {
    const { toast } = useToast();
    const [dateRange, setDateRange] = React.useState<{ from?: Date; to?: Date }>({});
    const [isClient, setIsClient] = React.useState(false);

    const initialState: FormState = { success: false, message: "" };
    const [state, formAction] = React.useActionState(createBooking, initialState);

    React.useEffect(() => {
        setIsClient(true);
    }, []);

    React.useEffect(() => {
        // Set initial date range only on the client after mount
        if (isClient) {
            setDateRange({
                from: new Date(),
                to: new Date(new Date().setDate(new Date().getDate() + 3)),
            });
        }
    }, [isClient]);


    React.useEffect(() => {
        if (state.message) {
            if(state.success) {
                 toast({
                    title: "Booking Confirmed!",
                    description: state.message,
                });
            } else {
                 toast({
                    variant: "destructive",
                    title: "Booking Failed",
                    description: state.message,
                });
            }
        }
    }, [state, toast]);


  if (!isClient) {
    return null;
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 py-16 md:py-24">
        <div className="container mx-auto">
          <Card className="max-w-4xl mx-auto shadow-2xl">
            <CardHeader>
              <CardTitle className="font-headline text-3xl md:text-4xl">Complete Your Reservation</CardTitle>
              <CardDescription>We're excited to welcome you to The Grand Reserve.</CardDescription>
            </CardHeader>
            <CardContent>
              <form action={formAction} className="space-y-8">
                  <input type="hidden" name="dateRange.from" value={dateRange.from?.toISOString() ?? ''} />
                  <input type="hidden" name="dateRange.to" value={dateRange.to?.toISOString() ?? ''} />
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                     <div className="flex flex-col space-y-2">
                        <Label>Check-in & Check-out</Label>
                        <Popover>
                            <PopoverTrigger asChild>
                                <Button
                                variant={"outline"}
                                className={cn(
                                    "w-full justify-start text-left font-normal",
                                    !dateRange.from && "text-muted-foreground"
                                )}
                                >
                                <CalendarIcon className="mr-2 h-4 w-4" />
                                {dateRange.from ? (
                                    dateRange.to ? (
                                    <>
                                        {format(dateRange.from, "LLL dd, y")} -{" "}
                                        {format(dateRange.to, "LLL dd, y")}
                                    </>
                                    ) : (
                                    format(dateRange.from, "LLL dd, y")
                                    )
                                ) : (
                                    <span>Pick a date</span>
                                )}
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                                initialFocus
                                mode="range"
                                defaultMonth={dateRange.from}
                                selected={{from: dateRange.from!, to: dateRange.to}}
                                onSelect={setDateRange}
                                numberOfMonths={2}
                            />
                            </PopoverContent>
                        </Popover>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                       <div>
                            <Label htmlFor="guests">Guests</Label>
                            <div className="relative mt-2">
                                <Users className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                <Input id="guests" name="guests" type="number" placeholder="2" className="pl-9" defaultValue={2} />
                            </div>
                        </div>
                        <div>
                            <Label htmlFor="roomType">Room Type</Label>
                            <Select name="roomType" defaultValue="deluxe-king">
                                <SelectTrigger className="mt-2">
                                    <SelectValue placeholder="Select a room" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="standard-queen">Standard Queen</SelectItem>
                                    <SelectItem value="deluxe-king">Deluxe King</SelectItem>
                                    <SelectItem value="family-suite">Family Suite</SelectItem>
                                    <SelectItem value="presidential-suite">Presidential Suite</SelectItem>
                                    <SelectItem value="ocean-villa">Ocean View Villa</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                      <h3 className="font-headline text-2xl border-b pb-2">Guest Information</h3>
                        <div>
                            <Label htmlFor="fullName">Full Name</Label>
                            <InputWithIcon id="fullName" name="fullName" icon={User} className="mt-2" />
                        </div>
                        <div className="grid md:grid-cols-2 gap-4">
                            <div>
                                <Label htmlFor="email">Email</Label>
                                <InputWithIcon id="email" name="email" icon={Mail} type="email" className="mt-2" />
                            </div>
                            <div>
                                <Label htmlFor="phone">Phone (Optional)</Label>
                                <InputWithIcon id="phone" name="phone" icon={Phone} type="tel" className="mt-2" />
                            </div>
                        </div>
                  </div>

                  <div className="space-y-4">
                      <h3 className="font-headline text-2xl border-b pb-2">Payment Details (Optional)</h3>
                        <div>
                           <Label htmlFor="cardNumber">Card Number</Label>
                           <InputWithIcon id="cardNumber" name="cardNumber" icon={CreditCard} className="mt-2" />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <Label htmlFor="expiryDate">Expiry Date</Label>
                                <Input id="expiryDate" name="expiryDate" placeholder="MM/YY" className="mt-2"/>
                            </div>
                            <div>
                                <Label htmlFor="cvc">CVC</Label>
                                <Input id="cvc" name="cvc" placeholder="123" className="mt-2"/>
                            </div>
                        </div>
                  </div>
                  
                  <SubmitButton />
                </form>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
}
