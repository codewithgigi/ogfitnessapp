import fs from "fs";
import { join } from "path";
import matter from "gray-matter";

const mealplansDirectory = join(process.cwd(), "_mealplans");

export function getMealplansSlugs() {
  return fs.readdirSync(mealplansDirectory);
}
export function getMealplanBySlug(slug, fields = []) {
  const realSlug = slug.replace(/\.md$/, "");
  const fullPath = join(mealplansDirectory, `${realSlug}.md`);
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);

  const items = {};

  // Ensure only the minimal needed data is exposed
  fields.forEach((field) => {
    if (field === "slug") {
      items[field] = realSlug;
    }
    if (field === "content") {
      items[field] = content;
    }

    if (typeof data[field] !== "undefined") {
      items[field] = data[field];
    }
  });

  return items;
}

export function getAllMealplans(fields = []) {
  const slugs = getMealplansSlugs();
  const mealplans = slugs
    .map((slug) => getMealplanBySlug(slug, fields))
    // sort posts by date in descending order
    .sort((mealplan1, mealplan2) => (mealplan1.date > mealplan2.date ? -1 : 1));
  return mealplans;
}
