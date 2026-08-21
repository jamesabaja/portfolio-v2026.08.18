type FeaturedOrdered = {
  portfolioSettings?: { featuredOrder?: number | null } | null;
};

/**
 * Sorts featured case studies by `featuredOrder` ascending, with unordered
 * entries last rather than winning by accident.
 *
 * Kept here so the home page's Selected work section and `/work`'s featured
 * slot can never disagree about which case study comes first.
 */
export function byFeaturedOrder(a: FeaturedOrdered, b: FeaturedOrdered) {
  return (
    (a.portfolioSettings?.featuredOrder ?? Number.MAX_SAFE_INTEGER) -
    (b.portfolioSettings?.featuredOrder ?? Number.MAX_SAFE_INTEGER)
  );
}
