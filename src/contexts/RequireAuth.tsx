import { useContext } from "react";
import Login from "../pages/login/Login";
import { AuthContext } from "./AuthContext";
import { StackScreen } from "../routes/stack.routes";

export const RequireAuth = ({
  children,
  test,
}: {
  children: JSX.Element;
  test: boolean;
}) => {
  const auth = useContext(AuthContext);

  if (test) return children;

  if (!auth.user) {
    return <StackScreen />;
  }

  return children;
};
