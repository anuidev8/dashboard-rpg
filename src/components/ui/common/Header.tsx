import { MessageSquare, Star, Archive, Settings, Menu, User } from 'lucide-react'
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Cinzel } from 'next/font/google';
const cinzel = Cinzel({ subsets: ['latin'] });
import { MedievalSharp } from 'next/font/google'
import { UserProfile } from './UserProfile';
const medievalSharp = MedievalSharp({ weight: '400', subsets: ['latin'] })

export const Header = () => (
  <header className="border-b bg-gray-700/80 rounded-lg p-4 md:p-6 shadow-lg transition-all duration-300 hover:shadow-xl mb-4">
    <div className="container mx-auto px-4">
      <div className="flex justify-between items-center py-4">
      <h2 className={`${medievalSharp.className} text-xl md:text-2xl mb-2 md:mb-4 text-yellow-400`}>Academia del estratega</h2>
        <nav className="hidden md:flex space-x-4">
          <Button variant="ghost">
            <User className="mr-2 h-4 w-4" />
            Configuración
          </Button>
          <UserProfile />
        </nav>
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="md:hidden">
              <Menu className="h-6 w-6" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left">
            <SheetHeader>
              <SheetTitle>Menu</SheetTitle>
            </SheetHeader>
            <nav className="flex flex-col space-y-4 mt-4">
              <Button variant="ghost" className="justify-start">
                <MessageSquare className="mr-2 h-4 w-4" />
                Conversaciones
              </Button>
              <Button variant="ghost" className="justify-start">
                <Star className="mr-2 h-4 w-4" />
                Destacados
              </Button>
              <Button variant="ghost" className="justify-start">
                <Archive className="mr-2 h-4 w-4" />
                Archivados
              </Button>
              <Button variant="ghost" className="justify-start">
                <Settings className="mr-2 h-4 w-4" />
                Configuración
              </Button>
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </div>
  </header>
)
