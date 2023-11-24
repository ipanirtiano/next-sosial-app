import React from "react";
import LayoutsHome from "../components/LayoutHome";
import Settings from "../components/Settings";

type Props = {};

const page = (props: Props) => {
  return (
    <LayoutsHome>
      <Settings />
    </LayoutsHome>
  );
};

export default page;
