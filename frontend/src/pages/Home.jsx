import { useState } from "react";
import SearchPanel from "../components/SearchPanel";
import JobFeed from "../components/JobFeed";
import JobForm from "../components/JobForm";

function Home() {
    console.log("Renderizando Home");
    const [search, setSearch] = useState("");
    const [reloadJobs, setReloadJobs] = useState(false);

    function handleJobCreated() {
        setReloadJobs((previousState) => !previousState);
    }

    return (
        <main>
            <h1>Portal de Vagas UFSC</h1>

            <JobForm
                onJobCreated={handleJobCreated}
            />

            <SearchPanel
                search={search}
                setSearch={setSearch}
            />

            <JobFeed
                search={search}
                reloadJobs={reloadJobs}
            />
        </main>
    );
}

export default Home;