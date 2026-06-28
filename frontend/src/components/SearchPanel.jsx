import "./SearchPanel.css";

function SearchPanel({ search, setSearch }) {

    function handleSubmit(event) {
        event.preventDefault();
    }

    return (
        <section>

            <h2>Pesquisar vagas</h2>

            <form onSubmit={handleSubmit}>

                <input
                    type="text"
                    placeholder="Digite o cargo ou empresa..."
                    value={search}
                    onChange={(event) => setSearch(event.target.value)}
                />

                <button type="submit">
                    Buscar
                </button>

            </form>

        </section>
    );
}

export default SearchPanel;