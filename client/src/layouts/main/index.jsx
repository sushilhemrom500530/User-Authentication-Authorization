import { useAuth } from "../../hooks/use-auth";
import Signin from "../../view/auth/signin";
import Signup from "../../view/auth/signup";

export default function MainLayout() {
const { user, loading, error } = useAuth();

console.log("Current user:", user)
  return (
    <div className="text-xl font-medium text-center">
           <Signin />
           {/* <Signup /> */}
    </div>
  )
}
