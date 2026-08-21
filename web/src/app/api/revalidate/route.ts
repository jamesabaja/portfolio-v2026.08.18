import { parseBody } from "next-sanity/webhook";
import { revalidateTag } from "next/cache";
import { NextResponse, type NextRequest } from "next/server";

type WebhookPayload = {
  _type: string;
  slug?: string;
};

/**
 * Sanity webhook target. `sanityFetch` caches indefinitely (`revalidate: false`)
 * and only re-fetches when one of its tags is invalidated, so without this a
 * visitor who did not already have the page open never sees a publish.
 *
 * Configure in sanity.io/manage → API → Webhooks:
 *   URL         https://<site>/api/revalidate
 *   Trigger on  Create, Update, Delete
 *   Filter      _type == "caseStudy"
 *   Projection  {_type, "slug": slug.current}
 *   Method      POST
 *   Secret      same value as SANITY_REVALIDATE_SECRET
 */
export async function POST(request: NextRequest) {
  const secret = process.env.SANITY_REVALIDATE_SECRET;

  if (!secret) {
    return new NextResponse("Missing SANITY_REVALIDATE_SECRET", { status: 500 });
  }

  // Also waits out Content Lake eventual consistency before we re-query.
  const { isValidSignature, body } = await parseBody<WebhookPayload>(request, secret);

  if (!isValidSignature) {
    return new NextResponse("Invalid signature", { status: 401 });
  }

  if (!body?._type) {
    return new NextResponse("Bad request: missing _type", { status: 400 });
  }

  // "max" matches the profile next-sanity uses for its own live revalidation.
  revalidateTag(body._type, "max");

  if (body.slug) {
    revalidateTag(`${body._type}:${body.slug}`, "max");
  }

  return NextResponse.json({
    revalidated: true,
    type: body._type,
    slug: body.slug ?? null,
    now: Date.now(),
  });
}
