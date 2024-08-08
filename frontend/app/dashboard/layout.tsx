import { auth } from "@/app/lib/auth";
import LayoutClient from './components/DashboardLayoutClient';

export default async function Layout({ children }: { children: React.ReactNode }) {
    const session = await auth();

    if (!session) {
        return <div><p>You are not signed in</p></div>;
    }
    const userName = session.user?.name;
    const userAvatar = session.user?.image;

    return (
        <LayoutClient userName={userName} userAvatar={userAvatar} children={children} />
    )
}