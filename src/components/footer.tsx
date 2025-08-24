import Link from 'next/link';
import { Crown, Facebook, Twitter, Instagram } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-1">
            <Link href="/" className="flex items-center space-x-2">
              <Crown className="h-8 w-8 text-accent" />
              <span className="font-bold font-headline text-2xl">Grand Reserve</span>
            </Link>
            <p className="mt-4 text-sm text-primary-foreground/70">
              Experience the pinnacle of Himalayan luxury and comfort.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold font-headline">Explore</h3>
            <ul className="mt-4 space-y-2">
              <li><Link href="/rooms" className="hover:text-accent transition-colors">Rooms & Suites</Link></li>
              <li><Link href="/booking" className="hover:text-accent transition-colors">Reservations</Link></li>
              <li><Link href="#" className="hover:text-accent transition-colors">Dining</Link></li>
              <li><Link href="#" className="hover:text-accent transition-colors">Spa & Wellness</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold font-headline">Contact Us</h3>
            <ul className="mt-4 space-y-2 text-primary-foreground/70">
              <li>123 Luxury Lane, Kathmandu, Nepal</li>
              <li>Email: contact@grandreserve.com</li>
              <li>Phone: (123) 456-7890</li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold font-headline">Follow Us</h3>
            <div className="flex mt-4 space-x-4">
              <Link href="#" className="text-primary-foreground/70 hover:text-accent"><Facebook /></Link>
              <Link href="#" className="text-primary-foreground/70 hover:text-accent"><Twitter /></Link>
              <Link href="#" className="text-primary-foreground/70 hover:text-accent"><Instagram /></Link>
            </div>
          </div>
        </div>
        <div className="mt-8 border-t border-primary-foreground/20 pt-8 text-center text-sm text-primary-foreground/70">
          <p>&copy; {new Date().getFullYear()} Grand Reserve. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
}
