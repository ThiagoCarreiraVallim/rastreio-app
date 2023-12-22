// import { NextRequest, NextResponse } from "next/server";

// export async function GET(request: NextRequest) {
//   const url = new URL(request.url);
//   const text = url.searchParams.get("text");
//   const response = await fetch(`http://nest:3000/api/places?text=${text}`, {
//     next: {
//       revalidate: 1 //bem grande,
//     }
//   });

//   return NextResponse.json(await response.json());
// }