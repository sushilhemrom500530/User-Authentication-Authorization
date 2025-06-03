import Signin from "../../view/auth/signin";
import Signup from "../../view/auth/signup";

export default function MainLayout() {

  return (
    <div className="text-xl font-medium text-center">
           <Signin />
           {/* <Signup /> */}
    </div>
  )
}
