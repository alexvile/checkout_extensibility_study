import { GraphqlQueryError } from "@shopify/shopify-api";
import shopify from "./shopify.js";

const CHANGE_HEADER_MUTATION = `#graphql
  mutation checkoutBrandingUpsert($checkoutBrandingInput: CheckoutBrandingInput!, $checkoutProfileId: ID!) {
    checkoutBrandingUpsert(checkoutBrandingInput: $checkoutBrandingInput, checkoutProfileId: $checkoutProfileId) {
      checkoutBranding {
      customizations {
          header {
            alignment
          }
        }
      }
      userErrors {
        field
        message
      }
    }
  }
`;

export default async function checkoutCustomizer(session) {
  const client = new shopify.api.clients.Graphql({ session });

  try {
    const data = await client.query({
      data: {
        query: CHANGE_HEADER_MUTATION,
        variables: {
          checkoutProfileId: "gid://shopify/CheckoutProfile/13205819",
          checkoutBrandingInput: {
            customizations: {
              header: {
                alignment: "END",
              },
            },
          },
        },
      },
    });
    console.log(data);
  } catch (error) {
    if (error instanceof GraphqlQueryError) {
      throw new Error(
        `${error.message}\n${JSON.stringify(error.response, null, 2)}`
      );
    } else {
      throw error;
    }
  }
}
