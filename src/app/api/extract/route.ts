export const POST = async (request: any) => {
  const { url } = await request.json();
  const baseUrl = "https://extractorapi.com/api/v1/extractor";

  try {
    const response = await fetch(`${baseUrl}/?apikey=${process.env.EXTRACTOR_KEY}&url=${url}`);
    const data = await response.json();
    return new Response(JSON.stringify(data), { status: 201 });
  } catch (error) {
    return new Response("Failed to fetch data", { status: 500 });
  }
};