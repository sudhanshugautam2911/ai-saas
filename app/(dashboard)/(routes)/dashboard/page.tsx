import { UserButton } from "@clerk/nextjs";

const dashboardPage = () => {
  return (
    <div>
      <p className='text-6xl text-green-600'>Dashboard (protected)</p>
      <UserButton afterSignOutUrl="/"/>
    </div>

  )
}

export default dashboardPage;
