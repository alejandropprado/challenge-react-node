import PostForm from "./features/posts/components/PostForm";
import PostFilter from "./features/posts/components/PostFilter";
import PostList from "./features/posts/components/PostList";

export default function App() {
  return (
    <main className="container">
      <h1 className="app-title">Posts</h1>

      <section className="panel" style={{ marginBottom: 16 }}>
        <PostFilter />
      </section>

      <section className="panel" style={{ marginBottom: 16 }}>
        <PostList />
      </section>

      <section className="panel" style={{ marginBottom: 16 }}>
        <PostForm />
      </section>
    </main>
  );
}
