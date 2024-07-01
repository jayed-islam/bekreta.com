export async function gerProductById(id: string) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_API}/api/v1/product/${id}`,
    {
      cache: "no-cache",
    }
  );

  const data = await response.json();
  return data?.data;
}
