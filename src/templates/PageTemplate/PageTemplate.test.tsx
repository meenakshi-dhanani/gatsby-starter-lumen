import React from "react";

import { render as reactTestingLibraryRender } from "@testing-library/react";
import { StaticQuery, useStaticQuery } from "gatsby";

import * as mocks from "@/mocks";
import { testUtils } from "@/utils";

import PageTemplate, { Head as GatsbyHead } from "./PageTemplate";

const mockedStaticQuery = StaticQuery as jest.Mock;
const mockedUseStaticQuery = useStaticQuery as jest.Mock;

describe("PageTemplate", () => {
  beforeEach(() => {
    mockedStaticQuery.mockImplementationOnce(({ render }) =>
      render(mocks.siteMetadata),
    );
    mockedUseStaticQuery.mockReturnValue(mocks.siteMetadata);
  });

  test("renders correctly", () => {
    const props = {
      data: {
        markdownRemark: mocks.markdownRemark,
      },
    };

    const tree = testUtils
      .createSnapshotsRenderer(<PageTemplate {...props} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  test("head renders correctly", () => {
    const props = {
      data: {
        markdownRemark: mocks.markdownRemarkWithoutDescription,
      },
    };

    reactTestingLibraryRender(<GatsbyHead {...props} />);

    expect(testUtils.getMeta("twitter:card")).toEqual("summary_large_image");
    expect(testUtils.getMeta("twitter:title")).toEqual(
      "Humane Typography in the Digital Age - Blog by Meena",
    );
    expect(testUtils.getMeta("og:title")).toEqual(
      "Humane Typography in the Digital Age - Blog by Meena",
    );
    expect(testUtils.getMeta("twitter:description")).toEqual(
      "Developer Relations Engineer, GraphQL at Postman",
    );
    expect(testUtils.getMeta("description")).toEqual(
      "Developer Relations Engineer, GraphQL at Postman",
    );
    expect(testUtils.getMeta("og:description")).toEqual(
      "Developer Relations Engineer, GraphQL at Postman",
    );
  });
});
