import { useSearchTextContext } from "../lib/hooks";

export default function SearchForm() {
  const { searchText, handleChangeSearchText } = useSearchTextContext();

  // function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
  //   e.preventDefault();
  // }
  // function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
  //   setSearchText(e.target.value);
  // }

  return (
    <form onSubmit={(e) => e.preventDefault()} action="#" className="search">
      <button type="submit">
        <i className="fa-solid fa-magnifying-glass"></i>
      </button>

      <input
        value={searchText}
        onChange={(e) => handleChangeSearchText(e.target.value)}
        spellCheck="false"
        type="text"
        required
        placeholder="Find remote developer jobs..."
      />
    </form>
  );
}
