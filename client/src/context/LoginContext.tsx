import { createContext, useState } from "react";
import { Account } from "../types/types"

interface LoginContextType {
  account: Account;
  setAccount: React.Dispatch<React.SetStateAction<Account>>;
  valid: boolean;
  setValid: React.Dispatch<React.SetStateAction<boolean>>;
}

const initialAccount = { username: "", password: "" };
const initialState: LoginContextType = {
  account: initialAccount,
  setAccount: () => { },
  valid: false,
  setValid: () => { },
}

export const LoginContext = createContext<LoginContextType>(initialState);

export const LoginProvider = (props: any) => {

  const [account, setAccount] = useState<Account>(initialState.account);
  const [valid, setValid] = useState(false);

  return (
    <LoginContext.Provider
      value={{
        account: account,
        setAccount: setAccount,
        valid: valid,
        setValid: setValid,
      }}
    >
      {props.children}
    </LoginContext.Provider>
  )
}