import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Plane, User, LogOut, UserCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import SignInDialog from "@/components/SignInDialog";
import { toast } from "sonner";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { isAuthenticated, user, signOut } = useAuth();
  const [isSignInDialogOpen, setIsSignInDialogOpen] = useState(false);

  const isActive = (path: string) => location.pathname === path;

  const handleSignOut = () => {
    signOut();
    toast.success("Successfully signed out!");
    navigate("/");
  };

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link to="/" className="flex items-center gap-2">
              <Plane className="h-6 w-6 text-primary" />
              <span className="text-xl font-bold text-foreground">TravelWise</span>
            </Link>
            
            <div className="hidden md:flex items-center gap-8">
              <Link 
                to="/" 
                className={`transition-colors ${isActive("/") ? "text-primary font-semibold" : "text-foreground hover:text-primary"}`}
              >
                Home
              </Link>
              <Link 
                to="/destinations" 
                className={`transition-colors ${isActive("/destinations") ? "text-primary font-semibold" : "text-foreground hover:text-primary"}`}
              >
                Destinations
              </Link>
              <Link 
                to="/about" 
                className={`transition-colors ${isActive("/about") ? "text-primary font-semibold" : "text-foreground hover:text-primary"}`}
              >
                About
              </Link>
              <Link 
                to="/contact" 
                className={`transition-colors ${isActive("/contact") ? "text-primary font-semibold" : "text-foreground hover:text-primary"}`}
              >
                Contact
              </Link>
            </div>
            
            {isAuthenticated ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="gap-2">
                    <User className="h-4 w-4" />
                    {user?.name}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <div className="px-2 py-1.5 text-sm font-semibold">{user?.email}</div>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => navigate("/profile")} className="cursor-pointer">
                    <UserCircle className="mr-2 h-4 w-4" />
                    My Profile
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleSignOut} className="cursor-pointer">
                    <LogOut className="mr-2 h-4 w-4" />
                    Sign Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button variant="default" size="sm" onClick={() => setIsSignInDialogOpen(true)}>
                Sign In
              </Button>
            )}
          </div>
        </div>
      </nav>
      <SignInDialog open={isSignInDialogOpen} onOpenChange={setIsSignInDialogOpen} />
    </>
  );
};

export default Navbar;
