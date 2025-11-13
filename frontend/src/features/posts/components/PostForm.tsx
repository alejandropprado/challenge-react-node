import { useState } from "react";
import { useAppDispatch } from "../../../app/hooks";
import { createPost } from "../postsSlice";
import { createPostSchema } from "../../../shared/validation/postSchemas";

export default function PostForm() {
  const dispatch = useAppDispatch();
  const [name, setName] = useState(""),
    [description, setDescription] = useState("");
  const [err, setErr] = useState<string | null>(null);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = createPostSchema.safeParse({ name, description });
    if (!parsed.success) {
      setErr(parsed.error.issues[0]?.message ?? "Datos inválidos");
      return;
    }
    await dispatch(createPost(parsed.data));
    setName("");
    setDescription("");
    setErr(null);
  };

  return (
    <form onSubmit={onSubmit} style={{ display: "grid", gap: 12 }}>
      <div className="field">
        <label className="label" htmlFor="name">
          Nombre
        </label>
        <input
          id="name"
          className="input"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>
      <div className="field">
        <label className="label" htmlFor="description">
          Descripción
        </label>
        <textarea
          id="description"
          className="textarea"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
      </div>
      {err && <p className="feedback feedback--error">{err}</p>}
      <div style={{ display: "flex", justifyContent: "flex-end", gap: 8 }}>
        <button className="btn btn--primary" type="submit">
          Crear
        </button>
      </div>
    </form>
  );
}
