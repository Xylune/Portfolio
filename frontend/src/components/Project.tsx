import { Project as ProjectProps } from "./types";

export default function Project(props: ProjectProps) {
    const { name, description, version } = props;
    return (
    <li>
        <h3>{name}</h3>
        <p>{description}</p>
        <p>{version}</p>
    </li>
    )
}