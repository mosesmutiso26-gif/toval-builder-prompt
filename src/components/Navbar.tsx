import { useState } from "react";
import { NavLink } from "@/components/NavLink";
import { Button } from "@/components/ui/button";
import { Menu, X, ChevronDown } from "lucide-react";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <NavLink to="/" className="flex items-center space-x-2">
            <div className="flex flex-col">
              <span className="text-xl font-bold text-primary">TOVAL</span>
              <span className="text-xs text-muted-foreground">Building Excellence</span>
            </div>
          </NavLink>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavLink to="/" className="px-4 py-2 text-sm font-medium hover:text-primary transition-colors">
                    Home
                  </NavLink>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <NavigationMenuTrigger>About</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <div className="w-48 p-2">
                      <NavigationMenuLink asChild>
                        <NavLink to="/about" className="block px-4 py-2 text-sm hover:bg-accent rounded-md">
                          Company Profile
                        </NavLink>
                      </NavigationMenuLink>
                      <NavigationMenuLink asChild>
                        <NavLink to="/about#leadership" className="block px-4 py-2 text-sm hover:bg-accent rounded-md">
                          Leadership
                        </NavLink>
                      </NavigationMenuLink>
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <NavLink to="/services" className="px-4 py-2 text-sm font-medium hover:text-primary transition-colors">
                    Services
                  </NavLink>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <NavLink to="/projects" className="px-4 py-2 text-sm font-medium hover:text-primary transition-colors">
                    Projects
                  </NavLink>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <NavLink to="/news" className="px-4 py-2 text-sm font-medium hover:text-primary transition-colors">
                    News & Media
                  </NavLink>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <NavLink to="/careers" className="px-4 py-2 text-sm font-medium hover:text-primary transition-colors">
                    Careers
                  </NavLink>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <NavLink to="/procurement" className="px-4 py-2 text-sm font-medium hover:text-primary transition-colors">
                    Procurement
                  </NavLink>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <NavLink to="/contact" className="px-4 py-2 text-sm font-medium hover:text-primary transition-colors">
                    Contact
                  </NavLink>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>

            <Button variant="default" size="sm" className="ml-4" asChild>
              <a href="tel:0700325637">Call: 0700 325 637</a>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden py-4 space-y-2">
            <NavLink
              to="/"
              className="block px-4 py-2 text-sm hover:bg-accent rounded-md"
              onClick={() => setIsOpen(false)}
            >
              Home
            </NavLink>
            <NavLink
              to="/about"
              className="block px-4 py-2 text-sm hover:bg-accent rounded-md"
              onClick={() => setIsOpen(false)}
            >
              About
            </NavLink>
            <NavLink
              to="/services"
              className="block px-4 py-2 text-sm hover:bg-accent rounded-md"
              onClick={() => setIsOpen(false)}
            >
              Services
            </NavLink>
            <NavLink
              to="/projects"
              className="block px-4 py-2 text-sm hover:bg-accent rounded-md"
              onClick={() => setIsOpen(false)}
            >
              Projects
            </NavLink>
            <NavLink
              to="/news"
              className="block px-4 py-2 text-sm hover:bg-accent rounded-md"
              onClick={() => setIsOpen(false)}
            >
              News & Media
            </NavLink>
            <NavLink
              to="/careers"
              className="block px-4 py-2 text-sm hover:bg-accent rounded-md"
              onClick={() => setIsOpen(false)}
            >
              Careers
            </NavLink>
            <NavLink
              to="/procurement"
              className="block px-4 py-2 text-sm hover:bg-accent rounded-md"
              onClick={() => setIsOpen(false)}
            >
              Procurement
            </NavLink>
            <NavLink
              to="/contact"
              className="block px-4 py-2 text-sm hover:bg-accent rounded-md"
              onClick={() => setIsOpen(false)}
            >
              Contact
            </NavLink>
            <Button variant="default" size="sm" className="w-full mt-4" asChild>
              <a href="tel:0700325637">Call: 0700 325 637</a>
            </Button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
