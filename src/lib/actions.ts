"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import { db } from "@/db";
import { bookings } from "@/db/schema";
import { eq } from "drizzle-orm";

const bookingFormSchema = z.object({
    dateRange: z.object({
        from: z.coerce.date(),
        to: z.coerce.date(),
    }),
    guests: z.coerce.number().min(1, "At least one guest is required."),
    roomType: z.string().min(1, "Please select a room type."),
    fullName: z.string().min(2, "Full name is required."),
    email: z.string().email("Invalid email address."),
    phone: z.string().optional(),
});

export type FormState = {
    success: boolean;
    message: string;
}

// Helper function to format a Date object to 'YYYY-MM-DD'
function toYYYYMMDD(date: Date) {
    return date.toISOString().split('T')[0];
}

export async function createBooking(
  prevState: FormState,
  formData: FormData
): Promise<FormState> {
  try {
    const rawData = Object.fromEntries(formData.entries());
    const parsed = bookingFormSchema.safeParse({
        dateRange: {
            from: rawData['dateRange.from'],
            to: rawData['dateRange.to'],
        },
        guests: rawData.guests,
        roomType: rawData.roomType,
        fullName: rawData.fullName,
        email: rawData.email,
        phone: rawData.phone,
    });

    if (!parsed.success) {
        return {
            success: false,
            message: "Invalid form data. Please check your inputs.",
        };
    }

    const { dateRange, guests, roomType, fullName, email, phone } = parsed.data;

    await db.insert(bookings).values({
      fullName,
      email,
      phone,
      roomType,
      guests,
      checkIn: toYYYYMMDD(dateRange.from),
      checkOut: toYYYYMMDD(dateRange.to),
      status: 'Confirmed'
    });

    revalidatePath("/booking");
    revalidatePath("/admin");

    return {
      success: true,
      message: "Your reservation at the Grand Reserve has been successfully made. A confirmation has been sent to your email.",
    };
  } catch (error) {
    console.error("Database Error:", error);
    return {
      success: false,
      message: "Failed to create booking due to a server error. Please try again later.",
    };
  }
}

export async function updateBookingStatus(bookingId: number, status: "Confirmed" | "Cancelled") {
  try {
    await db.update(bookings).set({ status }).where(eq(bookings.id, bookingId));
    revalidatePath("/admin");
    return {
        success: true,
        message: `Booking status updated to ${status}.`
    }
  } catch(error) {
    console.error("Database Error:", error);
    return {
        success: false,
        message: "Failed to update booking status."
    }
  }
}

export async function getBookings() {
    try {
        const data = await db.select().from(bookings).orderBy(bookings.createdAt);
        return data;
    } catch(error) {
        console.error("Database Error:", error);
        return [];
    }
}
