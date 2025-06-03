/* empty css                                     */
import { c as createComponent, a as createAstro, r as renderComponent, b as renderTemplate, m as maybeRenderHead } from '../../chunks/astro/server_C4pj3APk.mjs';
import 'kleur/colors';
import { $ as $$Layout, g as getCollection } from '../../chunks/Layout_CHdzdS2W.mjs';
export { renderers } from '../../renderers.mjs';

const $$Astro = createAstro();
async function getStaticPaths() {
  const blogEntries = await getCollection("blog");
  return blogEntries.map((entry) => ({
    params: { slug: entry.slug },
    props: { entry }
  }));
}
const $$slug = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$slug;
  const { entry } = Astro2.props;
  const { Content } = await entry.render();
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": entry.slug }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="max-w-3xl mx-auto"> <a href="/" class="inline-block mb-6 text-blue-600 hover:underline">
&larr; Back to all content
</a> <article class="bg-white rounded-lg shadow-md p-6"> ${renderComponent($$result2, "Content", Content, {})} </article> </div> ` })}`;
}, "/Users/gbade/Desktop/sailsmaps/astro-content-site/src/pages/blog/[slug].astro", void 0);

const $$file = "/Users/gbade/Desktop/sailsmaps/astro-content-site/src/pages/blog/[slug].astro";
const $$url = "/blog/[slug]";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$slug,
  file: $$file,
  getStaticPaths,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
