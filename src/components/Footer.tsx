import { Phone, MapPin, Mail } from "lucide-react";
import { NavLink } from "@/components/NavLink";
import logo from "@/assets/logo.png";

const Footer = () => {
  return (
    <footer className="bg-secondary text-secondary-foreground">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <img src={logo} alt="Toval Engineering Contractors" className="h-12 w-auto" />
            </div>
            <p className="font-semibold text-lg">Toval Engineering Contractors</p>
            <p className="text-sm opacity-90 mt-2">
              Improving Your Built Environment
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <NavLink to="/about" className="hover:text-primary transition-colors">
                  About Us
                </NavLink>
              </li>
              <li>
                <NavLink to="/services" className="hover:text-primary transition-colors">
                  Services
                </NavLink>
              </li>
              <li>
                <NavLink to="/projects" className="hover:text-primary transition-colors">
                  Projects
                </NavLink>
              </li>
              <li>
                <NavLink to="/careers" className="hover:text-primary transition-colors">
                  Careers
                </NavLink>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-semibold mb-4">Services</h3>
            <ul className="space-y-2 text-sm">
              <li>Civil Engineering</li>
              <li>Building Construction</li>
              <li>Road Construction</li>
              <li>Bridge & Drainage Systems</li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-semibold mb-4">Contact</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2">
                <MapPin className="h-4 w-4 mt-0.5 flex-shrink-0" />
                <span>Kisumu, Kenya</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4 flex-shrink-0" />
                <a href="tel:0700325637" className="hover:text-primary transition-colors">
                  0700 325 637
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4 flex-shrink-0" />
                <a href="mailto:info@toval-eng.co.ke" className="hover:text-primary transition-colors">
                  info@toval-eng.co.ke
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-secondary-foreground/20 mt-8 pt-8 text-sm text-center space-y-2">
          <p>© {new Date().getFullYear()} Toval Engineering Contractors. All rights reserved.</p>
          <p className="text-xs opacity-75">
            Website Developed by <span className="font-semibold text-destructive">Laban Panda Khisa</span> and <span className="font-semibold text-destructive">Javan Illa</span>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
