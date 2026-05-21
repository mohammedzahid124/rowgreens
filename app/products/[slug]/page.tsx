import ProductDetailPage from "@/components/ProductDetailPage";

export const revalidate = 60; // Optional static caching

export async function generateStaticParams() {
  return [
    { slug: "terra-seed" },
    { slug: "aura-light" },
    { slug: "verdant-base" }
  ];
}

export default async function Page(props: { params: Promise<{ slug: string }> }) {
  const params = await props.params;
  return <ProductDetailPage slug={params.slug} />;
}
