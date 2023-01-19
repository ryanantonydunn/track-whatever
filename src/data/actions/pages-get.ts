import { TPage } from "../../types";
import { db } from "../database";

export async function pagesGet(): Promise<TPage[] | undefined> {
  try {
    const response = await db.pages.allDocs<TPage>({
      include_docs: true,
    });
    const pages = response.rows.map((d) => d.doc).filter(Boolean) as TPage[];
    return pages;
  } catch (err) {
    console.error(err);
  }
}
