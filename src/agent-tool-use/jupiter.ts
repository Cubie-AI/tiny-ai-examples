import { buildResult } from "@cubie-ai/tiny-ai";

interface TokenPrice {
  id: string;
  type: string;
  price: string;
}

interface PriceResponse {
  data: Record<string, TokenPrice>;
  timeTaken: number;
}
interface GetPriceParams {
  inputMint: string;
  outputMint?: string;
}
export async function getPrice({
  inputMint,
  outputMint = "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v",
}: GetPriceParams) {
  let result = buildResult();

  try {
    const urlSearchParams = new URLSearchParams({
      ids: [inputMint],
      vsToken: outputMint,
    });
    const resposne = await fetch(
      `https://lite-api.jup.ag/price/v2?${urlSearchParams}`
    );

    const responseJson = (await resposne.json()) as PriceResponse;

    if (resposne.status === 200 && responseJson.data) {
      const tokenPrice = responseJson.data[inputMint];
      result = buildResult({
        success: true,
        data: {
          id: tokenPrice.id,
          type: tokenPrice.type,
          price: tokenPrice.price,
        },
      });
    }
  } catch (error) {
    result = buildResult({
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }

  return result;
}
