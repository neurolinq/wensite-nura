import { fetchAPI } from "@/utils/fetch-api";
import { getStrapiURL } from "@/utils/get-strapi-url";
import qs from "qs";

const globalQuery = qs.stringify({
  populate: {
    blocks: {
      on: {
        "layout.header": {
          populate: {
            logo: { fields: ["url", "name"] },
            links: true,
            button: true,
          },
        },
        "layout.cta": {
          populate: {
            button: true,
          },
        },
        "layout.footer": {
          populate: {
            logo: {
              fields: ["url", "name"],
            },
            quicksLinks: true,
            ourServices: true,
            contact: {
              populate: {
                icon: {
                  fields: ["url", "name"],
                },
              },
            },
            socials: {
              populate: {
                icon: {
                  fields: ["url", "name"],
                },
              },
            },
            privacy: {
              populate: {
                tags: true,
              },
            },
          },
        },
      },
    },
  },
});

export async function getGlobalData() {
  const path = "/api/global";
  const BASE_URL = getStrapiURL();
  const url = new URL(path, BASE_URL);
  url.search = globalQuery;
  return await fetchAPI(url.href, {
    method: "GET",
    next: { revalidate: 60 }, // Revalidate every 60 seconds
  });
}

const homepageQuery = () =>
  qs.stringify({
    populate: {
      blocks: {
        on: {
          "homepage.herosection": {
            populate: {
              image: {
                fields: ["url", "name"],
              },
              button: true,
            },
          },
          "homepage.care-standard": {
            populate: {
              cards: {
                populate: {
                  icon: {
                    fields: ["url", "name"],
                  },
                },
              },
            },
          },
          "homepage.pathway": {
            populate: {
              cards: {
                populate: {
                  icon: {
                    fields: ["url", "name"],
                  },
                  button: true,
                },
              },
            },
          },
          "homepage.founder": {
            populate: {
              profile: {
                populate: {
                  image: {
                    fields: ["url", "name"],
                  },
                },
              },
            },
          },
          "layout.cta": {
            populate: {
              button: true,
            },
          },
        },
      },
    },
  });

export async function getHomepageData() {
  const path = "/api/homepage";
  const BASE_URL = getStrapiURL();
  const url = new URL(path, BASE_URL);
  url.search = homepageQuery();
  return await fetchAPI(url.href, {
    method: "GET",
    next: { revalidate: 60 },
  });
}

const PageQuery = (slug: string) =>
  qs.stringify({
    filters: { slug: { $eq: slug } },
    populate: {
      blocks: {
        on: {
          "shared.hero-section": {
            populate: {
              image: {
                fields: ["url", "name"],
              },
            },
          },
          "aboutpage.our-story": {
            populate: true,
          },
          "aboutpage.our-mission": {
            populate: true,
          },
          "aboutpage.core-values": {
            populate: {
              cards: {
                populate: {
                  icon: {
                    fields: ["url", "name"],
                  },
                },
              },
            },
          },
          "homepage.founder": {
            populate: {
              profile: {
                populate: {
                  image: {
                    fields: ["url", "name"],
                  },
                },
              },
            },
          },
          "aboutpage.care-approach": {
            populate: {
              image: {
                fields: ["url", "name"],
              },
              cards: true,
            },
          },
          "servicepage.assessment": {
            populate: {
              button: true,
            },
          },
          "servicepage.medication": {
            populate: {
              image: {
                fields: ["url", "name"],
              },
              lists: {
                populate: {
                  icon: {
                    fields: ["url", "name"],
                  },
                },
              },
              button: true,
            },
          },
          "feespage.our-commitment": {
            populate: {
              cards: {
                populate: {
                  lists: {
                    populate: {
                      icon: {
                        fields: ["url", "name"],
                      },
                    },
                  },
                },
              },
            },
          },
          "feespage.pricing-options": {
            populate: {
              cards: true,
            },
          },
          "feespage.corporate-pricing": {
            populate: {
              card: {
                populate: {
                  lists: {
                    populate: {
                      icon: {
                        fields: ["url", "name"],
                      },
                    },
                  },
                  button: true,
                  image: {
                    fields: ["url", "name"],
                  },
                },
              },
            },
          },
          "contactpage.contact-details": {
            populate: {
              cards: {
                populate: {
                  icon: {
                    fields: ["url", "name"],
                  },
                },
              },
            },
          },
          "contactpage.faq": {
            populate: {
              cards: true,
            },
          },
          "layout.cta": {
            populate: {
              button: true,
            },
          },
        },
      },
    },
  });

export async function getPageData(slug: string) {
  const BASE_URL = getStrapiURL();
  const query = PageQuery(slug);
  const url = `${BASE_URL}/api/pages?${query}`;
  const response = await fetchAPI(url, { method: "GET" });
  return await fetchAPI(url, {
    method: "GET",
    next: { tags: ["strapi-data"] }, // Tag this request
  });
}
