import React from "react";
import { useRouter } from "next/router";
import DesktopLayout from "../../modules/layout/deskop_layout";
import CategoryController from "../../modules/controller/category_contoller";

const DiscoverCategory = ({ ...props }) => {
  const router = useRouter();
  const { category } = router.query;


  return (
    <>
      <DesktopLayout>
        <CategoryController header={category} />
      </DesktopLayout>
    </>
  );
};

export default DiscoverCategory;
