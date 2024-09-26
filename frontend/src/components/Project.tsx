import { PropsWithChildren, useState } from "react";
import { Project as ProjectProps } from "./types";

export default function Project(
    props: Readonly<PropsWithChildren<ProjectProps>>
) {
    const { name, description, version, children } = props;
    const [isHovered, setIsHovered] = useState(false);

    return (
        <li
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <h3>{name}</h3>
            <p>{description}</p>
            <p>{version}</p>
            {isHovered && children}
        </li>
    );
}
