import rawCategories from "../CategoriesNavigation/data/categories.json";
import BannerOne from "../../assets/BannerOne.png";
import BannerTwo from "../../assets/BannerTwo.jpg";

const promoImages = [BannerOne, BannerTwo];

const normalizeChildren = (node = {}) =>
  node.subcategories || node.nestedsubcategories || [];

const buildColumns = (tab) => {
  const children = normalizeChildren(tab);

  // Build up to three columns based on the tab's nested categories.
  const columns = children.map((child) => ({
    title: child.name,
    link: child.link,
    items: normalizeChildren(child).map((leaf) => ({
      label: leaf.name,
      link: leaf.link,
    })),
  }));

  // Ensure we always have three columns by chunking any remaining children.
  if (columns.length >= 3) return columns.slice(0, 3);

  // If there are fewer than three, distribute items evenly across three buckets.
  const flattened = children.flatMap((child) =>
    normalizeChildren(child).map((leaf) => ({
      section: child.name,
      link: leaf.link,
      label: leaf.name,
    }))
  );

  const buckets = [[], [], []];
  flattened.forEach((item, index) => {
    buckets[index % 3].push(item);
  });

  const filled = Array.from({ length: 3 }).map((_, idx) => {
    if (columns[idx]) return columns[idx];
    return {
      title: flattened[0]?.section || tab.name,
      link: tab.link,
      items: buckets[idx],
    };
  });

  return filled;
};

const normalizedMenu = rawCategories.map((category, index) => {
  const tabs = normalizeChildren(category).map((tab) => ({
    id: `${category.name}-${tab.name}`,
    label: tab.name,
    link: tab.link || "#",
    columns: buildColumns(tab),
  }));

  return {
    id: category.name || `category-${index}`,
    label: category.name,
    link: category.link || "#",
    tabs,
    promoImage: promoImages[index % promoImages.length],
  };
});

export default normalizedMenu;
