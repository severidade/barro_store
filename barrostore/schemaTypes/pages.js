import { defineField, defineType } from 'sanity';

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
      description: 'Esta imagem aparece no início da página',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'video',
      type: 'document',
      title: 'Vídeo do YouTube',
      fields: [
        {
          name: 'youtubeId',
          type: 'string',
          title: 'ID do Vídeo',
        }
      ],
      // Definir o campo de vídeo como não obrigatório
      required: false,
    }),
    defineField({
      name: 'pageContent',
      title: 'Page Content',
      type: 'array',
      of: [{ type: 'block' }],
      description: 'Enter the content of the page',
    }),
    defineField({
      name: 'footerImage',
      title: 'Imagem para ficar no rodapé da página',
      type: 'image',
      description: 'Você pode colocar uma imagem de destaque no rodapé da página',
      options: {
        hotspot: true,
      },
    }),
  ],
});
