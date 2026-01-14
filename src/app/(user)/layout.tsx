import { AuthGuard } from "../../../components/common";

export default function UserLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AuthGuard>{children}</AuthGuard>;
}
