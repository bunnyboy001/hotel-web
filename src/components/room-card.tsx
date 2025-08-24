import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export interface Room {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  imageHint?: string;
}

interface RoomCardProps {
  room: Room;
}

export default function RoomCard({ room }: RoomCardProps) {
  return (
    <Card className="overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300 flex flex-col">
      <CardHeader className="p-0">
        <div className="relative aspect-video">
          <Image
            src={room.imageUrl}
            alt={room.name}
            layout="fill"
            objectFit="cover"
            data-ai-hint={room.imageHint}
          />
        </div>
      </CardHeader>
      <CardContent className="p-6 flex-1">
        <CardTitle className="font-headline text-2xl">{room.name}</CardTitle>
        <CardDescription className="mt-2 text-base">{room.description}</CardDescription>
      </CardContent>
      <CardFooter className="p-6 pt-0 flex justify-between items-center">
        <div>
          <p className="text-sm text-muted-foreground">Starting from</p>
          <p className="text-2xl font-bold text-accent">${room.price}<span className="text-sm font-normal text-muted-foreground">/night</span></p>
        </div>
        <Button asChild variant="outline">
          <Link href={`/rooms/${room.id}`}>
            Details <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
