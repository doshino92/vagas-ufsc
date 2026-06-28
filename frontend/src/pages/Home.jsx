import { useState } from "react";
import SearchPanel from "../components/SearchPanel";
import JobFeed from "../components/JobFeed";

function Home() {

    const [search, setSearch] = useState("");

    return (
        <>
            <h2>Página Inicial</h2>

            <SearchPanel
                search={search}
                setSearch={setSearch}
            />

            <JobFeed
                search={search}
            />
        </>
    );
}

export default Home;