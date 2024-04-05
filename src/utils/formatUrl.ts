// Função para padronizar URLs
export function formatUrl(str: string) {
  return str.normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // Remove acentos
    .toLowerCase() // Converte para minúsculas
    .replace(/\s+/g, '-') // Substitui espaços por hífens
    .replace(/[^a-z0-9-]/g, ''); // Remove caracteres não alfanuméricos exceto hífens
}
