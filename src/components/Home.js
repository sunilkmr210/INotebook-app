import Addnote from "./Addnote";
import Notes from "./Notes";

export default function Home() {
    return (
        <div className="container">
            <Addnote />
            <Notes />
        </div>
    )
}