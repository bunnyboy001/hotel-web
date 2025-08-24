import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Calendar as CalendarIcon, Users } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import RoomCard, { type Room } from "@/components/room-card";
import Header from "@/components/header";
import Footer from "@/components/footer";

const featuredRooms: Room[] = [
  {
    id: "1",
    name: "Presidential Suite",
    description: "Experience unparalleled luxury with panoramic city views.",
    price: 1200,
    imageUrl: "https://placehold.co/600x400.png",
    imageHint: "luxury suite"
  },
  {
    id: "2",
    name: "Deluxe King Room",
    description: "A spacious and elegant room with a king-sized bed.",
    price: 550,
    imageUrl: "https://placehold.co/600x400.png",
    imageHint: "elegant hotel room"
  },
  {
    id: "3",
    name: "Ocean View Villa",
    description: "Private villa with stunning views of the ocean.",
    price: 2500,
    imageUrl: "https://placehold.co/600x400.png",
    imageHint: "ocean villa"
  },
];

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <section className="relative h-[60vh] md:h-[80vh] w-full animate-fade-in fill-mode-both">
          <Image
            src="https://placehold.co/1920x1080.png"
            alt="Grand Reserve Hotel in Kathmandu"
            layout="fill"
            objectFit="cover"
            className="brightness-50"
            data-ai-hint="himalayan mountains hotel"
          />
          <div className="relative z-10 flex h-full flex-col items-center justify-center text-center text-white p-4">
            <h1 className="font-headline text-4xl md:text-7xl font-bold tracking-tight animate-slide-in-from-bottom fill-mode-both" style={{animationDelay: '0.3s'}}>
              Experience Himalayan Serenity
            </h1>
            <p className="mt-4 max-w-2xl text-lg md:text-xl text-primary-foreground/80 animate-slide-in-from-bottom fill-mode-both" style={{animationDelay: '0.5s'}}>
              Discover a world where elegance meets comfort, nestled in the heart of Kathmandu.
            </p>
            <Button asChild size="lg" className="mt-8 bg-accent text-accent-foreground hover:bg-accent/90 animate-slide-in-from-bottom fill-mode-both" style={{animationDelay: '0.7s'}}>
              <Link href="/booking">Book Your Stay</Link>
            </Button>
          </div>
        </section>

        <section id="booking" className="py-16 md:py-24 bg-background">
          <div className="container mx-auto">
            <Card className="max-w-4xl mx-auto shadow-2xl animate-slide-in-from-bottom fill-mode-both">
              <CardContent className="p-6 md:p-10">
                <h2 className="font-headline text-3xl font-bold text-center mb-8">
                  Reserve Your Sanctuary
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
                  <div>
                    <Label htmlFor="booking-calendar" className="text-lg font-semibold mb-4 block">Select Dates</Label>
                    <Calendar
                      id="booking-calendar"
                      mode="range"
                      numberOfMonths={1}
                      className="rounded-md border self-center"
                    />
                  </div>
                  <div className="space-y-6">
                    <div>
                      <Label htmlFor="guests" className="text-lg font-semibold">Guests</Label>
                      <div className="relative mt-2">
                        <Users className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                        <Input id="guests" type="number" placeholder="2" className="pl-10" defaultValue={2}/>
                      </div>
                    </div>
                    <Button asChild size="lg" className="w-full">
                      <Link href="/booking">
                        Check Availability
                        <ArrowRight className="ml-2 h-5 w-5" />
                      </Link>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        <section className="py-16 md:py-24">
          <div className="container mx-auto text-center">
            <h2 className="font-headline text-3xl md:text-4xl font-bold animate-slide-in-from-bottom fill-mode-both" style={{animationDelay: '0.2s'}}>
              Featured Rooms & Suites
            </h2>
            <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground animate-slide-in-from-bottom fill-mode-both" style={{animationDelay: '0.4s'}}>
              Each of our rooms is designed with your comfort and luxury in mind.
            </p>
            <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredRooms.map((room, index) => (
                <div key={room.id} className="animate-slide-in-from-bottom fill-mode-both" style={{animationDelay: `${0.6 + index * 0.2}s`}}>
                  <RoomCard room={room} />
                </div>
              ))}
            </div>
            <Button asChild variant="outline" size="lg" className="mt-12 animate-fade-in fill-mode-both">
              <Link href="/rooms">
                View All Rooms
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </section>

      </main>
      <Footer />
    </div>
  );
}
