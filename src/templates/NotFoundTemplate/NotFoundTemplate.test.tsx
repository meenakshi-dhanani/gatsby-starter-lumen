import React from "react";

import { render as reactTestingLibraryRender } from "@testing-library/react";
import { StaticQuery, useStaticQuery } from "gatsby";

import * as mocks from "@/mocks";
import { testUtils } from "@/utils";

import NotFoundTemplate, { Head as GatsbyHead } from "./NotFoundTemplate";

const mockedStaticQuery = StaticQuery as jest.Mock;
const mockedUseStaticQuery = useStaticQuery as jest.Mock;

describe("NotFoundTemplate", () => {
  beforeEach(() => {
    mockedStaticQuery.mockImplementationOnce(({ render }) =>
      render(mocks.siteMetadata),
    );
    mockedUseStaticQuery.mockReturnValue(mocks.siteMetadata);
  });

  test("renders correctly", () => {
    const tree = testUtils
      .createSnapshotsRenderer(<NotFoundTemplate />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  test("head renders correctly", () => {
    reactTestingLibraryRender(<GatsbyHead />);

    expect(testUtils.getMeta("twitter:card")).toEqual("summary_large_image");
    expect(testUtils.getMeta("twitter:title")).toEqual(
      "Not Found - Blog by Meena",
    );
    expect(testUtils.getMeta("og:title")).toEqual(
      "Not Found - Blog by Meena",
    );
    expect(testUtils.getMeta("description")).toEqual(
      "Developer Relations Engineer, GraphQL at Postman",
    );
    expect(testUtils.getMeta("twitter:description")).toEqual(
      "Developer Relations Engineer, GraphQL at Postman",
    );
    expect(testUtils.getMeta("og:description")).toEqual(
      "Developer Relations Engineer, GraphQL at Postman",
    );
  });
});
