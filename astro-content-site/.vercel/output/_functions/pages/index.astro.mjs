/* empty css                                  */
import { c as createComponent, a as createAstro, m as maybeRenderHead, d as addAttribute, b as renderTemplate, r as renderComponent } from '../chunks/astro/server_C4pj3APk.mjs';
import 'kleur/colors';
import { g as getCollection, $ as $$Layout } from '../chunks/Layout_CHdzdS2W.mjs';
import 'clsx';
export { renderers } from '../renderers.mjs';

const $$Astro = createAstro();
const $$ContentCard = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$ContentCard;
  const { post } = Astro2.props;
  const { slug } = post;
  let title = post.data.title;
  if (!title) {
    const contentText = post.body;
    const titleMatch = contentText.match(/<h1[^>]*>(.*?)<\/h1>/s);
    if (titleMatch && titleMatch[1]) {
      title = titleMatch[1].replace(/<br>|<span[^>]*>|<\/span>/g, " ").trim();
    }
  }
  if (!title) {
    title = slug;
  }
  let imgSrc = post.data.image;
  if (!imgSrc) {
    const contentText = post.body;
    const imgMatch = contentText.match(/<img[^>]*src="([^"]*)"[^>]*>/);
    if (imgMatch && imgMatch[1]) {
      imgSrc = imgMatch[1];
    }
  }
  if (!imgSrc) {
    imgSrc = "/placeholder-image.jpg";
  }
  return renderTemplate`${maybeRenderHead()}<article class="content-card h-full flex flex-col"> <a${addAttribute(`/blog/${slug}`, "href")} class="block"> <div class="relative"> <img${addAttribute(imgSrc, "src")}${addAttribute(title, "alt")} class="w-full h-48 object-cover" onerror="this.onerror=null;this.src='/placeholder-image.jpg';"> </div> <div class="p-4 flex-grow"> <h2 class="text-xl font-semibold mb-2 line-clamp-2">${title}</h2> <div class="mt-auto pt-2"> <span class="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">Read more</span> </div> </div> </a> </article>`;
}, "/Users/gbade/Desktop/sailsmaps/astro-content-site/src/components/ContentCard.astro", void 0);

const $$Index = createComponent(async ($$result, $$props, $$slots) => {
  const blogPosts = await getCollection("blog");
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Content Explorer - Home" }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="mb-8"> <h1 class="text-3xl font-bold mb-2">Content Explorer</h1> <p class="text-gray-600">Explore all content from the collection</p> </div> ${blogPosts.length === 0 ? renderTemplate`<div class="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6"> <p class="text-yellow-700">No content found. Add markdown files to the content/blog directory.</p> </div>` : renderTemplate`<div class="content-grid"> ${blogPosts.map((post) => renderTemplate`${renderComponent($$result2, "ContentCard", $$ContentCard, { "post": post })}`)} </div>`}` })}`;
}, "/Users/gbade/Desktop/sailsmaps/astro-content-site/src/pages/index.astro", void 0);

const $$file = "/Users/gbade/Desktop/sailsmaps/astro-content-site/src/pages/index.astro";
const $$url = "";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
