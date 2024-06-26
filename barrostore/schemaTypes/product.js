import { defineField, defineType } from 'sanity'

export default defineType({
  name: "storeProduct",
  title: "Produto",
  type: "document",
  fields: [
    defineField({
      name: "productName",
      type: "string",
      title: "Nome do Produto"
    }),
    defineField({
      name: 'categories',
      title: 'Categoria',
      type: 'array',
      of: [{type: 'reference', to: {type: 'category'}}],
    }),
    {
      name: 'images',
      type: 'array',
      title: 'Imagens',
      of: [
        {
          type: 'image',
          title: 'Image',
        }
      ],
      options: {
        layout: 'grid',
        max: 10, // Definir o limite máximo de imagens como 10
      },
    },
    defineField({
      name: 'price',
      type: 'number',
      title: 'Preço',
    }),
    {
      name: 'promotion',
      type: 'object',
      title: 'Produto em promoção',
      fields: [
        {
          name: 'isPromotional',
          type: 'boolean',
          title: 'Ativar promoção'
        },
        {
          name: 'discount',
          type: 'number',
          title: 'Percentual de desconto (%)'
        }
      ]
    },
    defineField({
      name: 'installmentPayments',
      type: 'number',
      title: 'Produto pode ser parcelado em quantas vezes?',
    })
  ],
});