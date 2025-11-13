import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import {
  selectFilteredPosts,
  selectLoading,
  selectError,
  selectLoaded,
} from "../selectors";
import { deletePost, fetchPosts } from "../postsSlice";
import { useEffect } from "react";
import { SkeletonRow } from "../../../shared/ui/skeletons/SkeletonRow";

export default function PostList() {
  const dispatch = useAppDispatch();
  const loaded = useAppSelector(selectLoaded);

  const posts = useAppSelector(selectFilteredPosts);
  const loading = useAppSelector(selectLoading);
  const error = useAppSelector(selectError);

  useEffect(() => {
    if (!loaded) dispatch(fetchPosts());
  }, [loaded, dispatch]);

  return (
    <div className="table-wrap">
      <table className="table" role="table">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Descripción</th>
            <th className="col-actions">Acción</th>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <>
              <SkeletonRow columns={3} />
              <SkeletonRow columns={3} />
              <SkeletonRow columns={3} />
              <SkeletonRow columns={3} />
              <SkeletonRow columns={3} />
            </>
          ) : error ? (
            <tr>
              <td colSpan={3}>
                <p className="feedback feedback--error">{error}</p>
              </td>
            </tr>
          ) : posts.length === 0 ? (
            <tr>
              <td colSpan={3}>
                <p className="feedback">No hay posts (aún)</p>
              </td>
            </tr>
          ) : (
            posts.map((p) => (
              <tr key={p.id}>
                <td style={{ fontWeight: 600 }}>{p.name}</td>
                <td>{p.description}</td>
                <td>
                  <button
                    className="btn btn--danger"
                    onClick={() => dispatch(deletePost(p.id))}
                    aria-label={`Eliminar ${p.name}`}
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
