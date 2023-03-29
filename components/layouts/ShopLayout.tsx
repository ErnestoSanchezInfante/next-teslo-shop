import Head from "next/head"
import { FC, ReactNode } from "react";
import { NavBar, SideMenu } from "../ui";

interface Props {
    title: string;
    pageDescription: string;
    imageFullUrl?: string;
    children?:ReactNode;
}

export const ShopLayout: FC<Props> = ( { children, title, pageDescription, imageFullUrl} ) => {
  return (
    <>
        <Head>
            <title>{ title }</title>
            {/* meta tags para la web ceo */}
            <meta name="description" content={ pageDescription }/>

            <meta name="og:title" content={ title }/>
            <meta name="og:description" content={ pageDescription }/>
            {
                imageFullUrl && (
                    <meta name="og:image" content={ imageFullUrl }/>
                )
            }
        </Head>
        <nav>
            <NavBar />
        </nav>

        <SideMenu />

        <main style={{
            margin: '80px auto',
            maxWidth: '1440px',
            padding: '0px 30px'
        }}>
            { children }
        </main>

        {/* Footer*/}

        <footer>
            {/* Footer*/}
        </footer>
    </>
  )
}
