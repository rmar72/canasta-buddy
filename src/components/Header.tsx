import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

export default function Header() {
  return (
    <header className="border-b bg-darkGreen text-white">
      <div className="container mx-auto flex justify-between items-center py-4 px-6">
        <div className="text-xl font-bold text-offWhite hover:text-gold">Canasta Buddy</div>
        <nav className="hidden md:flex space-x-4">
          <Link href="/" passHref>
            <Button variant="link" className="text-offWhite hover:text-mint">Home</Button>
          </Link>
          <Link href="/about" passHref>
            <Button variant="link" className="text-offWhite hover:text-mint">About</Button>
          </Link>
          <Link href="/contact" passHref>
            <Button variant="link" className="text-offWhite hover:text-mint">Contact</Button>
          </Link>
        </nav>
        <div className="md:hidden">
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="ghost">Menu</Button>
            </PopoverTrigger>
            <PopoverContent className="w-48 bg-white text-black">
              <ul className="space-y-2">
                <li>
                  <Link href="/" passHref>
                    <Button variant="ghost" className="w-full text-left">
                      Home
                    </Button>
                  </Link>
                </li>
                <li>
                  <Link href="/about" passHref>
                    <Button variant="ghost" className="w-full text-left">
                      About
                    </Button>
                  </Link>
                </li>
                <li>
                  <Link href="/contact" passHref>
                    <Button variant="ghost" className="w-full text-left">
                      Contact
                    </Button>
                  </Link>
                </li>
              </ul>
            </PopoverContent>
          </Popover>
        </div>
      </div>
    </header>
  );
}
