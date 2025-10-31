import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Users, Factory, BarChart3, BookOpen, Menu } from "lucide-react";
import { useState } from "react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

const Navigation = () => {
  const location = useLocation();
  const [open, setOpen] = useState(false);

  const navItems = [
    { path: "/", label: "Home", icon: null },
    { path: "/worker", label: "Workers", icon: Users },
    { path: "/factory", label: "Factories", icon: Factory },
    { path: "/analytics", label: "Analytics", icon: BarChart3 },
    { path: "/docs", label: "Documentation", icon: BookOpen },
  ];

  const NavLinks = () => (
    <>
      {navItems.map((item) => (
        <Link
          key={item.path}
          to={item.path}
          onClick={() => setOpen(false)}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
            location.pathname === item.path
              ? "bg-primary text-primary-foreground font-medium"
              : "text-foreground hover:bg-accent"
          }`}
        >
          {item.icon && <item.icon className="h-4 w-4" />}
          {item.label}
        </Link>
      ))}
    </>
  );

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-lg bg-gradient-hero flex items-center justify-center">
            <span className="text-white font-bold text-sm">SA</span>
          </div>
          <span className="font-bold text-xl">ShilpoAI</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-2">
          <NavLinks />
        </div>

        <div className="hidden md:flex items-center gap-2">
          <Button variant="outline" asChild>
            <Link to="/worker">Worker Login</Link>
          </Button>
          <Button asChild className="bg-gradient-hero hover:opacity-90">
            <Link to="/factory">Factory Login</Link>
          </Button>
        </div>

        {/* Mobile Navigation */}
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="ghost" size="icon">
              <Menu className="h-6 w-6" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[300px]">
            <div className="flex flex-col gap-4 mt-8">
              <NavLinks />
              <div className="flex flex-col gap-2 mt-4 pt-4 border-t">
                <Button variant="outline" asChild onClick={() => setOpen(false)}>
                  <Link to="/worker">Worker Login</Link>
                </Button>
                <Button asChild className="bg-gradient-hero" onClick={() => setOpen(false)}>
                  <Link to="/factory">Factory Login</Link>
                </Button>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </nav>
  );
};

export default Navigation;
