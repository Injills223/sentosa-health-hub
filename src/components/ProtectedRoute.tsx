import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";

type UserRole = "patient" | "admin" | "doctor" | "pharmacist" | "owner";

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles?: UserRole[];
}

export const ProtectedRoute = ({ children, allowedRoles }: ProtectedRouteProps) => {
  const { user, role, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading) {
      if (!user) {
        navigate("/auth");
      } else if (allowedRoles && role && !allowedRoles.includes(role)) {
        // Redirect to appropriate dashboard based on their actual role
        const roleDashboard = {
          patient: "/patient/dashboard",
          admin: "/admin/dashboard",
          doctor: "/doctor/dashboard",
          pharmacist: "/pharmacist/dashboard",
          owner: "/owner/dashboard",
        };
        navigate(roleDashboard[role]);
      }
    }
  }, [user, role, loading, navigate, allowedRoles]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!user || (allowedRoles && role && !allowedRoles.includes(role))) {
    return null;
  }

  return <>{children}</>;
};
