import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { setFilter } from "../postsSlice";
import { selectFilter } from "../selectors";

export default function PostFilter() {
  const dispatch = useAppDispatch();
  const filter = useAppSelector(selectFilter);
  const [inputValue, setInputValue] = useState(filter);

  const onFilter = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(setFilter(inputValue));
  };

  return (
    <form className="toolbar" onSubmit={onSubmit}>
      <input
        placeholder="Filtrar posts por nombre…"
        value={inputValue}
        onChange={onFilter}
        className="input"
      />
      <button type="submit" className="btn btn--ghost">
        Buscar
      </button>
    </form>
  );
}
