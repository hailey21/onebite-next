export default function Page({ searchParams }: { searchParams: Promise<{ q: string }> }) {
  const { q } = searchParams;
  return <div>Search : {q}</div>;
}
