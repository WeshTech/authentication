import { auth, signOut } from "@/auth";

const Settings = async () => {

    const session = await auth();

  return (
    <div>
        {JSON.stringify(session)}
        <form action = {async () => {
          "use server";

          await signOut();
        }}>
          <button 
            className="bg-rose-500 text-white p-2 rounded-xl m-3 transition  hover:bg-rose-600"
            type = "submit">
              Sign out
          </button>
        </form>
    </div>
  )
}

export default Settings