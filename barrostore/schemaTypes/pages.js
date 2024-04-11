import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'pageContent',
  title: 'Page Content',
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
      name: 'youtubeVideo',
      title: 'Vídeo do YouTube',
      type: 'url',
      description: 'Insira o link do vídeo do YouTube',
    }),
    defineField({
      name: 'pageContent',
      title: 'Page Content',
      type: 'array',
      of: [{ type: 'block' }],
      description: 'Enter the content of the page',
    }),
  ],
})
