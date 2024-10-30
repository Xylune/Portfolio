import { PropsWithChildren, useState } from "react";
import { Project as ProjectProps } from "./types";
import { formatDistance } from "date-fns";

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

    const formatDate = (isoString: string) => {
        const date = new Date(isoString);
        return formatDistance(date, new Date(), {
            addSuffix: true,
            includeSeconds: true,
        });
    };

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
            <p>Created: {formatDate(createdAt)}</p>
            <p>Updated: {formatDate(updatedAt)}</p>
            <p>
                Published:{" "}
                {publishedAt ? formatDate(publishedAt) : "Unpublished"}
            </p>
            {isHovered && children}
        </li>
    );
}
