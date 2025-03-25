import {useAuthentificationJWTStore} from "../store/AuthentificationJWT.ts";
import {useEffect} from "react";
import {LeafMap} from "../component/LeafMap.tsx";
import {Header} from "../component/Header.tsx";

export const Home = () => {

    const {token} = useAuthentificationJWTStore()

    useEffect(() => {
        if (token !== null) {
            console.log(token)
        }
    }, []);
    return (
        <>
            <section>
                <Header/>
                <LeafMap/>
            </section>

        </>
    )
}