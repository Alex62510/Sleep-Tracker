import { SignIn } from "@clerk/nextjs";

export default function Page() {
  return (
    <div className="ml-20 flex items-center justify-center min-h-screen">
      <SignIn />
    </div>
  );
}
