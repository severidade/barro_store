import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'pageContent',
  title: 'Páginas',
  type: 'document',
  fields: [
    defineField({
      name: 'pageTitle',
      title: 'Título da página',
      type: 'string',
      description: 'Coloque o título da página',
    }),
    defineField({
      name: 'pageSlug',
      title: 'Page Slug',
      type: 'slug',
      description: 'Enter the slug for the page (optional)',
      options: {
        source: 'pageTitle',
        maxLength: 96,
      },
    }),
    defineField({
      name: 'highlightPhrase',
      title: 'Frase de destaque',
      type: 'string',
      description: 'Aparece logo após ao título',
    }),
    defineField({
      name: 'highlightImage',
      title: 'Imagem de destaque',
      type: 'image',
      description: 'você pode colocar uma imagem de destaque em cada página',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'pageContent',
      title: 'Page Content',
      type: 'array',
      of: [{ type: 'block' }],
      description: 'Enter the content of the page',
    }),
    defineField({
      name: 'isHomePage',
      title: 'É a página inicial?',
      type: 'boolean',
      description: 'Marque esta opção se esta for a página inicial da aplicação',
      validation: Rule => Rule.custom((isHomePage, { document }) => {
        if (isHomePage) {
          const otherHomePageCount = document._id ? 
            document._type === 'pageContent' ?
              document._id === 'drafts.pageContent' ?
                0 : // Page is not yet published
                countOf(Rule, document._id) :
              countOf(Rule, document._id) :
            countOf(Rule)
          return otherHomePageCount > 1 ? 'Apenas uma página pode ser marcada como a página inicial' : true;
        }
        return true;
      }),
    }),
  ],
});

function countOf(Rule, id) {
  return Rule
    .count()
    .notId(id)
    .where('isHomePage', true)
}
