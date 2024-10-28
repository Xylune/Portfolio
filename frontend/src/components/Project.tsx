import { PropsWithChildren, useState } from "react";
import { Project as ProjectProps } from "./types";

export default function Project(
    props: Readonly<PropsWithChildren<ProjectProps>>
) {
    const {
        name,
        description,
        version,
        tags,
        createdAt,
        updatedAt,
        publishedAt,
        children,
    } = props;
    const [isHovered, setIsHovered] = useState(false);

    return (
        <li
            className="project-item"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <h3>{name}</h3>
            <p>{description}</p>
            <p>Version: {version}</p>
            <p>Tags: {(tags ?? []).join(", ")}</p>
            <p>Created: {createdAt}</p>
            <p>Updated: {updatedAt}</p>
            <p>Published: {publishedAt ? publishedAt : "Unpublished"}</p>
            {isHovered && children}
        </li>
    );
}
