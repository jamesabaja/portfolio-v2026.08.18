import { defineQuery } from "next-sanity";

// Projections are written out in full rather than interpolated from shared
// constants so TypeGen can statically read each query.

export const CASE_STUDIES_QUERY = defineQuery(`
  *[_type == "caseStudy"]
  | order(year desc, _createdAt desc) {
    _id,
    title,
    "slug": slug.current,
    summary,
    industry,
    projectType,
    projectStatus,
    conceptDisclosure,
    hasNoCaseStudyPage,
    year,
    projectUrl,
    projectUrlLabel,
    coverImage { image, alt, caption },
    cardImage { image, alt, caption },
    portfolioSettings {
      featured,
      featuredOrder,
      cardSummary,
      cardImage { image, alt, caption }
    }
  }
`);

export const FEATURED_CASE_STUDIES_QUERY = defineQuery(`
  *[_type == "caseStudy" && portfolioSettings.featured == true] {
    _id,
    title,
    "slug": slug.current,
    summary,
    industry,
    hasNoCaseStudyPage,
    projectUrl,
    projectUrlLabel,
    coverImage { image, alt, caption },
    cardImage { image, alt, caption },
    portfolioSettings {
      featured,
      featuredOrder,
      cardSummary,
      cardImage { image, alt, caption }
    }
  }
`);

export const CASE_STUDY_QUERY = defineQuery(`
  *[_type == "caseStudy" && slug.current == $slug && !hasNoCaseStudyPage][0] {
    _id,
    title,
    "slug": slug.current,
    summary,
    projectType,
    projectStatus,
    conceptDisclosure,
    industry,
    role,
    responsibilities,
    technologies,
    year,
    timeline,
    projectUrl,
    projectUrlLabel,
    coverImage { image, alt, caption },

    projectContext {
      title,
      content[]{ ..., _type == "projectImage" => { image, alt, caption } }
    },

    processHook { enabled, title, subtitle, ctaLabel },

    solution {
      title,
      content[]{ ..., _type == "projectImage" => { image, alt, caption } },
      comparisons[]{
        _key,
        title,
        // Comparison sides accept long screenshots, so the reveal window needs
        // the asset's true proportions to render one uncropped.
        before {
          image {
            image,
            alt,
            caption,
            "dimensions": image.asset->metadata.dimensions { width, height }
          },
          caption
        },
        after {
          image {
            image,
            alt,
            caption,
            "dimensions": image.asset->metadata.dimensions { width, height }
          },
          caption
        }
      },
      stats[]{ _key, value, label, context, resultType }
    },

    discovery {
      title,
      introduction[]{ ..., _type == "projectImage" => { image, alt, caption } },
      methods,
      findings[]{
        _key,
        title,
        content[]{ ..., _type == "projectImage" => { image, alt, caption } },
        image { image, alt, caption }
      },
      conclusion[]{ ..., _type == "projectImage" => { image, alt, caption } }
    },

    keyDecisions {
      title,
      introduction[]{ ..., _type == "projectImage" => { image, alt, caption } },
      decisions[]{
        _key,
        prefix,
        title,
        content[]{ ..., _type == "projectImage" => { image, alt, caption } },
        image { image, alt, caption },
        imagePosition
      }
    }
  }
`);

export const CASE_STUDY_SLUGS_QUERY = defineQuery(`
  *[_type == "caseStudy" && defined(slug.current) && !hasNoCaseStudyPage]{
    "slug": slug.current
  }
`);

export const CASE_STUDY_SEO_QUERY = defineQuery(`
  *[_type == "caseStudy" && slug.current == $slug && !hasNoCaseStudyPage][0]{
    "metaTitle": coalesce(seo.metaTitle, title),
    "metaDescription": coalesce(seo.metaDescription, summary),
    "socialImage": seo.socialImage,
    "noIndex": coalesce(seo.noIndex, false)
  }
`);
