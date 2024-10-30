import { PropsWithChildren } from "react";

type LayoutProps = PropsWithChildren;

export default function Layout({ children }: LayoutProps) {
    return (
        <div>
            <header>
                <h1>My portfolio</h1>
            </header>
            <main>{children}</main>
        </div>
    );
}
