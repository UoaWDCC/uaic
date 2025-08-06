import { getUsers } from "@/features/users/data/getUsers";

export default async function Test() {
    const users = await getUsers();
    return (
        <div className="mt-5">
            {users.map((user) => <p className="mt-5" key={user.id}>{user.email}</p>)}
        </div>
    )
}