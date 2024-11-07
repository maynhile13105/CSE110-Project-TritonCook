import { createContext, useState } from "react";
import { Account } from "../types/types"

interface LoginContextType {
    account: Account;
    setAccount: React.Dispatch<React.SetStateAction<Account>>;
}

const initialAccount = {username:"", password: ""};
const initialState: LoginContextType = { 
    account: initialAccount,
    setAccount: () => {},
}

export const LoginContext = createContext<LoginContextType>(initialState);

export const LoginProvider = (props: any) => {
    
    const [account, setAccount] = useState<Account>(initialState.account)

    return(
        <LoginContext.Provider
        value ={{
            account:account,
            setAccount: setAccount,
        }}
        >
            {props.children}
        </LoginContext.Provider>
    )
}