import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, BedDouble, Users, Wifi, Wind, Bath, Square, Star } from "lucide-react";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Header from "@/components/header";
import Footer from "@/components/footer";

const roomDetails = {
  id: "1",
  name: "Presidential Suite",
  price: 1200,
  rating: 4.9,
  reviews: 128,
  description: "The Presidential Suite is the epitome of luxury, offering an expansive living space that blends classical elegance with modern sophistication. With commanding panoramic views of the city skyline, this suite provides an unforgettable backdrop for your stay. It features a separate master bedroom with a king-sized bed, a spa-like marble bathroom with a deep soaking tub, a private study, a dining area for eight, and a grand living room perfect for entertaining or relaxation.",
  images: [
    { src: "https://placehold.co/1200x800.png", hint: "luxury suite living room" },
    { src: "https://placehold.co/1200x800.png", hint: "suite bedroom" },
    { src: "https://placehold.co/1200x800.png", hint: "suite bathroom" },
    { src: "https://placehold.co/1200x800.png", hint: "city view from suite" },
  ],
  amenities: [
    { icon: BedDouble, text: "King Bed" },
    { icon: Users, text: "Sleeps 4" },
    { icon: Square, text: "1,800 sq ft" },
    { icon: Wifi, text: "High-speed Wi-Fi" },
    { icon: Wind, text: "Air Conditioning" },
    { icon: Bath, text: "Spa Bathroom" },
  ],
};

export default function RoomDetailPage({ params }: { params: { id: string } }) {
  // In a real app, you would fetch room details based on params.id
  const room = roomDetails;

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 py-12 md:py-20">
        <div className="container mx-auto">
          <Button asChild variant="ghost" className="mb-8">
            <Link href="/rooms"><ArrowLeft className="mr-2 h-4 w-4" /> Back to all rooms</Link>
          </Button>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
            <div className="lg:col-span-3">
              <Carousel className="w-full rounded-lg overflow-hidden shadow-2xl">
                <CarouselContent>
                  {room.images.map((image, index) => (
                    <CarouselItem key={index}>
                      <div className="aspect-w-16 aspect-h-10">
                        <Image
                          src={image.src}
                          alt={`${room.name} - Image ${index + 1}`}
                          layout="fill"
                          objectFit="cover"
                          data-ai-hint={image.hint}
                        />
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious className="left-4" />
                <CarouselNext className="right-4" />
              </Carousel>
            </div>
            <div className="lg:col-span-2">
              <h1 className="font-headline text-4xl md:text-5xl font-bold">{room.name}</h1>
              <div className="flex items-center gap-4 mt-4 text-lg">
                <div className="flex items-center gap-1 text-accent">
                  <Star className="h-5 w-5 fill-current" />
                  <span>{room.rating}</span>
                </div>
                <span className="text-muted-foreground">({room.reviews} reviews)</span>
              </div>
              <p className="mt-6 text-lg text-muted-foreground">{room.description}</p>
              
              <div className="mt-8">
                <h3 className="font-headline text-2xl font-semibold">Amenities</h3>
                <div className="mt-4 grid grid-cols-2 gap-4">
                  {room.amenities.map((amenity, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <amenity.icon className="h-6 w-6 text-accent" />
                      <span className="text-muted-foreground">{amenity.text}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-10 p-6 bg-muted/30 rounded-lg flex items-center justify-between">
                <div>
                  <p className="text-sm">Starting from</p>
                  <p className="text-4xl font-bold text-accent">${room.price}<span className="text-lg font-normal text-muted-foreground">/night</span></p>
                </div>
                <Button size="lg" asChild>
                  <Link href="/booking">Book Now</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
