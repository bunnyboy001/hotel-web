import Header from "@/components/header";
import Footer from "@/components/footer";
import RoomCard, { type Room } from "@/components/room-card";

const allRooms: Room[] = [
  {
    id: "1",
    name: "Presidential Suite",
    description: "Experience unparalleled luxury with panoramic city views, a private study, and a grand living area.",
    price: 1200,
    imageUrl: "https://placehold.co/600x400.png",
    imageHint: "luxury suite"
  },
  {
    id: "2",
    name: "Deluxe King Room",
    description: "A spacious and elegant room with a king-sized bed, marble bathroom, and modern amenities.",
    price: 550,
    imageUrl: "https://placehold.co/600x400.png",
    imageHint: "elegant hotel room"
  },
  {
    id: "3",
    name: "Ocean View Villa",
    description: "Private villa with stunning views of the ocean, a personal infinity pool, and 24/7 butler service.",
    price: 2500,
    imageUrl: "https://placehold.co/600x400.png",
    imageHint: "ocean villa"
  },
  {
    id: "4",
    name: "Standard Queen Room",
    description: "A comfortable and stylish room perfect for solo travelers or couples, with a plush queen bed.",
    price: 350,
    imageUrl: "https://placehold.co/600x400.png",
    imageHint: "hotel room"
  },
  {
    id: "5",
    name: "Family Suite",
    description: "Two connecting rooms provide ample space for the whole family, with games and entertainment included.",
    price: 850,
    imageUrl: "https://placehold.co/600x400.png",
    imageHint: "family suite"
  },
  {
    id: "6",
    name: "The Penthouse",
    description: "The crown jewel of The Grand Reserve, offering two floors of opulent space and a private rooftop terrace.",
    price: 5000,
    imageUrl: "https://placehold.co/600x400.png",
    imageHint: "luxury penthouse"
  },
];

export default function RoomsPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <section className="py-16 md:py-24 bg-background">
          <div className="container mx-auto text-center">
            <h1 className="font-headline text-4xl md:text-5xl font-bold">
              Our Rooms & Suites
            </h1>
            <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
              Choose your personal sanctuary. Each space is meticulously designed to provide an unforgettable stay.
            </p>
            <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {allRooms.map((room) => (
                <RoomCard key={room.id} room={room} />
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
